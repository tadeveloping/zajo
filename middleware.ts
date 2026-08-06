import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Avoid re-validating the same token against Supabase's Auth API on every single
// /admin navigation — cache the result briefly to cut down on redundant calls.
const CACHE_TTL_MS = 20_000
const tokenCache = new Map<string, { valid: boolean; expires: number }>()

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  if (hostname.startsWith('kontakt.') && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/kontakt', request.url))
  }

  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const token = request.cookies.get('sb-access-token')?.value
  const refreshToken = request.cookies.get('sb-refresh-token')?.value
  const remember = request.cookies.get('sb-remember')?.value === '1'

  if (!token) {
    if (refreshToken) {
      const refreshed = await tryRefresh(refreshToken, remember, request)
      if (refreshed) return refreshed
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const cached = tokenCache.get(token)
  if (cached && cached.expires > Date.now()) {
    if (cached.valid) return NextResponse.next()
    if (refreshToken) {
      const refreshed = await tryRefresh(refreshToken, remember, request)
      if (refreshed) return refreshed
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    })
    tokenCache.set(token, { valid: res.ok, expires: Date.now() + CACHE_TTL_MS })
    if (!res.ok) {
      if (refreshToken) {
        const refreshed = await tryRefresh(refreshToken, remember, request)
        if (refreshed) return refreshed
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Silently exchange an expired session's refresh token for a new access token,
// so an admin doesn't have to log in again just because an hour passed.
async function tryRefresh(refreshToken: string, remember: boolean, request: NextRequest) {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.access_token || !data.refresh_token) return null

    tokenCache.set(data.access_token, { valid: true, expires: Date.now() + CACHE_TTL_MS })

    const response = NextResponse.next()
    const maxAge = remember ? 60 * 60 * 24 * 30 : undefined
    response.cookies.set('sb-access-token', data.access_token, { path: '/', maxAge, sameSite: 'lax' })
    response.cookies.set('sb-refresh-token', data.refresh_token, { path: '/', maxAge, sameSite: 'lax' })
    if (remember) response.cookies.set('sb-remember', '1', { path: '/', maxAge, sameSite: 'lax' })
    return response
  } catch {
    return null
  }
}

export const config = {
  matcher: ['/admin/:path*', '/'],
}

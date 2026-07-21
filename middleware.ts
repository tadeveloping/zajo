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

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const cached = tokenCache.get(token)
  if (cached && cached.expires > Date.now()) {
    return cached.valid ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url))
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
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/'],
}

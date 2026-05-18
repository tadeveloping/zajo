import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// We do NOT use @supabase/ssr (not installed). Instead we read the Supabase
// session cookie manually and call the Supabase REST auth API to validate.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getSessionFromCookies(request: NextRequest): Promise<boolean> {
  try {
    // Supabase stores the session in cookies with various key patterns.
    // The access_token is embedded in a cookie named like:
    //   sb-<project-ref>-auth-token
    // or split into parts: sb-<ref>-auth-token.0, .1, …
    // We find any cookie that contains an access_token.
    const cookies = request.cookies.getAll()

    let accessToken: string | null = null

    // Try to find the full auth cookie (single chunk)
    for (const cookie of cookies) {
      if (cookie.name.includes('-auth-token') && !cookie.name.includes('.')) {
        try {
          const parsed = JSON.parse(decodeURIComponent(cookie.value))
          if (parsed?.access_token) {
            accessToken = parsed.access_token
            break
          }
          // Sometimes it's base64 JSON
          const decoded = Buffer.from(cookie.value, 'base64').toString('utf-8')
          const parsedB64 = JSON.parse(decoded)
          if (parsedB64?.access_token) {
            accessToken = parsedB64.access_token
            break
          }
        } catch {
          // Try raw value
          if (cookie.value.startsWith('eyJ')) {
            accessToken = cookie.value
            break
          }
        }
      }
    }

    // Try chunked cookies: sb-<ref>-auth-token.0, .1
    if (!accessToken) {
      const chunks: string[] = []
      const chunkCookies = cookies
        .filter(c => c.name.match(/-auth-token\.\d+$/))
        .sort((a, b) => {
          const ai = parseInt(a.name.split('.').pop() ?? '0')
          const bi = parseInt(b.name.split('.').pop() ?? '0')
          return ai - bi
        })
      if (chunkCookies.length > 0) {
        const combined = chunkCookies.map(c => c.value).join('')
        try {
          const parsed = JSON.parse(decodeURIComponent(combined))
          if (parsed?.access_token) accessToken = parsed.access_token
        } catch {
          try {
            const decoded = Buffer.from(combined, 'base64').toString('utf-8')
            const parsed = JSON.parse(decoded)
            if (parsed?.access_token) accessToken = parsed.access_token
          } catch {}
        }
      }
    }

    if (!accessToken) return false

    // Validate the token with Supabase Auth
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY,
      },
    })

    return res.ok
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  const isAuthenticated = await getSessionFromCookies(request)

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

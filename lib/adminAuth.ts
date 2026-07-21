import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Admin pages fire several parallel API calls per page view, each of which used to
// re-validate the same token against Supabase's Auth API. That burst of identical
// requests could trip Supabase's own rate limiting. Cache the result briefly so one
// token is only checked against Supabase every few seconds, not once per request.
const CACHE_TTL_MS = 20_000
const userCache = new Map<string, { email: string | null; expires: number }>()

export async function getAdminUser(): Promise<{ email: string } | null> {
  const token = (await cookies()).get('sb-access-token')?.value
  if (!token) return null

  const cached = userCache.get(token)
  if (cached && cached.expires > Date.now()) {
    return cached.email ? { email: cached.email } : null
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}`, apikey: SUPABASE_ANON_KEY },
    })
    if (!res.ok) {
      userCache.set(token, { email: null, expires: Date.now() + CACHE_TTL_MS })
      return null
    }
    const user = await res.json()
    const email = user?.email ? (user.email as string) : null
    userCache.set(token, { email, expires: Date.now() + CACHE_TTL_MS })
    return email ? { email } : null
  } catch {
    return null
  }
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

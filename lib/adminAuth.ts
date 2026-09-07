import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from './supabase'
import type { Role, SessionUser } from '@/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Admin pages fire several parallel API calls per page view, each of which used to
// re-validate the same token against Supabase's Auth API. That burst of identical
// requests could trip Supabase's own rate limiting. Cache the result briefly so one
// token is only checked against Supabase every few seconds, not once per request.
const CACHE_TTL_MS = 20_000
const userCache = new Map<string, { email: string | null; expires: number }>()

// Emails that get full admin access (Tomáš + Tadeáš). Everyone else who can log in
// is treated as a maklér and only ever sees their own + unassigned leads. Kept in
// an env var so the client can add/remove admins without a code change.
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
}

function isAdminEmail(email: string): boolean {
  return adminEmails().includes(email.toLowerCase())
}

// Resolve the access token in the cookie to the logged-in user's email.
async function getEmailFromToken(): Promise<string | null> {
  const token = (await cookies()).get('sb-access-token')?.value
  if (!token) return null

  const cached = userCache.get(token)
  if (cached && cached.expires > Date.now()) return cached.email

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
    return email
  } catch {
    return null
  }
}

// Any authenticated user (admin OR maklér). Returns null when not logged in.
export async function getAdminUser(): Promise<{ email: string } | null> {
  const email = await getEmailFromToken()
  return email ? { email } : null
}

// Same shape as getAdminUser, but only resolves for admins — used to lock down
// admin-only endpoints (subscribers, newsletter, funnel, offers) with a one-word
// swap. A logged-in maklér gets null here.
export async function getAdminOnlyUser(): Promise<{ email: string } | null> {
  const email = await getEmailFromToken()
  if (!email || !isAdminEmail(email)) return null
  return { email }
}

// The full session identity used for role-based access: who they are, whether
// they are an admin, and — if a matching row exists in `makleri` — their maklér id
// (used to scope and assign leads). An admin without a makléri row still works;
// they just can't be a lead's assignee until one is created for them.
export async function getSessionUser(): Promise<SessionUser | null> {
  const email = await getEmailFromToken()
  if (!email) return null

  const role: Role = isAdminEmail(email) ? 'admin' : 'makler'

  const { data } = await supabaseAdmin
    .from('makleri')
    .select('id,name,active')
    .eq('email', email.toLowerCase())
    .maybeSingle()

  return {
    email,
    role,
    maklerId: data?.id ?? null,
    name: data?.name ?? null,
  }
}

// Guard for admin-only endpoints. Returns the session on success, or a Response
// to return directly (401/403) on failure.
export async function requireAdmin(): Promise<SessionUser | NextResponse> {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  if (session.role !== 'admin') return forbidden()
  return session
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function forbidden() {
  return NextResponse.json({ error: 'Nemáte oprávnenie na túto akciu.' }, { status: 403 })
}

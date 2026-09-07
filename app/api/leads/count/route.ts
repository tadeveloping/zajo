import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getSessionUser, unauthorized } from '@/lib/adminAuth'
import type { SessionUser } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Count only the NEW leads this user is allowed to see (own + shared pool for
// makléri; everything for admins), so the badges match the CRM list.
function scopedNewCount(table: string, session: SessionUser) {
  let q = supabaseAdmin.from(table).select('id', { count: 'exact', head: true }).eq('status', 'novy')
  if (session.role !== 'admin') {
    q = session.maklerId
      ? q.or(`assigned_to.eq.${session.maklerId},assigned_to.is.null`)
      : q.is('assigned_to', null)
  }
  return q
}

export async function GET() {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  const [predaj, ocenenie, cally] = await Promise.all([
    scopedNewCount('leads_predaj', session),
    scopedNewCount('leads_ocenenie', session),
    scopedNewCount('leads_cally', session),
  ])
  return NextResponse.json({
    predaj: predaj.count ?? 0,
    ocenenie: ocenenie.count ?? 0,
    cally: cally.count ?? 0,
    total: (predaj.count ?? 0) + (ocenenie.count ?? 0) + (cally.count ?? 0),
  })
}

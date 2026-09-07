import { NextResponse } from 'next/server'
import { supabaseAdmin } from './supabase'
import { getSessionUser, unauthorized, forbidden } from './adminAuth'
import type { SessionUser } from '@/types'

type LeadTable = 'leads_predaj' | 'leads_ocenenie' | 'leads_cally'

// Guard for editing a lead's status/notes. Admins may edit any lead; a maklér may
// only edit a lead that is theirs or still in the shared pool (so they can work a
// lead before/after claiming it, but never touch another maklér's lead).
export async function guardLeadWrite(
  table: LeadTable,
  id: string
): Promise<SessionUser | NextResponse> {
  const session = await getSessionUser()
  if (!session) return unauthorized()
  if (session.role === 'admin') return session

  const { data } = await supabaseAdmin.from(table).select('assigned_to').eq('id', id).maybeSingle()
  if (!data) return NextResponse.json({ error: 'Lead neexistuje.' }, { status: 404 })

  const owner = (data as { assigned_to: string | null }).assigned_to
  if (owner === null || owner === session.maklerId) return session
  return forbidden()
}

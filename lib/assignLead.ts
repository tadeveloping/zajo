import { NextResponse } from 'next/server'
import { supabaseAdmin } from './supabase'
import { assignLeadSchema } from './validators'
import { getSessionUser, unauthorized, forbidden } from './adminAuth'
import { withAssignee } from './makleri'

type LeadTable = 'leads_predaj' | 'leads_ocenenie' | 'leads_cally'

// Shared handler for claiming / reassigning a lead. Enforced server-side:
//  - admin  → may assign to anyone, or return to the shared pool (null)
//  - maklér → may only CLAIM an unassigned lead for themselves; the update is
//             conditional on assigned_to IS NULL so two makléri can't grab the
//             same lead (the loser gets 409).
export async function handleAssign(table: LeadTable, id: string, req: Request) {
  const session = await getSessionUser()
  if (!session) return unauthorized()

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Neplatný JSON' }, { status: 400 })
  }
  const parsed = assignLeadSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const target = parsed.data.assigned_to

  // Target maklér must exist (null = unassign, always fine to validate-skip).
  if (target) {
    const { data: exists } = await supabaseAdmin.from('makleri').select('id').eq('id', target).maybeSingle()
    if (!exists) return NextResponse.json({ error: 'Maklér neexistuje.' }, { status: 400 })
  }

  if (session.role === 'admin') {
    const { data, error } = await supabaseAdmin
      .from(table).update({ assigned_to: target }).eq('id', id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const [withName] = await withAssignee([data])
    return NextResponse.json(withName)
  }

  // Maklér path: only self-claim of an unassigned lead.
  if (!session.maklerId) return forbidden()
  if (target !== session.maklerId)
    return NextResponse.json({ error: 'Môžete si priradiť lead iba sebe.' }, { status: 403 })

  const { data, error } = await supabaseAdmin
    .from(table)
    .update({ assigned_to: session.maklerId })
    .eq('id', id)
    .is('assigned_to', null)
    .select()
    .single()
  if (error || !data)
    return NextResponse.json({ error: 'Tento lead si už medzitým vzal niekto iný.' }, { status: 409 })
  const [withName] = await withAssignee([data])
  return NextResponse.json(withName)
}

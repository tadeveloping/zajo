import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { updateLeadStatusSchema } from '@/lib/validators'
import { requireAdmin } from '@/lib/adminAuth'
import { guardLeadWrite } from '@/lib/leadAccess'
import { withNewsletterStatus } from '@/lib/leads'
import { withAssignee } from '@/lib/makleri'

export const runtime = 'nodejs'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const guard = await guardLeadWrite('leads_predaj', params.id)
  if (guard instanceof NextResponse) return guard
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Neplatný JSON' }, { status: 400 })
  }
  const parsed = updateLeadStatusSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { data, error } = await supabaseAdmin
    .from('leads_predaj')
    .update(parsed.data)
    .eq('id', params.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const [withStatus] = await withNewsletterStatus([data])
  const [withName] = await withAssignee([withStatus])
  return NextResponse.json(withName)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const { error } = await supabaseAdmin.from('leads_predaj').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

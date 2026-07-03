import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { updateLeadStatusSchema } from '@/lib/validators'
import { getAdminUser, unauthorized } from '@/lib/adminAuth'

export const runtime = 'nodejs'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await getAdminUser())) return unauthorized()
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
    .from('leads_cally')
    .update(parsed.data)
    .eq('id', params.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!(await getAdminUser())) return unauthorized()
  const { error } = await supabaseAdmin.from('leads_cally').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { maklerUpdateSchema } from '@/lib/validators'
import { requireAdmin } from '@/lib/adminAuth'

export const runtime = 'nodejs'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Neplatný JSON' }, { status: 400 })
  }
  const parsed = maklerUpdateSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('makleri')
    .update(parsed.data)
    .eq('id', params.id)
    .select()
    .single()
  if (error) {
    if ((error as { code?: string }).code === '23505')
      return NextResponse.json({ error: 'Maklér s týmto emailom alebo linkom už existuje.' }, { status: 409 })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  // Leads assigned to this maklér fall back to the shared pool (FK ON DELETE SET NULL).
  const { error } = await supabaseAdmin.from('makleri').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

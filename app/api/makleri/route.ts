import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { maklerCreateSchema } from '@/lib/validators'
import { requireAdmin } from '@/lib/adminAuth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const { data, error } = await supabaseAdmin
    .from('makleri')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Neplatný JSON' }, { status: 400 })
  }
  const parsed = maklerCreateSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('makleri')
    .insert(parsed.data)
    .select()
    .single()
  if (error) {
    // 23505 = unique_violation (duplicate email or slug)
    if ((error as { code?: string }).code === '23505')
      return NextResponse.json({ error: 'Maklér s týmto emailom alebo linkom už existuje.' }, { status: 409 })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}

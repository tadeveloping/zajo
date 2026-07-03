import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { leadCallySchema } from '@/lib/validators'
import { sendLeadNotification } from '@/lib/leadNotification'
import { getAdminUser, unauthorized } from '@/lib/adminAuth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
}

export async function GET() {
  if (!(await getAdminUser())) return unauthorized()
  const { data, error } = await supabaseAdmin
    .from('leads_cally')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Neplatný JSON' }, { status: 400, headers: CORS_HEADERS })
  }
  const parsed = leadCallySchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400, headers: CORS_HEADERS })
  const { data, error } = await supabaseAdmin
    .from('leads_cally')
    .insert(parsed.data)
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: CORS_HEADERS })

  const crmUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://zajo-five.vercel.app'}/admin/crm`

  await sendLeadNotification({
    name: data.name, phone: data.phone, email: data.email,
    source: data.source ?? 'cally', type: 'cally',
    message: data.sprava, score: data.score, leadId: data.id, crmUrl,
  }).catch(err => console.error('lead notification failed', err))

  return NextResponse.json(data, { status: 201, headers: CORS_HEADERS })
}

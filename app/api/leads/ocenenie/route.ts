import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { leadOceneniaSchema } from '@/lib/validators'
import { sendLeadNotification } from '@/lib/leadNotification'
import { leadConfirmationEmail } from '@/lib/emailTemplates'
import { resend, FROM_EMAIL } from '@/lib/resend'

export const runtime = 'nodejs'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('leads_ocenenie')
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
  const parsed = leadOceneniaSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400, headers: CORS_HEADERS })
  const { data, error } = await supabaseAdmin
    .from('leads_ocenenie')
    .insert(parsed.data)
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: CORS_HEADERS })

  const crmUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://zajo-five.vercel.app'}/admin/crm`
  sendLeadNotification({
    name: data.name, phone: data.phone, email: data.email,
    source: data.source ?? 'landing_page', type: 'ocenenie',
    message: data.doplnujuce_info, leadId: data.id, crmUrl,
  }).catch(err => console.error('lead notification failed', err))

  if (data.email) {
    const { subject, html } = leadConfirmationEmail(data.name, 'Ocenenie nehnuteľnosti')
    resend.emails.send({ from: FROM_EMAIL, to: data.email, subject, html })
      .catch(err => console.error('lead confirmation email failed', err))

    if (parsed.data.newsletter_opt) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zajo-five.vercel.app'
      supabaseAdmin.from('contacts').upsert(
        { name: data.name, email: data.email, phone: data.phone ?? null, source: 'ocenenie_form', subscribed: true },
        { onConflict: 'email', ignoreDuplicates: true }
      ).then(async () => {
        const { subject: ws, html: wh } = (await import('@/lib/emailTemplates')).newsletterWelcomeEmail(
          data.name, `${appUrl}/odhlasit?email=${encodeURIComponent(data.email!)}`
        )
        return resend.emails.send({ from: FROM_EMAIL, to: data.email!, subject: ws, html: wh })
      }).catch(err => console.error('newsletter opt-in failed', err))
    }
  }

  return NextResponse.json(data, { status: 201, headers: CORS_HEADERS })
}

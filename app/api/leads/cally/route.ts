import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { leadCallySchema } from '@/lib/validators'
import { sendLeadNotification } from '@/lib/leadNotification'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { getSessionUser, unauthorized } from '@/lib/adminAuth'
import { withAssignee, maklerIdBySlug, maklerEmailById } from '@/lib/makleri'

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
  const session = await getSessionUser()
  if (!session) return unauthorized()
  let query = supabaseAdmin.from('leads_cally').select('*').order('created_at', { ascending: false })
  if (session.role !== 'admin') {
    query = session.maklerId
      ? query.or(`assigned_to.eq.${session.maklerId},assigned_to.is.null`)
      : query.is('assigned_to', null)
  }
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(await withAssignee(data))
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
  const { newsletter_opt, makler_slug, ...insertData } = parsed.data

  // Personal contact link: /kontakt?m=<slug> auto-assigns the lead to that maklér.
  const assignedTo = await maklerIdBySlug(makler_slug)

  const { data, error } = await supabaseAdmin
    .from('leads_cally')
    .insert({ ...insertData, assigned_to: assignedTo })
    .select()
    .single()
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: CORS_HEADERS })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zajo-five.vercel.app'
  const crmUrl = `${appUrl}/admin/crm`

  // Route the notification: assigned lead → that maklér; unassigned → default (Tomáš).
  const [{ assignee_name }] = await withAssignee([data])
  const notifyEmail = assignedTo ? await maklerEmailById(assignedTo) : null

  await sendLeadNotification({
    name: data.name, phone: data.phone, email: data.email,
    source: data.source ?? 'cally', type: 'cally',
    message: data.sprava, score: data.score, leadId: data.id, crmUrl,
    notifyEmail, assigneeName: assignee_name,
  }).catch(err => console.error('lead notification failed', err))

  if (newsletter_opt && data.email) {
    try {
      await supabaseAdmin.from('contacts').upsert(
        { name: data.name, email: data.email, phone: data.phone ?? null, source: 'kontakt_form', subscribed: true },
        { onConflict: 'email' }
      )
      const { data: newsletterProps } = await supabaseAdmin
        .from('newsletter_properties').select('*').order('position')
      const properties = (newsletterProps ?? []).map((row: { title?: string | null; price?: string | null; location?: string | null; area?: string | null; image_url?: string | null; url: string }) => ({
        title: row.title ?? '', price: row.price ?? 'Cena na vyžiadanie',
        location: row.location ?? 'Trenčín a okolie', area: row.area ?? null, imageUrl: row.image_url ?? null, url: row.url,
      }))
      const { subject: ws, html: wh } = (await import('@/lib/emailTemplates')).newsletterWelcomeEmail(
        data.name, `${appUrl}/odhlasit?email=${encodeURIComponent(data.email)}`,
        properties.length > 0 ? properties : undefined
      )
      await resend.emails.send({ from: FROM_EMAIL, to: data.email, subject: ws, html: wh })
    } catch (err) { console.error('newsletter opt-in failed', err) }
  }

  return NextResponse.json(data, { status: 201, headers: CORS_HEADERS })
}

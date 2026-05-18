import { resend } from './resend'

interface LeadNotificationData {
  name: string
  phone?: string | null
  email?: string | null
  source: string
  type: string // 'predaj' | 'ocenenie' | 'cally'
  message?: string | null
  score?: string | null // for cally
  leadId: string
  crmUrl: string
}

export async function sendLeadNotification(data: LeadNotificationData) {
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL
  if (!notificationEmail) return

  const isHot = data.score === 'HOT' ||
    (data.score === 'WARM' && data.type === 'cally')

  const subject = isHot
    ? `🔥 URGENT [Zajo Reality] Nový HOT lead: ${data.name} (${data.source})`
    : `[Zajo Reality] Nový lead: ${data.name} (${data.source})`

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#141210;color:#F2EDE7;border-radius:12px;">
      <h2 style="color:#E8711A;margin:0 0 16px">${isHot ? '🔥 ' : ''}Nový lead${isHot ? ' — URGENT' : ''}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#8A8279;width:120px">Meno</td><td style="padding:8px 0;font-weight:600">${data.name}</td></tr>
        <tr><td style="padding:8px 0;color:#8A8279">Telefón</td><td style="padding:8px 0">${data.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#8A8279">Email</td><td style="padding:8px 0">${data.email || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#8A8279">Typ</td><td style="padding:8px 0">${data.type}</td></tr>
        <tr><td style="padding:8px 0;color:#8A8279">Zdroj</td><td style="padding:8px 0">${data.source}</td></tr>
        ${data.score ? `<tr><td style="padding:8px 0;color:#8A8279">Skóre</td><td style="padding:8px 0;font-weight:700;color:${data.score === 'HOT' ? '#ef4444' : data.score === 'WARM' ? '#f97316' : '#60a5fa'}">${data.score}</td></tr>` : ''}
        ${data.message ? `<tr><td style="padding:8px 0;color:#8A8279;vertical-align:top">Správa</td><td style="padding:8px 0">${data.message}</td></tr>` : ''}
      </table>
      <a href="${data.crmUrl}" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#E8711A;color:white;text-decoration:none;border-radius:10px;font-weight:600">Otvoriť v CRM →</a>
    </div>
  `

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'noreply@zajoreality.sk',
    to: notificationEmail,
    subject,
    html,
  })
}

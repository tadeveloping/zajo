import { supabaseAdmin } from './supabase'

// newsletter_opt is only ever used at submit time to decide whether to add the
// lead's email to `contacts` — it isn't stored on the lead row itself. To show
// "prihlásený na newsletter" in the CRM, derive it by checking whether that
// email is currently a subscribed contact.
export async function withNewsletterStatus<T extends { email: string | null }>(
  leads: T[]
): Promise<(T & { newsletter_prihlaseny: boolean })[]> {
  const emails = [...new Set(leads.map(l => l.email).filter((e): e is string => !!e))]
  if (emails.length === 0) return leads.map(l => ({ ...l, newsletter_prihlaseny: false }))

  const { data } = await supabaseAdmin
    .from('contacts')
    .select('email')
    .eq('subscribed', true)
    .in('email', emails)

  const subscribed = new Set((data ?? []).map((c: { email: string }) => c.email))
  return leads.map(l => ({ ...l, newsletter_prihlaseny: l.email ? subscribed.has(l.email) : false }))
}

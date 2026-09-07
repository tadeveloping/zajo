import { supabaseAdmin } from './supabase'

// Canonical wording people agree to when opting in to marketing e-mails. Stored
// with each opt-in so we can prove *what* was consented to, not just that a box
// was ticked.
export const NEWSLETTER_CONSENT_TEXT =
  'Súhlas so zasielaním nových ponúk a aktuálnych nehnuteľností e-mailom (newsletter).'

export type ConsentAction = 'opt_in' | 'opt_out'

// Where the consent change came from.
export type ConsentSource =
  | 'kontakt_form'
  | 'predaj_form'
  | 'ocenenie_form'
  | 'newsletter_page'
  | 'manual_admin'
  | 'unsubscribe_link'

interface LogConsentInput {
  email: string
  name?: string | null
  action: ConsentAction
  source: ConsentSource
  // Who triggered it: 'self' (the person themselves) or an admin's email.
  actor?: string | null
  consentText?: string | null
}

// Append a row to the consent audit log. Best-effort: never throw into the caller
// — a failed audit write must not break a signup or an unsubscribe.
export async function logConsent(input: LogConsentInput): Promise<void> {
  try {
    await supabaseAdmin.from('consent_log').insert({
      email: input.email.trim().toLowerCase(),
      name: input.name ?? null,
      action: input.action,
      source: input.source,
      actor: input.actor ?? 'self',
      consent_text: input.action === 'opt_in' ? (input.consentText ?? NEWSLETTER_CONSENT_TEXT) : null,
    })
  } catch (e) {
    console.error('consent log failed', e)
  }
}

'use client'

export type FunnelForm = 'kontakt' | 'predaj' | 'ocenenie'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('funnel_sid')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('funnel_sid', id)
  }
  return id
}

function getUtm(key: string): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get(key) || null
}

export function trackStep(form: FunnelForm, event: string) {
  if (typeof window === 'undefined') return
  const session_id = getSessionId()
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      form,
      event,
      session_id,
      utm_source: getUtm('utm_source'),
      utm_campaign: getUtm('utm_campaign'),
    }),
    keepalive: true,
  }).catch(() => {})
}

'use client'

export type FunnelForm = 'newsletter' | 'predaj' | 'ocenenie'

function makeId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('funnel_sid')
  if (!id) {
    id = makeId()
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
  // Tracking must never break the form itself — swallow everything.
  try {
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
  } catch {
    // ignore
  }
}

'use client'

import { useState } from 'react'

const CONTACT_LINK_BASE = 'https://kontakt.zajoreality.sk'

export function MaklerLinkCard({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  const link = `${CONTACT_LINK_BASE}/${slug}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 8 }}>
        Váš kontaktný link
      </div>
      <div style={{ fontSize: 14, color: '#111827', fontWeight: 600, wordBreak: 'break-all', marginBottom: 12 }}>{link}</div>
      <button
        onClick={copy}
        style={{
          padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: copied ? '#16a34a' : 'linear-gradient(135deg, #E8711A, #F5923D)',
          color: '#fff', fontSize: 13, fontWeight: 700,
        }}
      >
        {copied ? '✓ Skopírované' : 'Kopírovať link'}
      </button>
      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 10, lineHeight: 1.5 }}>
        Pošlite tento link klientovi (napr. SMS). Keď vyplní formulár, lead sa priradí priamo vám.
      </div>
    </div>
  )
}

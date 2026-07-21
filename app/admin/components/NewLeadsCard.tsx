'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function NewLeadsCard() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const RETRIES = 2
      for (let attempt = 0; attempt <= RETRIES; attempt++) {
        try {
          const r = await fetch('/api/leads/count', { cache: 'no-store' })
          if (!r.ok) throw new Error(String(r.status))
          const d = await r.json()
          if (!cancelled) setCount(d.total ?? 0)
          return
        } catch {
          if (attempt < RETRIES) await new Promise(res => setTimeout(res, 800))
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const n = count ?? 0

  return (
    <Link href="/admin/crm" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: n > 0
          ? 'linear-gradient(135deg, rgba(232,113,26,0.14), rgba(232,113,26,0.04))'
          : '#ffffff',
        border: `1px solid ${n > 0 ? 'rgba(232,113,26,0.4)' : '#e5e7eb'}`,
        borderRadius: '14px', padding: '22px 24px', height: '100%',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280' }}>Nové CRM leady</span>
          <span style={{ fontSize: '20px' }}>🔥</span>
        </div>
        <div style={{ fontSize: '40px', fontWeight: 800, color: n > 0 ? '#E8711A' : '#111827', letterSpacing: '-0.04em', lineHeight: 1 }}>
          {count === null ? '…' : n}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 600, color: '#E8711A' }}>
          → Otvoriť CRM
        </div>
      </div>
    </Link>
  )
}

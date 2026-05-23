'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function NewLeadsCard() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/leads/count', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setCount(d.total ?? 0))
      .catch(() => setCount(0))
  }, [])

  const n = count ?? 0

  return (
    <Link href="/admin/crm" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: n > 0
          ? 'linear-gradient(135deg, rgba(200,119,58,0.2), rgba(200,119,58,0.06))'
          : 'rgba(20,18,16,0.8)',
        border: `1px solid ${n > 0 ? 'rgba(200,119,58,0.45)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px', padding: '22px 24px', height: '100%',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8279' }}>Nové CRM leady</span>
          <span style={{ fontSize: '20px' }}>🔥</span>
        </div>
        <div style={{ fontSize: '40px', fontWeight: 800, color: n > 0 ? '#c8773a' : '#f5f0ea', letterSpacing: '-0.04em', lineHeight: 1 }}>
          {count === null ? '…' : n}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 600, color: '#c8773a' }}>
          → Otvoriť CRM
        </div>
      </div>
    </Link>
  )
}

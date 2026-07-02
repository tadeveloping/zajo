'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface PropertySlot {
  position: number
  url: string
  title: string | null
  price: string | null
  location: string | null
  area: string | null
  image_url: string | null
  updated_at?: string | null
}

const EMPTY_SLOTS: PropertySlot[] = [1, 2, 3, 4].map((p) => ({
  position: p,
  url: '',
  title: null,
  price: null,
  location: null,
  area: null,
  image_url: null,
}))

export default function NewsletterPonukyPage() {
  const [slots, setSlots] = useState<PropertySlot[]>(EMPTY_SLOTS)
  const [inputs, setInputs] = useState<Record<number, string>>({ 1: '', 2: '', 3: '', 4: '' })
  const [loading, setLoading] = useState<Record<number, boolean>>({})
  const [errors, setErrors] = useState<Record<number, string>>({})
  const [pageLoading, setPageLoading] = useState(true)

  const fetchProperties = useCallback(async () => {
    setPageLoading(true)
    try {
      const res = await fetch('/api/newsletter-properties')
      const data = await res.json()
      const saved: PropertySlot[] = data.properties ?? []
      const merged = EMPTY_SLOTS.map((empty) => {
        const found = saved.find((s) => s.position === empty.position)
        return found ?? empty
      })
      setSlots(merged)
      // Pre-fill URL inputs for saved slots
      const newInputs: Record<number, string> = { 1: '', 2: '', 3: '', 4: '' }
      saved.forEach((s) => {
        newInputs[s.position] = s.url ?? ''
      })
      setInputs(newInputs)
    } catch {
      // leave empty state
    } finally {
      setPageLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  async function handleLoad(position: number) {
    const url = inputs[position]?.trim()
    if (!url) {
      setErrors((e) => ({ ...e, [position]: 'Zadajte URL adresu' }))
      return
    }
    setLoading((l) => ({ ...l, [position]: true }))
    setErrors((e) => ({ ...e, [position]: '' }))
    try {
      const res = await fetch('/api/newsletter-properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position, url }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors((e) => ({ ...e, [position]: data.error ?? 'Neznáma chyba' }))
        return
      }
      const prop = data.property
      setSlots((prev) =>
        prev.map((s) =>
          s.position === position
            ? {
                position,
                url: prop.url,
                title: prop.title,
                price: prop.price,
                location: prop.location,
                area: prop.area,
                image_url: prop.imageUrl,
              }
            : s
        )
      )
    } catch (e) {
      setErrors((prev) => ({
        ...prev,
        [position]: e instanceof Error ? e.message : 'Chyba siete',
      }))
    } finally {
      setLoading((l) => ({ ...l, [position]: false }))
    }
  }

  async function handleDelete(position: number) {
    setLoading((l) => ({ ...l, [position]: true }))
    setErrors((e) => ({ ...e, [position]: '' }))
    try {
      const res = await fetch('/api/newsletter-properties', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors((e) => ({ ...e, [position]: data.error ?? 'Neznáma chyba' }))
        return
      }
      setSlots((prev) =>
        prev.map((s) =>
          s.position === position
            ? { position, url: '', title: null, price: null, location: null, area: null, image_url: null }
            : s
        )
      )
      setInputs((i) => ({ ...i, [position]: '' }))
    } catch (e) {
      setErrors((prev) => ({
        ...prev,
        [position]: e instanceof Error ? e.message : 'Chyba siete',
      }))
    } finally {
      setLoading((l) => ({ ...l, [position]: false }))
    }
  }

  const hasSaved = (slot: PropertySlot) => !!slot.title

  return (
    <div className="min-h-screen" style={{ background: '#f6f7f9' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <header
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '48px', paddingBottom: '28px',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-v3.png"
              alt="Zajo Reality"
              style={{ height: '42px', width: 'auto', display: 'block' }}
            />
            <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
            <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280', margin: 0, letterSpacing: '-0.01em' }}>
              Admin panel
            </h1>
          </div>

          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <NavLink href="/admin" icon="🏠">Admin</NavLink>
            <NavLink href="/admin/crm" icon="👥">CRM</NavLink>
            <NavLink href="/admin/kontakty" icon="📋">Kontakty</NavLink>
            <NavLink href="/admin/newsletter-ponuky" icon="🏠">Ponuky</NavLink>
            <Link
              href="/admin/generovat"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #E8711A, #F5923D)',
                color: '#fff', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '-0.01em',
                boxShadow: '0 4px 16px rgba(232,113,26,0.3)',
              }}
            >
              <span>✨</span> Newsletter
            </Link>
          </nav>
        </header>

        {/* ── Page heading ── */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Aktuálne ponuky v newsletteri
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Zadajte URL inzerátu a systém automaticky stiahne informácie.
          </p>
        </div>

        {/* ── Slots ── */}
        {pageLoading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            Načítavam...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
            {slots.map((slot) => (
              <SlotCard
                key={slot.position}
                slot={slot}
                inputValue={inputs[slot.position] ?? ''}
                onInputChange={(v) => setInputs((i) => ({ ...i, [slot.position]: v }))}
                onLoad={() => handleLoad(slot.position)}
                onDelete={() => handleDelete(slot.position)}
                isLoading={!!loading[slot.position]}
                error={errors[slot.position] ?? ''}
                hasSaved={hasSaved(slot)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SlotCard({
  slot, inputValue, onInputChange, onLoad, onDelete, isLoading, error, hasSaved,
}: {
  slot: PropertySlot
  inputValue: string
  onInputChange: (v: string) => void
  onLoad: () => void
  onDelete: () => void
  isLoading: boolean
  error: string
  hasSaved: boolean
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '22px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Slot header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '28px', height: '28px', borderRadius: '50%',
              background: hasSaved ? 'rgba(232,113,26,0.14)' : '#f3f4f6',
              border: hasSaved ? '1px solid rgba(232,113,26,0.4)' : '1px solid #e5e7eb',
              color: hasSaved ? '#E8711A' : '#9ca3af',
              fontSize: '12px', fontWeight: 800,
            }}
          >
            {slot.position}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: hasSaved ? '#111827' : '#9ca3af' }}>
            {hasSaved ? 'Ponuka uložená' : 'Prázdny slot'}
          </span>
        </div>
        {hasSaved && (
          <button
            onClick={onDelete}
            disabled={isLoading}
            title="Odstrániť"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '28px', height: '28px', borderRadius: '6px',
              background: '#fef2f2', border: '1px solid #fecaca',
              color: '#dc2626', fontSize: '14px', cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Saved property preview */}
      {hasSaved && (
        <div
          style={{
            display: 'flex', gap: '12px', marginBottom: '16px',
            padding: '12px', borderRadius: '10px',
            background: 'rgba(232,113,26,0.05)', border: '1px solid rgba(232,113,26,0.15)',
          }}
        >
          {slot.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slot.image_url}
              alt={slot.title ?? ''}
              style={{
                width: '80px', height: '60px', objectFit: 'cover',
                borderRadius: '6px', flexShrink: 0, display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '80px', height: '60px', borderRadius: '6px',
                background: '#f3f4f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#9ca3af', fontSize: '20px', flexShrink: 0,
              }}
            >
              🏠
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#111827',
              marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {slot.title}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#E8711A', marginBottom: '3px' }}>
              {slot.price}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {slot.location}{slot.area ? ` · ${slot.area}` : ''}
            </div>
          </div>
        </div>
      )}

      {/* URL input + button */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="url"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLoad() }}
          placeholder="https://www.zajoreality.sk/..."
          disabled={isLoading}
          style={{
            flex: 1, padding: '10px 14px',
            background: '#f9fafb',
            border: error ? '1px solid #fca5a5' : '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#111827', fontSize: '13px',
            outline: 'none',
            opacity: isLoading ? 0.6 : 1,
          }}
        />
        <button
          onClick={onLoad}
          disabled={isLoading}
          style={{
            padding: '10px 16px', borderRadius: '8px',
            background: isLoading
              ? 'rgba(232,113,26,0.4)'
              : 'linear-gradient(135deg, #E8711A, #F5923D)',
            border: 'none', color: '#fff',
            fontSize: '13px', fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: isLoading ? 'none' : '0 4px 12px rgba(232,113,26,0.25)',
          }}
        >
          {isLoading ? 'Načítavam...' : 'Načítať'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: '8px', padding: '8px 12px', borderRadius: '6px',
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#dc2626', fontSize: '12px', lineHeight: 1.5,
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '8px 14px', borderRadius: '8px',
        border: '1px solid #e5e7eb',
        color: '#4b5563', fontSize: '13px', fontWeight: 600,
        textDecoration: 'none',
      }}
    >
      <span style={{ fontSize: '14px' }}>{icon}</span>
      {children}
    </Link>
  )
}

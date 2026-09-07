'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Makler } from '@/types'

// Base for a maklér's shareable personal contact link. The kontakt subdomain
// rewrites a clean path segment to /kontakt?m=<slug> (see middleware).
const CONTACT_LINK_BASE = 'https://kontakt.zajoreality.sk'

function linkFor(slug: string) {
  return `${CONTACT_LINK_BASE}/${slug}`
}

// Suggest a slug from a name: strip diacritics, lowercase, dash-separate.
function slugify(name: string) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function MakleriPage() {
  const [makleri, setMakleri] = useState<Makler[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [forbidden, setForbidden] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Makler | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Makler | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/makleri', { cache: 'no-store' })
      if (res.status === 401 || res.status === 403) {
        setForbidden(true)
        setLoading(false)
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Nepodarilo sa načítať')
      setMakleri(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [])

  async function toggleActive(m: Makler) {
    const next = !m.active
    setMakleri(prev => prev.map(x => (x.id === m.id ? { ...x, active: next } : x)))
    const res = await fetch(`/api/makleri/${m.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: next }),
    })
    if (!res.ok) load()
  }

  async function handleDelete(m: Makler) {
    const res = await fetch(`/api/makleri/${m.id}`, { method: 'DELETE' })
    if (res.ok) setMakleri(prev => prev.filter(x => x.id !== m.id))
    setConfirmDelete(null)
  }

  async function copyLink(slug: string) {
    try {
      await navigator.clipboard.writeText(linkFor(slug))
      setCopied(slug)
      setTimeout(() => setCopied(null), 1800)
    } catch {}
  }

  if (forbidden) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Prístup len pre administrátora</h1>
        <p className="text-muted text-sm mb-6">Správu maklérov môže meniť iba administrátor.</p>
        <Link href="/admin" className="text-accent hover:underline text-sm">← Späť na dashboard</Link>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="text-muted hover:text-gray-900 text-sm">← Späť na dashboard</Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">Tím</div>
      </div>

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Makléri</h1>
          <p className="text-muted text-sm mt-1">
            {makleri.length} {makleri.length === 1 ? 'maklér' : 'maklérov'} · každý má vlastný kontaktný link
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2 rounded-md bg-accent hover:bg-accentHover transition font-semibold text-sm text-white"
        >
          + Pridať makléra
        </button>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mb-4 text-sm">{error}</div>
      )}

      <div className="bg-panel border border-border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-muted text-sm">Načítavam...</div>
        ) : makleri.length === 0 ? (
          <div className="p-10 text-center text-muted text-sm">
            Zatiaľ žiadni makléri. Pridajte prvého tlačidlom vyššie.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {makleri.map(m => (
              <li key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{m.name}</span>
                    {!m.active && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
                        neaktívny
                      </span>
                    )}
                  </div>
                  <div className="text-muted text-xs mt-0.5 truncate">{m.email}</div>
                  <button
                    onClick={() => copyLink(m.slug)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent hover:underline break-all text-left"
                    title="Kopírovať link"
                  >
                    🔗 {linkFor(m.slug)}
                    <span className="text-muted">{copied === m.slug ? '✓ skopírované' : '· kopírovať'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(m)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      m.active
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-panel2 text-muted border border-border'
                    }`}
                  >
                    {m.active ? 'Aktívny' : 'Neaktívny'}
                  </button>
                  <button
                    onClick={() => setEditing(m)}
                    className="px-3 py-1.5 rounded-md border border-border hover:border-accent text-xs font-medium"
                  >
                    Upraviť
                  </button>
                  <button
                    onClick={() => setConfirmDelete(m)}
                    className="px-3 py-1.5 rounded-md border border-border text-muted hover:text-red-600 hover:border-red-200 text-xs"
                  >
                    Zmazať
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
        <div className="font-semibold mb-1">Ako to funguje</div>
        <ul className="list-disc pl-5 space-y-1 text-blue-800/90">
          <li>Každý maklér dostane vlastný link na kontaktný formulár. Lead z jeho linku sa mu automaticky priradí.</li>
          <li>Maklér vidí v CRM len svoje leady + nepriradené (zdieľané). Admin vidí všetko.</li>
          <li>Po pridaní makléra sem mu ešte vytvorte prihlásenie v Supabase (rovnaký email).</li>
        </ul>
      </div>

      {showAdd && (
        <MaklerForm
          onClose={() => setShowAdd(false)}
          onSaved={m => {
            setMakleri(prev => [...prev, m])
            setShowAdd(false)
          }}
          slugify={slugify}
        />
      )}
      {editing && (
        <MaklerForm
          existing={editing}
          onClose={() => setEditing(null)}
          onSaved={m => {
            setMakleri(prev => prev.map(x => (x.id === m.id ? m : x)))
            setEditing(null)
          }}
          slugify={slugify}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setConfirmDelete(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative bg-panel border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-lg font-bold mb-2 text-gray-900">Zmazať makléra?</div>
            <div className="text-muted text-sm mb-2">{confirmDelete.name} ({confirmDelete.email})</div>
            <div className="text-muted text-xs mb-6">
              Jeho leady sa presunú medzi nepriradené (zdieľané). Prístup treba zrušiť aj v Supabase.
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 rounded-md border border-border hover:border-accent text-sm">Zrušiť</button>
              <button onClick={() => handleDelete(confirmDelete)} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Zmazať</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function MaklerForm({
  existing,
  onClose,
  onSaved,
  slugify,
}: {
  existing?: Makler
  onClose: () => void
  onSaved: (m: Makler) => void
  slugify: (name: string) => string
}) {
  const [name, setName] = useState(existing?.name ?? '')
  const [email, setEmail] = useState(existing?.email ?? '')
  const [slug, setSlug] = useState(existing?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(!!existing)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function onNameChange(v: string) {
    setName(v)
    if (!slugTouched) setSlug(slugify(v))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr(null)
    const url = existing ? `/api/makleri/${existing.id}` : '/api/makleri'
    const method = existing ? 'PATCH' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, slug }),
    })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (!res.ok) {
      setErr(typeof data.error === 'string' ? data.error : 'Skontrolujte vyplnené polia (slug: malé písmená, číslice, pomlčky).')
      return
    }
    onSaved(data)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full max-w-md bg-panel border-l border-border h-full p-4 sm:p-6 overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{existing ? 'Upraviť makléra' : 'Pridať makléra'}</h2>
          <button onClick={onClose} className="text-muted hover:text-gray-900">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">Meno a priezvisko *</label>
            <input value={name} onChange={e => onNameChange(e.target.value)} required placeholder="Ján Novák" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">Email *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jan@zajoreality.sk" />
            <div className="text-muted text-xs mt-1">Rovnaký email použite pri vytvorení prihlásenia v Supabase.</div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">Link (slug) *</label>
            <input
              value={slug}
              onChange={e => { setSlug(e.target.value); setSlugTouched(true) }}
              required
              placeholder="jan-novak"
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            />
            <div className="text-muted text-xs mt-1 break-all">{CONTACT_LINK_BASE}/{slug || 'jan-novak'}</div>
          </div>
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <button type="submit" disabled={saving} className="w-full py-3 rounded-md bg-accent hover:bg-accentHover disabled:opacity-50 transition font-semibold text-white">
            {saving ? 'Ukladám...' : existing ? 'Uložiť zmeny' : 'Pridať makléra'}
          </button>
        </form>
      </div>
    </div>
  )
}

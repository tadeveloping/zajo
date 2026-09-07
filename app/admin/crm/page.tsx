'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { LeadPredaj, LeadOcenenie, LeadCally, LeadStatus, LeadScore, Role } from '@/types'

interface LeadNote {
  id: string
  created_at: string
  lead_id: string
  lead_type: string
  content: string
  author_email?: string | null
}

interface MaklerLite {
  id: string
  name: string
  slug: string
  active: boolean
}

interface Me {
  email: string
  role: Role
  maklerId: string | null
  name: string | null
  makleri: MaklerLite[]
}

function formatRelativeTime(dateStr: string): string {
  const d = new Date(dateStr)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${dd}. ${mm}. ${yyyy} ${hh}:${min}`
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  novy: 'Nový',
  kontaktovany: 'Kontaktovaný',
  stretnutie: 'Stretnutie',
  v_procese: 'V procese',
  uzavrety: 'Uzavretý',
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  novy: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  kontaktovany: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
  stretnutie: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  v_procese: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  uzavrety: 'bg-green-50 text-green-700 ring-1 ring-green-200',
}

const SCORE_COLORS: Record<LeadScore, string> = {
  HOT: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  WARM: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  COLD: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
}

// A kontakt-form lead carries the interest the person picked in step 1.
// Surface that as the lead's "type" in the CRM so a predaj enquiry shows
// as Predaj, not the generic "Kontakt".
const ZAUJEM_LABELS: Record<string, string> = {
  'kúpa': 'Kúpa',
  'predaj': 'Predaj',
  'ocenenie': 'Ocenenie',
  'obhliadka': 'Obhliadka',
  'iné': 'Otázka',
}

function callyTypeLabel(zaujem: string | null): string {
  return (zaujem && ZAUJEM_LABELS[zaujem]) || 'Kontakt'
}

// Two origins: campaign landing forms (predaj/ocenenie) and the contact form (cally).
// Kept strictly separate so campaign leads and contact-form leads are never mixed.
type Tab = 'vsetky' | 'predaj' | 'ocenenie' | 'kontakt'
type OwnerFilter = 'vsetky' | 'nepriradene' | 'moje' | string

type AnyLead =
  | (LeadPredaj & { _type: 'predaj' })
  | (LeadOcenenie & { _type: 'ocenenie' })
  | (LeadCally & { _type: 'cally' })

function fmtDate(s: string) {
  return formatRelativeTime(s)
}

function fmtDateFull(s: string) {
  return new Date(s).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function ScoreBadge({ score }: { score: LeadScore }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${SCORE_COLORS[score]}`}>
      {score}
    </span>
  )
}

function OwnerBadge({ name }: { name: string | null | undefined }) {
  if (name) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200">
        {name}
      </span>
    )
  }
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 ring-1 ring-gray-200">
      Nepriradené
    </span>
  )
}

function typeMeta(lead: AnyLead): { label: string; color: string } {
  if (lead._type === 'predaj') return { label: 'Predaj', color: 'text-green-700' }
  if (lead._type === 'ocenenie') return { label: 'Ocenenie', color: 'text-yellow-700' }
  return { label: callyTypeLabel((lead as LeadCally).zaujem), color: 'text-purple-700' }
}

function leadInfo(lead: AnyLead): string {
  if (lead._type === 'predaj') {
    const l = lead as LeadPredaj & { _type: 'predaj' }
    return [l.typ, l.lokalita].filter(Boolean).join(' · ') || '—'
  }
  if (lead._type === 'ocenenie') {
    const l = lead as LeadOcenenie & { _type: 'ocenenie' }
    return [l.typ_nehnutelnosti, l.lokalita].filter(Boolean).join(' · ') || '—'
  }
  const l = lead as LeadCally & { _type: 'cally' }
  return [l.nehnutelnost, l.horizont].filter(Boolean).join(' · ') || '—'
}

export default function CrmPage() {
  const [me, setMe] = useState<Me | null>(null)
  const [tab, setTab] = useState<Tab>('vsetky')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'vsetky'>('vsetky')
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>('vsetky')
  const [predajLeads, setPredajLeads] = useState<LeadPredaj[]>([])
  const [oceneniaLeads, setOceneniaLeads] = useState<LeadOcenenie[]>([])
  const [callyLeads, setCallyLeads] = useState<LeadCally[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<AnyLead | null>(null)
  const [detailNotes, setDetailNotes] = useState('')
  const [detailStatus, setDetailStatus] = useState<LeadStatus>('novy')
  const [saving, setSaving] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<AnyLead | null>(null)
  const [leadNotes, setLeadNotes] = useState<LeadNote[]>([])
  const [newNoteText, setNewNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [notesLoading, setNotesLoading] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const isAdmin = me?.role === 'admin'

  async function safeJson(res: Response) {
    if (!res.ok) throw new Error(`Server odmietol požiadavku (${res.status}). Skúste to znova.`)
    try {
      return await res.json()
    } catch {
      throw new Error('Server vrátil neočakávanú odpoveď. Skúste to znova.')
    }
  }

  const loadAllOnce = useCallback(async () => {
    const opts = { cache: 'no-store' } as RequestInit
    const [rMe, rPredaj, rOcenenie, rCally] = await Promise.all([
      fetch('/api/me', opts),
      fetch('/api/leads/predaj', opts),
      fetch('/api/leads/ocenenie', opts),
      fetch('/api/leads/cally', opts),
    ])
    const [dMe, dPredaj, dOcenenie, dCally] = await Promise.all([
      safeJson(rMe),
      safeJson(rPredaj),
      safeJson(rOcenenie),
      safeJson(rCally),
    ])
    setMe(dMe)
    setPredajLeads(dPredaj)
    setOceneniaLeads(dOcenenie)
    setCallyLeads(dCally)
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    const RETRIES = 2
    for (let attempt = 0; attempt <= RETRIES; attempt++) {
      try {
        await loadAllOnce()
        setLoading(false)
        return
      } catch (e) {
        if (attempt === RETRIES) {
          setError(e instanceof Error ? e.message : 'Chyba pri načítaní')
          setLoading(false)
          return
        }
        await new Promise(r => setTimeout(r, 800))
      }
    }
  }, [loadAllOnce])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  async function openDetail(lead: AnyLead) {
    setSelectedLead(lead)
    setDetailNotes(lead.notes ?? '')
    setDetailStatus(lead.status)
    setNewNoteText('')
    setLeadNotes([])
    setNotesLoading(true)
    try {
      const res = await fetch(`/api/notes?lead_id=${lead.id}&lead_type=${lead._type}`)
      if (res.ok) setLeadNotes(await res.json())
    } catch {}
    finally { setNotesLoading(false) }
  }

  function closeDetail() {
    setSelectedLead(null)
    setLeadNotes([])
    setNewNoteText('')
  }

  function applyUpdatedLead(table: AnyLead['_type'], updated: AnyLead) {
    if (table === 'predaj') setPredajLeads(prev => prev.map(l => l.id === updated.id ? updated as LeadPredaj : l))
    else if (table === 'ocenenie') setOceneniaLeads(prev => prev.map(l => l.id === updated.id ? updated as LeadOcenenie : l))
    else setCallyLeads(prev => prev.map(l => l.id === updated.id ? updated as LeadCally : l))
  }

  async function addNote() {
    if (!selectedLead || !newNoteText.trim()) return
    setSavingNote(true)
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: selectedLead.id, lead_type: selectedLead._type, content: newNoteText.trim() }),
      })
      if (res.ok) {
        const note = await res.json()
        setLeadNotes(prev => [...prev, note])
        setNewNoteText('')
      }
    } catch {}
    finally { setSavingNote(false) }
  }

  async function saveStatus(status: LeadStatus) {
    if (!selectedLead) return
    setSaving(true)
    setSaveError(null)
    const table = selectedLead._type
    try {
      const res = await fetch(`/api/leads/${table}/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes: detailNotes }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error ? (typeof err.error === 'string' ? err.error : JSON.stringify(err.error)) : `HTTP ${res.status}`)
      }
      const updated = { ...(await res.json()), _type: table } as AnyLead
      setDetailStatus(status)
      applyUpdatedLead(table, updated)
      setSelectedLead(updated)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Neznáma chyba')
    } finally {
      setSaving(false)
    }
  }

  async function saveNotes() {
    if (!selectedLead) return
    setSaving(true)
    const table = selectedLead._type
    try {
      const res = await fetch(`/api/leads/${table}/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: detailStatus, notes: detailNotes }),
      })
      if (!res.ok) throw new Error()
      const updated = { ...(await res.json()), _type: table } as AnyLead
      applyUpdatedLead(table, updated)
      setSelectedLead(updated)
    } catch {
      // silent
    } finally {
      setSaving(false)
    }
  }

  // Claim (maklér → self) or reassign (admin → anyone / shared pool).
  async function assignLead(lead: AnyLead, assignedTo: string | null) {
    setAssigning(true)
    setSaveError(null)
    try {
      const res = await fetch(`/api/leads/${lead._type}/${lead.id}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: assignedTo }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Priradenie zlyhalo')
      const updated = { ...data, _type: lead._type } as AnyLead
      applyUpdatedLead(lead._type, updated)
      if (selectedLead?.id === lead.id) setSelectedLead(updated)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Priradenie zlyhalo')
      loadAll()
    } finally {
      setAssigning(false)
    }
  }

  async function handleDelete(lead: AnyLead) {
    const res = await fetch(`/api/leads/${lead._type}/${lead.id}`, { method: 'DELETE' })
    if (res.ok) {
      if (lead._type === 'predaj') setPredajLeads(prev => prev.filter(l => l.id !== lead.id))
      else if (lead._type === 'ocenenie') setOceneniaLeads(prev => prev.filter(l => l.id !== lead.id))
      else setCallyLeads(prev => prev.filter(l => l.id !== lead.id))
      if (selectedLead?.id === lead.id) closeDetail()
    }
    setConfirmDelete(null)
  }

  const allLeads: AnyLead[] = [
    ...predajLeads.map(l => ({ ...l, _type: 'predaj' as const })),
    ...oceneniaLeads.map(l => ({ ...l, _type: 'ocenenie' as const })),
    ...callyLeads.map(l => ({ ...l, _type: 'cally' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const newCounts = {
    predaj: predajLeads.filter(l => l.status === 'novy').length,
    ocenenie: oceneniaLeads.filter(l => l.status === 'novy').length,
    kontakt: callyLeads.filter(l => l.status === 'novy').length,
    total: allLeads.filter(l => l.status === 'novy').length,
  }

  function matchesOwner(lead: AnyLead): boolean {
    if (ownerFilter === 'vsetky') return true
    if (ownerFilter === 'nepriradene') return !lead.assigned_to
    if (ownerFilter === 'moje') return lead.assigned_to === me?.maklerId
    return lead.assigned_to === ownerFilter
  }

  function getVisibleLeads(): AnyLead[] {
    let list: AnyLead[]
    if (tab === 'vsetky') list = allLeads
    else if (tab === 'predaj') list = predajLeads.map(l => ({ ...l, _type: 'predaj' as const }))
    else if (tab === 'ocenenie') list = oceneniaLeads.map(l => ({ ...l, _type: 'ocenenie' as const }))
    else list = callyLeads.map(l => ({ ...l, _type: 'cally' as const }))
    if (statusFilter !== 'vsetky') list = list.filter(l => l.status === statusFilter)
    list = list.filter(matchesOwner)
    return list
  }

  const visible = getVisibleLeads()
  const hotCount = callyLeads.filter(l => l.score === 'HOT').length
  const unassignedCount = allLeads.filter(l => !l.assigned_to).length

  function getUtmSourceLabel(utm: string | null): string {
    if (!utm) return '—'
    if (utm === 'facebook') return '📘 Facebook'
    if (utm === 'instagram') return '📷 Instagram'
    return utm
  }

  const tabBadge = (t: Tab) => {
    const count = t === 'predaj' ? newCounts.predaj : t === 'ocenenie' ? newCounts.ocenenie : t === 'kontakt' ? newCounts.kontakt : newCounts.total
    return count > 0 ? (
      <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent">{count}</span>
    ) : null
  }

  const TAB_LABELS: Record<Tab, string> = {
    vsetky: 'Všetky',
    predaj: 'Predaj',
    ocenenie: 'Ocenenie',
    kontakt: 'Kontakt',
  }

  // Owner filter chips — differ by role.
  const ownerChips: Array<{ val: OwnerFilter; label: string }> = isAdmin
    ? [
        { val: 'vsetky', label: 'Všetci' },
        { val: 'nepriradene', label: `Nepriradené${unassignedCount ? ` (${unassignedCount})` : ''}` },
        ...(me?.maklerId ? [{ val: 'moje' as OwnerFilter, label: 'Moje' }] : []),
        ...(me?.makleri ?? []).map(m => ({ val: m.id as OwnerFilter, label: m.name })),
      ]
    : [
        { val: 'vsetky', label: 'Všetky moje' },
        { val: 'moje', label: 'Priradené mne' },
        { val: 'nepriradene', label: `Nepriradené${unassignedCount ? ` (${unassignedCount})` : ''}` },
      ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin" className="text-muted hover:text-gray-900 text-sm">← Späť na dashboard</Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">CRM</div>
      </div>

      <header className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">CRM Leady</h1>
          <p className="text-muted text-sm mt-1">
            {allLeads.length} leadov · {newCounts.total} nových · {hotCount} HOT
            {me && (
              <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-panel2 border border-border">
                {isAdmin ? 'Admin — vidíte všetko' : `Maklér${me.name ? ` · ${me.name}` : ''}`}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={loadAll}
          className="px-4 py-2 rounded-md border border-border bg-panel hover:border-accent hover:text-accent transition text-sm font-medium shadow-sm"
        >
          Obnoviť
        </button>
      </header>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <StatBox label="Kampaň: Predaj" value={predajLeads.length} sub={`${newCounts.predaj} nových`} tone="text-green-600"
          info={'Leady z kampaňového formulára Predaj (napr. z reklamy na Facebooku/Instagrame). Sú nepriradené, kým si ich niekto nevezme.'} />
        <StatBox label="Kampaň: Ocenenie" value={oceneniaLeads.length} sub={`${newCounts.ocenenie} nových`} tone="text-yellow-600"
          info={'Leady z kampaňového formulára Ocenenie. Tiež nepriradené (zdieľané), kým si ich niekto nevezme.'} />
        <StatBox label="Kontakt formulár" value={callyLeads.length} sub={`${newCounts.kontakt} nových`} tone="text-purple-600"
          info={'Leady z kontaktného formulára. Ak prišli cez osobný link makléra, priradia sa mu automaticky.'} />
        <StatBox label="HOT leady" value={hotCount} tone="text-red-600"
          info={'Najhorúcejšie leady — chcú konať čo najskôr (napr. obhliadka alebo predaj/kúpa do 3 mesiacov). Volať prednostne.'} />
        <StatBox label="Nepriradené" value={unassignedCount} tone="text-gray-700"
          info={'Leady bez konkrétneho makléra — zdieľaný fond. Ktorýkoľvek maklér si ich môže vziať tlačidlom Vziať si.'} />
      </div>

      {/* Origin note */}
      <div className="text-xs text-muted mb-3">
        <span className="font-semibold text-gray-600">Predaj</span> a <span className="font-semibold text-gray-600">Ocenenie</span> = kampaňové formuláre ·{' '}
        <span className="font-semibold text-gray-600">Kontakt</span> = kontaktný formulár
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-4 border-b border-border overflow-x-auto overflow-y-hidden">
        {(['vsetky', 'predaj', 'ocenenie', 'kontakt'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px flex items-center whitespace-nowrap ${
              tab === t ? 'border-accent text-gray-900' : 'border-transparent text-muted hover:text-gray-900'
            }`}
          >
            {TAB_LABELS[t]}
            {t !== 'vsetky' && tabBadge(t)}
          </button>
        ))}
      </div>

      {/* Owner filter */}
      <div className="flex flex-wrap gap-2 mb-3">
        {ownerChips.map(c => (
          <button
            key={c.val}
            onClick={() => setOwnerFilter(c.val)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              ownerFilter === c.val ? 'bg-indigo-600 text-white' : 'bg-panel2 text-muted border border-border hover:border-indigo-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {(['vsetky', 'novy', 'kontaktovany', 'stretnutie', 'v_procese', 'uzavrety'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              statusFilter === s ? 'bg-accent text-white' : 'bg-panel2 text-muted border border-border hover:border-accent'
            }`}
          >
            {s === 'vsetky' ? 'Všetky statusy' : STATUS_LABELS[s as LeadStatus]}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mb-4 text-sm">{error}</div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block bg-panel border border-border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-muted text-sm">Načítavam...</div>
        ) : visible.length === 0 ? (
          <div className="p-10 text-center text-muted text-sm">Žiadne leady pre zvolený filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-panel2">
                <tr className="text-left text-muted text-xs uppercase tracking-widest border-b border-border">
                  <th className="px-4 py-3 font-semibold">Meno</th>
                  <th className="px-4 py-3 font-semibold">Kontakt</th>
                  <th className="px-4 py-3 font-semibold">Typ</th>
                  <th className="px-4 py-3 font-semibold">Info</th>
                  <th className="px-4 py-3 font-semibold">Maklér</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Dátum</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {visible.map(lead => (
                  <LeadRow
                    key={`${lead._type}-${lead.id}`}
                    lead={lead}
                    onClick={() => openDetail(lead)}
                    isSelected={selectedLead?.id === lead.id}
                    utmLabel={getUtmSourceLabel(lead.utm_source)}
                    canClaim={!lead.assigned_to && !!me?.maklerId}
                    onClaim={() => me?.maklerId && assignLead(lead, me.maklerId)}
                    assigning={assigning}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="p-8 text-center text-muted text-sm bg-panel border border-border rounded-xl">Načítavam...</div>
        ) : visible.length === 0 ? (
          <div className="p-8 text-center text-muted text-sm bg-panel border border-border rounded-xl">Žiadne leady pre zvolený filter.</div>
        ) : (
          visible.map(lead => (
            <LeadCard
              key={`${lead._type}-${lead.id}`}
              lead={lead}
              onOpen={() => openDetail(lead)}
              canClaim={!lead.assigned_to && !!me?.maklerId}
              onClaim={() => me?.maklerId && assignLead(lead, me.maklerId)}
              assigning={assigning}
            />
          ))
        )}
      </div>

      {/* Detail panel */}
      {selectedLead && (
        <>
          {saveError && (
            <div style={{
              position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
              background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c',
              borderRadius: '10px', padding: '12px 20px', fontSize: '13px', zIndex: 9999,
              maxWidth: '480px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}>
              ❌ {saveError}
            </div>
          )}
          <DetailPanel
            lead={selectedLead}
            me={me}
            notes={detailNotes}
            status={detailStatus}
            saving={saving}
            assigning={assigning}
            onNotesChange={setDetailNotes}
            onStatusChange={saveStatus}
            onNotesSave={saveNotes}
            onAssign={(to) => assignLead(selectedLead, to)}
            onDelete={() => setConfirmDelete(selectedLead)}
            onClose={closeDetail}
            leadNotes={leadNotes}
            notesLoading={notesLoading}
            newNoteText={newNoteText}
            onNewNoteTextChange={setNewNoteText}
            onAddNote={addNote}
            savingNote={savingNote}
          />
        </>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setConfirmDelete(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative bg-panel border border-border rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-lg font-bold mb-2 text-gray-900">Zmazať lead?</div>
            <div className="text-muted text-sm mb-6">{confirmDelete.name}</div>
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

function StatBox({ label, value, sub, tone, info }: { label: string; value: number; sub?: string; tone: string; info?: string }) {
  return (
    <div className="bg-panel border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-1">
        <div className="text-muted text-[11px] uppercase tracking-widest font-semibold">{label}</div>
        {info && <InfoDot text={info} />}
      </div>
      <div className={`text-2xl font-bold mt-1 ${tone}`}>{value}</div>
      {sub && <div className="text-muted text-xs mt-0.5">{sub}</div>}
    </div>
  )
}

// Small "i" icon with a click-to-toggle explanation. Works on touch (tap) as well
// as mouse; closes on outside click or Escape. The bubble is positioned relative
// to the VIEWPORT (not the card it sits in) and clamped to stay fully on-screen —
// a card near the left edge (common in a 2-col mobile grid) would otherwise push
// an absolutely-positioned bubble off the left side of the screen.
function InfoDot({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  const BUBBLE_WIDTH = 224 // px, matches w-56
  const MARGIN = 8

  function toggle() {
    if (open) {
      setOpen(false)
      return
    }
    const rect = btnRef.current?.getBoundingClientRect()
    if (rect) {
      const left = Math.min(
        Math.max(rect.right - BUBBLE_WIDTH, MARGIN),
        window.innerWidth - BUBBLE_WIDTH - MARGIN
      )
      setCoords({ top: rect.bottom + 6, left })
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      const target = e.target as Node
      if (btnRef.current?.contains(target)) return
      if (bubbleRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', () => setOpen(false), { passive: true })
    window.addEventListener('resize', () => setOpen(false))
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="Vysvetlenie"
        onClick={toggle}
        className={`w-4 h-4 rounded-full border text-[10px] font-bold leading-none flex items-center justify-center transition flex-shrink-0 ${
          open ? 'bg-accent text-white border-accent' : 'border-border text-muted hover:border-accent hover:text-accent'
        }`}
      >
        i
      </button>
      {open && coords && (
        <div
          ref={bubbleRef}
          role="tooltip"
          style={{ position: 'fixed', top: coords.top, left: coords.left, width: BUBBLE_WIDTH }}
          className="z-50 max-w-[calc(100vw-16px)] rounded-lg border border-border bg-white p-3 text-xs leading-relaxed text-gray-700 shadow-xl"
        >
          {text}
        </div>
      )}
    </>
  )
}

function LeadRow({
  lead, onClick, isSelected, utmLabel, canClaim, onClaim, assigning,
}: {
  lead: AnyLead
  onClick: () => void
  isSelected: boolean
  utmLabel: string
  canClaim: boolean
  onClaim: () => void
  assigning: boolean
}) {
  const { label: typeLabel, color: typeColor } = typeMeta(lead)
  return (
    <tr
      onClick={onClick}
      className={`border-b border-border last:border-0 cursor-pointer transition ${isSelected ? 'bg-accent/10' : 'hover:bg-panel2'}`}
    >
      <td className="px-4 py-3 text-gray-900 font-semibold">{lead.name}</td>
      <td className="px-4 py-3 text-soft">
        <div>{lead.phone || '—'}</div>
        {lead.email && <div className="text-muted text-xs">{lead.email}</div>}
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold ${typeColor}`}>{typeLabel}</span>
        {lead._type === 'cally' && (
          <div className="mt-1"><ScoreBadge score={(lead as LeadCally & { _type: 'cally' }).score} /></div>
        )}
      </td>
      <td className="px-4 py-3 text-muted text-xs max-w-[160px] truncate">{leadInfo(lead)}</td>
      <td className="px-4 py-3">
        <OwnerBadge name={lead.assignee_name} />
      </td>
      <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
      <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{fmtDate(lead.created_at)}</td>
      <td className="px-4 py-3">
        {canClaim && (
          <button
            onClick={e => { e.stopPropagation(); onClaim() }}
            disabled={assigning}
            className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold whitespace-nowrap"
          >
            Vziať si
          </button>
        )}
      </td>
    </tr>
  )
}

function LeadCard({
  lead, onOpen, canClaim, onClaim, assigning,
}: {
  lead: AnyLead
  onOpen: () => void
  canClaim: boolean
  onClaim: () => void
  assigning: boolean
}) {
  const { label: typeLabel, color: typeColor } = typeMeta(lead)
  return (
    <div className="bg-panel border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2" onClick={onOpen}>
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">{lead.name}</div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs font-semibold ${typeColor}`}>{typeLabel}</span>
            {lead._type === 'cally' && <ScoreBadge score={(lead as LeadCally & { _type: 'cally' }).score} />}
            <StatusBadge status={lead.status} />
          </div>
        </div>
        <div className="text-muted text-[11px] whitespace-nowrap flex-shrink-0">{fmtDate(lead.created_at)}</div>
      </div>

      <div className="text-muted text-xs mt-2" onClick={onOpen}>{leadInfo(lead)}</div>

      <div className="flex items-center gap-2 mt-2">
        <OwnerBadge name={lead.assignee_name} />
        {lead.utm_source && (
          <span className="text-muted text-[11px]">
            {lead.utm_source === 'facebook' ? '📘 FB' : lead.utm_source === 'instagram' ? '📷 IG' : lead.utm_source}
          </span>
        )}
      </div>

      {/* Tap-to-call / mail */}
      <div className="flex gap-2 mt-3">
        {lead.phone && (
          <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="flex-1 text-center px-3 py-2 rounded-md bg-green-50 text-green-700 border border-green-200 text-sm font-semibold">
            📞 Volať
          </a>
        )}
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="flex-1 text-center px-3 py-2 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold">
            ✉️ Email
          </a>
        )}
        {canClaim ? (
          <button
            onClick={onClaim}
            disabled={assigning}
            className="flex-1 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold"
          >
            Vziať si
          </button>
        ) : (
          <button onClick={onOpen} className="flex-1 px-3 py-2 rounded-md border border-border text-gray-700 text-sm font-semibold">
            Detail
          </button>
        )}
      </div>
    </div>
  )
}

function DetailPanel({
  lead, me, notes, status, saving, assigning,
  onNotesChange, onStatusChange, onNotesSave, onAssign, onDelete, onClose,
  leadNotes, notesLoading, newNoteText, onNewNoteTextChange, onAddNote, savingNote,
}: {
  lead: AnyLead
  me: Me | null
  notes: string
  status: LeadStatus
  saving: boolean
  assigning: boolean
  onNotesChange: (v: string) => void
  onStatusChange: (s: LeadStatus) => void
  onNotesSave: () => void
  onAssign: (to: string | null) => void
  onDelete: () => void
  onClose: () => void
  leadNotes: LeadNote[]
  notesLoading: boolean
  newNoteText: string
  onNewNoteTextChange: (v: string) => void
  onAddNote: () => void
  savingNote: boolean
}) {
  const isAdmin = me?.role === 'admin'
  const canClaim = !lead.assigned_to && !!me?.maklerId
  const { label: typeLabel } = typeMeta(lead)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full max-w-md bg-panel border-l border-border h-full p-4 sm:p-6 overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{lead.name}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-muted">{typeLabel}</span>
              {lead._type === 'cally' && <ScoreBadge score={(lead as LeadCally & { _type: 'cally' }).score} />}
              <OwnerBadge name={lead.assignee_name} />
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-gray-900 text-lg">✕</button>
        </div>

        {/* Quick actions: call / mail */}
        <div className="flex gap-2 mb-5">
          {lead.phone && (
            <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="flex-1 text-center px-3 py-2.5 rounded-md bg-green-50 text-green-700 border border-green-200 text-sm font-semibold">
              📞 Volať
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex-1 text-center px-3 py-2.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-sm font-semibold">
              ✉️ Email
            </a>
          )}
        </div>

        {/* Assignment */}
        <div className="mb-5 p-3 bg-panel2 rounded-lg border border-border">
          <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">Priradenie</label>
          {isAdmin ? (
            <select
              value={lead.assigned_to ?? ''}
              disabled={assigning}
              onChange={e => onAssign(e.target.value || null)}
              className="w-full"
            >
              <option value="">Nepriradené (zdieľané)</option>
              {(me?.makleri ?? []).map(m => (
                <option key={m.id} value={m.id}>{m.name}{!m.active ? ' (neaktívny)' : ''}</option>
              ))}
            </select>
          ) : canClaim ? (
            <button
              onClick={() => me?.maklerId && onAssign(me.maklerId)}
              disabled={assigning}
              className="w-full py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold"
            >
              {assigning ? 'Priraďujem...' : 'Vziať si tento lead'}
            </button>
          ) : (
            <div className="text-sm text-soft">{lead.assignee_name ?? 'Nepriradené'}</div>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-5">
          <Field label="Telefón" value={lead.phone} />
          <Field label="Email" value={lead.email} />
          <Field label="Zdroj" value={lead.source} />
          <Field label="Dátum" value={fmtDate(lead.created_at)} />
          {lead.utm_source && (
            <div className="flex gap-2 text-sm">
              <span className="text-muted min-w-[80px] flex-shrink-0">UTM zdroj:</span>
              <span className="text-soft">
                {lead.utm_source === 'facebook' ? '📘 Facebook' : lead.utm_source === 'instagram' ? '📷 Instagram' : lead.utm_source}
              </span>
            </div>
          )}
          {lead.utm_campaign && (
            <div className="flex gap-2 text-sm">
              <span className="text-muted min-w-[80px] flex-shrink-0">Kampaň:</span>
              <span className="text-soft">{lead.utm_campaign}</span>
            </div>
          )}
        </div>

        {lead._type === 'predaj' && <PredajFields lead={lead as LeadPredaj & { _type: 'predaj' }} />}
        {lead._type === 'ocenenie' && <OcenenieFields lead={lead as LeadOcenenie & { _type: 'ocenenie' }} />}
        {lead._type === 'cally' && <CallyFields lead={lead as LeadCally & { _type: 'cally' }} />}

        {/* Status */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STATUS_LABELS) as LeadStatus[]).map(s => (
              <button
                key={s}
                disabled={saving}
                onClick={() => onStatusChange(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition disabled:opacity-50 ${
                  status === s ? STATUS_COLORS[s] + ' ring-2 ring-accent/40' : 'bg-panel2 text-muted border border-border hover:border-accent'
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Notes history */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">História poznámok</label>
          {notesLoading ? (
            <div className="text-xs text-muted py-2">Načítavam...</div>
          ) : leadNotes.length === 0 ? (
            <div className="text-xs text-muted py-2 bg-panel2 border border-border rounded-md px-3">Zatiaľ žiadne poznámky.</div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
              {leadNotes.map(note => (
                <div key={note.id} className="bg-panel2 border border-border rounded-md px-3 py-2">
                  <div className="text-xs text-muted mb-1" title={fmtDateFull(note.created_at)}>{formatRelativeTime(note.created_at)}</div>
                  <div className="text-sm text-soft leading-relaxed whitespace-pre-wrap">{note.content}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <textarea
              value={newNoteText}
              onChange={e => onNewNoteTextChange(e.target.value)}
              placeholder="Pridať poznámku..."
              rows={3}
              className="w-full bg-panel2 border border-border rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-muted resize-none focus:outline-none focus:border-accent transition"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onAddNote() }
              }}
            />
            <button
              onClick={onAddNote}
              disabled={savingNote || !newNoteText.trim()}
              className="mt-2 px-4 py-2 rounded-md bg-accent hover:bg-accentHover disabled:opacity-40 text-white text-xs font-semibold transition shadow-sm"
            >
              {savingNote ? 'Ukladám...' : 'Pridať poznámku'}
            </button>
            <div className="text-xs text-muted mt-1">Ctrl+Enter na odoslanie</div>
          </div>
        </div>

        {/* Delete — admin only */}
        {isAdmin && (
          <button
            onClick={onDelete}
            className="w-full py-2.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition"
          >
            Zmazať lead
          </button>
        )}
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-muted min-w-[80px] flex-shrink-0">{label}:</span>
      <span className="text-soft break-words">{value}</span>
    </div>
  )
}

function NewsletterField({ prihlaseny }: { prihlaseny?: boolean }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-muted min-w-[80px] flex-shrink-0">Newsletter:</span>
      <span className={prihlaseny ? 'text-green-700 font-semibold' : 'text-soft'}>
        {prihlaseny ? 'Áno, prihlásený' : 'Nie, neprihlásil sa'}
      </span>
    </div>
  )
}

function PredajFields({ lead }: { lead: LeadPredaj & { _type: 'predaj' } }) {
  return (
    <div className="space-y-2 mb-5 p-3 bg-panel2 rounded-lg border border-border">
      <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">Detaily predaja</div>
      <Field label="Typ" value={lead.typ} />
      <Field label="Lokalita" value={lead.lokalita} />
      <Field label="Časový rámec" value={lead.casovy_ramec} />
      <NewsletterField prihlaseny={lead.newsletter_prihlaseny} />
      {lead.sprava && (
        <div className="text-sm">
          <div className="text-muted text-xs mb-1">Správa:</div>
          <div className="text-soft leading-relaxed">{lead.sprava}</div>
        </div>
      )}
    </div>
  )
}

function OcenenieFields({ lead }: { lead: LeadOcenenie & { _type: 'ocenenie' } }) {
  return (
    <div className="space-y-2 mb-5 p-3 bg-panel2 rounded-lg border border-border">
      <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">Detaily ocenenia</div>
      <Field label="Typ" value={lead.typ_nehnutelnosti} />
      <Field label="Lokalita" value={lead.lokalita} />
      <Field label="Rozloha" value={lead.rozloha} />
      <Field label="Stav" value={lead.stav_nehnutelnosti} />
      <NewsletterField prihlaseny={lead.newsletter_prihlaseny} />
      {lead.doplnujuce_info && (
        <div className="text-sm">
          <div className="text-muted text-xs mb-1">Doplňujúce info:</div>
          <div className="text-soft leading-relaxed">{lead.doplnujuce_info}</div>
        </div>
      )}
    </div>
  )
}

function CallyFields({ lead }: { lead: LeadCally & { _type: 'cally' } }) {
  return (
    <div className="space-y-2 mb-5 p-3 bg-panel2 rounded-lg border border-border">
      <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">Detaily kontaktu</div>
      <Field label="Záujem" value={lead.zaujem} />
      <Field label="Nehnuteľnosť" value={lead.nehnutelnost} />
      <Field label="Horizont" value={lead.horizont} />
      <div className="flex gap-2 text-sm">
        <span className="text-muted min-w-[80px] flex-shrink-0">Zavolať:</span>
        <span className="text-soft">
          {lead.zavolame ? lead.zavolame.charAt(0).toUpperCase() + lead.zavolame.slice(1) : 'Nevybral'}
        </span>
      </div>
      {lead.sprava && (
        <div className="text-sm">
          <div className="text-muted text-xs mb-1">Správa:</div>
          <div className="text-soft leading-relaxed">{lead.sprava}</div>
        </div>
      )}
    </div>
  )
}

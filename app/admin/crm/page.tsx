'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { LeadPredaj, LeadOcenenie, LeadCally, LeadStatus, LeadScore } from '@/types'

interface LeadNote {
  id: string
  created_at: string
  lead_id: string
  lead_type: string
  content: string
  author_email?: string | null
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
  novy: 'bg-blue-500/20 text-blue-300',
  kontaktovany: 'bg-yellow-500/20 text-yellow-300',
  stretnutie: 'bg-purple-500/20 text-purple-300',
  v_procese: 'bg-orange-500/20 text-orange-300',
  uzavrety: 'bg-green-500/20 text-green-300',
}

const SCORE_COLORS: Record<LeadScore, string> = {
  HOT: 'bg-red-500/20 text-red-300',
  WARM: 'bg-orange-500/20 text-orange-300',
  COLD: 'bg-blue-500/20 text-blue-300',
}

type Tab = 'vsetky' | 'predaj' | 'ocenenie' | 'cally'

type AnyLead = (LeadPredaj & { _type: 'predaj' }) | (LeadOcenenie & { _type: 'ocenenie' }) | (LeadCally & { _type: 'cally' })

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

export default function CrmPage() {
  const [tab, setTab] = useState<Tab>('vsetky')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'vsetky'>('vsetky')
  const [predajLeads, setPredajLeads] = useState<LeadPredaj[]>([])
  const [oceneniaLeads, setOceneniaLeads] = useState<LeadOcenenie[]>([])
  const [callyLeads, setCallyLeads] = useState<LeadCally[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [counts, setCounts] = useState({ predaj: 0, ocenenie: 0, cally: 0, total: 0 })
  const [selectedLead, setSelectedLead] = useState<AnyLead | null>(null)
  const [detailNotes, setDetailNotes] = useState('')
  const [detailStatus, setDetailStatus] = useState<LeadStatus>('novy')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<AnyLead | null>(null)
  const [leadNotes, setLeadNotes] = useState<LeadNote[]>([])
  const [newNoteText, setNewNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [notesLoading, setNotesLoading] = useState(false)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [rPredaj, rOcenenie, rCally, rCounts] = await Promise.all([
        fetch('/api/leads/predaj'),
        fetch('/api/leads/ocenenie'),
        fetch('/api/leads/cally'),
        fetch('/api/leads/count'),
      ])
      if (!rPredaj.ok || !rOcenenie.ok || !rCally.ok) throw new Error('Chyba pri načítaní')
      const [dPredaj, dOcenenie, dCally, dCounts] = await Promise.all([
        rPredaj.json(),
        rOcenenie.json(),
        rCally.json(),
        rCounts.json(),
      ])
      setPredajLeads(dPredaj)
      setOceneniaLeads(dOcenenie)
      setCallyLeads(dCally)
      setCounts(dCounts)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba')
    } finally {
      setLoading(false)
    }
  }, [])

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
      if (res.ok) {
        const data = await res.json()
        setLeadNotes(data)
      }
    } catch {}
    finally { setNotesLoading(false) }
  }

  function closeDetail() {
    setSelectedLead(null)
    setLeadNotes([])
    setNewNoteText('')
  }

  async function addNote() {
    if (!selectedLead || !newNoteText.trim()) return
    setSavingNote(true)
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: selectedLead.id,
          lead_type: selectedLead._type,
          content: newNoteText.trim(),
        }),
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
    const table = selectedLead._type
    try {
      const res = await fetch(`/api/leads/${table}/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes: detailNotes }),
      })
      if (!res.ok) throw new Error('Chyba pri ukladaní')
      const updated = await res.json()
      setDetailStatus(status)
      // Update local state
      if (table === 'predaj') {
        setPredajLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      } else if (table === 'ocenenie') {
        setOceneniaLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      } else {
        setCallyLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      }
      setSelectedLead({ ...updated, _type: table } as AnyLead)
      // Refresh counts
      fetch('/api/leads/count').then(r => r.json()).then(setCounts).catch(() => {})
    } catch {
      // silent
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
      const updated = await res.json()
      if (table === 'predaj') {
        setPredajLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      } else if (table === 'ocenenie') {
        setOceneniaLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      } else {
        setCallyLeads(prev => prev.map(l => l.id === updated.id ? updated : l))
      }
      setSelectedLead({ ...updated, _type: table } as AnyLead)
    } catch {
      // silent
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(lead: AnyLead) {
    const table = lead._type
    const res = await fetch(`/api/leads/${table}/${lead.id}`, { method: 'DELETE' })
    if (res.ok) {
      if (table === 'predaj') setPredajLeads(prev => prev.filter(l => l.id !== lead.id))
      else if (table === 'ocenenie') setOceneniaLeads(prev => prev.filter(l => l.id !== lead.id))
      else setCallyLeads(prev => prev.filter(l => l.id !== lead.id))
      if (selectedLead?.id === lead.id) closeDetail()
      fetch('/api/leads/count').then(r => r.json()).then(setCounts).catch(() => {})
    }
    setConfirmDelete(null)
  }

  // Build combined list
  const allLeads: AnyLead[] = [
    ...predajLeads.map(l => ({ ...l, _type: 'predaj' as const })),
    ...oceneniaLeads.map(l => ({ ...l, _type: 'ocenenie' as const })),
    ...callyLeads.map(l => ({ ...l, _type: 'cally' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  function getVisibleLeads(): AnyLead[] {
    let list: AnyLead[] = []
    if (tab === 'vsetky') list = allLeads
    else if (tab === 'predaj') list = predajLeads.map(l => ({ ...l, _type: 'predaj' as const }))
    else if (tab === 'ocenenie') list = oceneniaLeads.map(l => ({ ...l, _type: 'ocenenie' as const }))
    else list = callyLeads.map(l => ({ ...l, _type: 'cally' as const }))
    if (statusFilter !== 'vsetky') list = list.filter(l => l.status === statusFilter)
    return list
  }

  const visible = getVisibleLeads()
  const hotCount = callyLeads.filter(l => l.score === 'HOT').length

  function getUtmSourceLabel(utm: string | null): string {
    if (!utm) return '—'
    if (utm === 'facebook') return '📘 Facebook'
    if (utm === 'instagram') return '📷 Instagram'
    return utm
  }

  const facebookCount = visible.filter(l => l.utm_source === 'facebook').length
  const instagramCount = visible.filter(l => l.utm_source === 'instagram').length

  const tabLabel = (t: Tab) => {
    const count = t === 'predaj' ? counts.predaj : t === 'ocenenie' ? counts.ocenenie : t === 'cally' ? counts.cally : counts.total
    return count > 0 ? (
      <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent">{count}</span>
    ) : null
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="text-muted hover:text-white text-sm">
          ← Späť na dashboard
        </Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">CRM</div>
      </div>

      <header className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">CRM Leady</h1>
          <p className="text-muted text-sm mt-1">
            {allLeads.length} leadov celkom · {counts.total} nových · {hotCount} HOT
          </p>
        </div>
        <button
          onClick={loadAll}
          className="px-4 py-2 rounded-md border border-border hover:border-accent transition text-sm"
        >
          Obnoviť
        </button>
      </header>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-panel border border-border rounded-lg p-4">
          <div className="text-muted text-xs uppercase tracking-widest font-semibold">Celkom</div>
          <div className="text-2xl font-bold mt-1">{allLeads.length}</div>
        </div>
        <div className="bg-panel border border-border rounded-lg p-4">
          <div className="text-muted text-xs uppercase tracking-widest font-semibold">Nových</div>
          <div className="text-2xl font-bold mt-1 text-blue-300">{counts.total}</div>
        </div>
        <div className="bg-panel border border-border rounded-lg p-4">
          <div className="text-muted text-xs uppercase tracking-widest font-semibold">HOT leady</div>
          <div className="text-2xl font-bold mt-1 text-red-300">{hotCount}</div>
        </div>
        <div className="bg-panel border border-border rounded-lg p-4">
          <div className="text-muted text-xs uppercase tracking-widest font-semibold">Uzavretých</div>
          <div className="text-2xl font-bold mt-1 text-green-300">
            {allLeads.filter(l => l.status === 'uzavrety').length}
          </div>
        </div>
        <div className="bg-panel border border-border rounded-lg p-4">
          <div className="text-muted text-xs uppercase tracking-widest font-semibold">📘 Facebook</div>
          <div className="text-2xl font-bold mt-1 text-blue-400">{facebookCount}</div>
        </div>
        <div className="bg-panel border border-border rounded-lg p-4">
          <div className="text-muted text-xs uppercase tracking-widest font-semibold">📷 Instagram</div>
          <div className="text-2xl font-bold mt-1 text-pink-300">{instagramCount}</div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-4 border-b border-border">
        {(['vsetky', 'predaj', 'ocenenie', 'cally'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px capitalize flex items-center ${
              tab === t
                ? 'border-accent text-white'
                : 'border-transparent text-muted hover:text-white'
            }`}
          >
            {t === 'vsetky' ? 'Všetky' : t.charAt(0).toUpperCase() + t.slice(1)}
            {t !== 'vsetky' && tabLabel(t)}
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
              statusFilter === s
                ? 'bg-accent text-white'
                : 'bg-panel2 text-muted border border-border hover:border-accent'
            }`}
          >
            {s === 'vsetky' ? 'Všetky' : STATUS_LABELS[s as LeadStatus]}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-900 text-red-300 rounded p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-panel border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted text-sm">Načítavam...</div>
        ) : visible.length === 0 ? (
          <div className="p-10 text-center text-muted text-sm">Žiadne leady pre zvolený filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted text-xs uppercase tracking-widest border-b border-border">
                  <th className="px-4 py-3 font-semibold">Meno</th>
                  <th className="px-4 py-3 font-semibold">Kontakt</th>
                  <th className="px-4 py-3 font-semibold">Typ</th>
                  <th className="px-4 py-3 font-semibold">Info</th>
                  <th className="px-4 py-3 font-semibold">Zdroj</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Dátum</th>
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
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedLead && (
        <DetailPanel
          lead={selectedLead}
          notes={detailNotes}
          status={detailStatus}
          saving={saving}
          onNotesChange={setDetailNotes}
          onStatusChange={saveStatus}
          onNotesSave={saveNotes}
          onDelete={() => setConfirmDelete(selectedLead)}
          onClose={closeDetail}
          leadNotes={leadNotes}
          notesLoading={notesLoading}
          newNoteText={newNoteText}
          onNewNoteTextChange={setNewNoteText}
          onAddNote={addNote}
          savingNote={savingNote}
        />
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setConfirmDelete(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative bg-panel border border-border rounded-lg p-6 max-w-sm w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-lg font-bold mb-2">Zmazať lead?</div>
            <div className="text-muted text-sm mb-6">{confirmDelete.name}</div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-md border border-border hover:border-accent text-sm"
              >
                Zrušiť
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm font-semibold"
              >
                Zmazať
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function LeadRow({
  lead,
  onClick,
  isSelected,
  utmLabel,
}: {
  lead: AnyLead
  onClick: () => void
  isSelected: boolean
  utmLabel: string
}) {
  const typeLabel = lead._type === 'predaj' ? 'Predaj' : lead._type === 'ocenenie' ? 'Ocenenie' : 'Cally'
  const typeColor = lead._type === 'predaj' ? 'text-green-300' : lead._type === 'ocenenie' ? 'text-yellow-300' : 'text-purple-300'

  let info = '—'
  if (lead._type === 'predaj') {
    const l = lead as LeadPredaj & { _type: 'predaj' }
    info = [l.typ, l.lokalita].filter(Boolean).join(' · ') || '—'
  } else if (lead._type === 'ocenenie') {
    const l = lead as LeadOcenenie & { _type: 'ocenenie' }
    info = [l.typ_nehnutelnosti, l.lokalita].filter(Boolean).join(' · ') || '—'
  } else {
    const l = lead as LeadCally & { _type: 'cally' }
    info = [l.zaujem, l.nehnutelnost].filter(Boolean).join(' · ') || '—'
  }

  return (
    <tr
      onClick={onClick}
      className={`border-b border-border last:border-0 cursor-pointer transition ${
        isSelected ? 'bg-accent/10' : 'hover:bg-white/5'
      }`}
    >
      <td className="px-4 py-3 text-white font-semibold">{lead.name}</td>
      <td className="px-4 py-3 text-soft">
        <div>{lead.phone || '—'}</div>
        {lead.email && <div className="text-muted text-xs">{lead.email}</div>}
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold ${typeColor}`}>{typeLabel}</span>
        {lead._type === 'cally' && (
          <div className="mt-1">
            <ScoreBadge score={(lead as LeadCally & { _type: 'cally' }).score} />
          </div>
        )}
      </td>
      <td className="px-4 py-3 text-muted text-xs max-w-[180px] truncate">{info}</td>
      <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">{utmLabel}</td>
      <td className="px-4 py-3">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-4 py-3 text-muted text-xs">{fmtDate(lead.created_at)}</td>
    </tr>
  )
}

function DetailPanel({
  lead,
  notes,
  status,
  saving,
  onNotesChange,
  onStatusChange,
  onNotesSave,
  onDelete,
  onClose,
  leadNotes,
  notesLoading,
  newNoteText,
  onNewNoteTextChange,
  onAddNote,
  savingNote,
}: {
  lead: AnyLead
  notes: string
  status: LeadStatus
  saving: boolean
  onNotesChange: (v: string) => void
  onStatusChange: (s: LeadStatus) => void
  onNotesSave: () => void
  onDelete: () => void
  onClose: () => void
  leadNotes: LeadNote[]
  notesLoading: boolean
  newNoteText: string
  onNewNoteTextChange: (v: string) => void
  onAddNote: () => void
  savingNote: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-md bg-panel border-l border-border h-full p-6 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold">{lead.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted">
                {lead._type === 'predaj' ? 'Predaj' : lead._type === 'ocenenie' ? 'Ocenenie' : 'Cally'}
              </span>
              {lead._type === 'cally' && (
                <ScoreBadge score={(lead as LeadCally & { _type: 'cally' }).score} />
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-white">✕</button>
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-6">
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

        {/* Type-specific fields */}
        {lead._type === 'predaj' && <PredajFields lead={lead as LeadPredaj & { _type: 'predaj' }} />}
        {lead._type === 'ocenenie' && <OcenenieFields lead={lead as LeadOcenenie & { _type: 'ocenenie' }} />}
        {lead._type === 'cally' && <CallyFields lead={lead as LeadCally & { _type: 'cally' }} />}

        {/* Status */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STATUS_LABELS) as LeadStatus[]).map(s => (
              <button
                key={s}
                disabled={saving}
                onClick={() => onStatusChange(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition disabled:opacity-50 ${
                  status === s
                    ? STATUS_COLORS[s] + ' ring-1 ring-white/30'
                    : 'bg-panel2 text-muted border border-border hover:border-accent'
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Notes history */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
            História poznámok
          </label>
          {notesLoading ? (
            <div className="text-xs text-muted py-2">Načítavam...</div>
          ) : leadNotes.length === 0 ? (
            <div className="text-xs text-muted py-2 bg-panel2 border border-border rounded-md px-3">
              Zatiaľ žiadne poznámky.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
              {leadNotes.map(note => (
                <div key={note.id} className="bg-panel2 border border-border rounded-md px-3 py-2">
                  <div className="text-xs text-muted mb-1" title={fmtDateFull(note.created_at)}>
                    {formatRelativeTime(note.created_at)}
                  </div>
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
              className="w-full bg-panel2 border border-border rounded-md px-3 py-2 text-sm text-white placeholder:text-muted resize-none focus:outline-none focus:border-accent transition"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault()
                  onAddNote()
                }
              }}
            />
            <button
              onClick={onAddNote}
              disabled={savingNote || !newNoteText.trim()}
              className="mt-2 px-4 py-2 rounded-md bg-accent hover:bg-accentHover disabled:opacity-40 text-white text-xs font-semibold transition"
            >
              {savingNote ? 'Ukladám...' : 'Pridať poznámku'}
            </button>
            <div className="text-xs text-muted mt-1">Ctrl+Enter na odoslanie</div>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={onDelete}
          className="w-full py-2.5 rounded-md border border-red-900/50 text-red-400 hover:bg-red-950/30 text-sm font-semibold transition"
        >
          Zmazať lead
        </button>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-muted min-w-[80px] flex-shrink-0">{label}:</span>
      <span className="text-soft">{value}</span>
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
      <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">Detaily Cally</div>
      <Field label="Záujem" value={lead.zaujem} />
      <Field label="Nehnuteľnosť" value={lead.nehnutelnost} />
      <Field label="Horizont" value={lead.horizont} />
      <div className="flex gap-2 text-sm">
        <span className="text-muted min-w-[80px] flex-shrink-0">Zavolame:</span>
        <span className="text-soft">{lead.zavolame ? 'Áno' : 'Nie'}</span>
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

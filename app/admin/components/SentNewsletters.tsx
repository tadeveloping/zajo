'use client'

import { useState } from 'react'

interface IssueRow {
  id: string
  subject: string
  sent_at: string
  recipient_count: number
}

interface Recipient {
  email: string
  name: string | null
}

interface IssueFull extends IssueRow {
  html_content: string
  recipients: Recipient[] | null
}

export function SentNewsletters({ issues }: { issues: IssueRow[] }) {
  const [open, setOpen] = useState<IssueFull | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'obsah' | 'prijemcovia'>('obsah')

  async function openIssue(row: IssueRow) {
    setLoading(true)
    setError(null)
    setTab('obsah')
    setOpen({ ...row, html_content: '', recipients: null })
    try {
      const res = await fetch(`/api/issues/${row.id}`, { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Nepodarilo sa načítať')
      setOpen(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba')
    } finally {
      setLoading(false)
    }
  }

  if (issues.length === 0) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
        Zatiaľ žiadne odoslané newslettre.
      </div>
    )
  }

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: 480 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
              <th style={thStyle}>Predmet</th>
              <th style={thStyle}>Dátum</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Príjemcovia</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i, idx) => (
              <tr
                key={i.id}
                onClick={() => openIssue(i)}
                style={{
                  borderBottom: idx < issues.length - 1 ? '1px solid #f0f1f3' : 'none',
                  cursor: 'pointer',
                }}
                className="hover:bg-[#f9fafb]"
              >
                <td style={{ padding: '14px 20px', color: '#111827', fontWeight: 500 }}>
                  <span style={{ color: '#E8711A', marginRight: 8 }}>👁</span>
                  {i.subject}
                </td>
                <td style={{ padding: '14px 20px', color: '#9ca3af', fontFamily: 'monospace', fontSize: '13px' }}>
                  {new Date(i.sent_at).toLocaleString('sk-SK')}
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 10px',
                    background: 'rgba(232,113,26,0.1)', border: '1px solid rgba(232,113,26,0.25)',
                    borderRadius: '20px', color: '#E8711A', fontSize: '12px', fontWeight: 700,
                  }}>
                    {i.recipient_count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          onClick={() => setOpen(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', background: '#fff', borderRadius: 14, width: '100%', maxWidth: 720,
              maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{open.subject}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                  {new Date(open.sent_at).toLocaleString('sk-SK')} · {open.recipient_count} príjemcov
                </div>
              </div>
              <button onClick={() => setOpen(null)} style={{ border: 'none', background: 'none', fontSize: 20, color: '#6b7280', cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, padding: '0 20px', borderBottom: '1px solid #e5e7eb' }}>
              <TabBtn active={tab === 'obsah'} onClick={() => setTab('obsah')}>Obsah</TabBtn>
              <TabBtn active={tab === 'prijemcovia'} onClick={() => setTab('prijemcovia')}>
                Príjemcovia{open.recipients ? ` (${open.recipients.length})` : ''}
              </TabBtn>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflow: 'auto', background: '#f6f7f9' }}>
              {loading ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>Načítavam…</div>
              ) : error ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#b91c1c', fontSize: 14 }}>{error}</div>
              ) : tab === 'obsah' ? (
                <iframe
                  title="Náhľad newslettra"
                  srcDoc={open.html_content}
                  style={{ width: '100%', height: '60vh', border: 'none', background: '#fff', display: 'block' }}
                />
              ) : (
                <div style={{ padding: 16 }}>
                  {open.recipients && open.recipients.length > 0 ? (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {open.recipients.map((r, i) => (
                        <li key={`${r.email}-${i}`} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>
                          <span style={{ fontWeight: 600, color: '#111827' }}>{r.name || '—'}</span>
                          <span style={{ color: '#6b7280', marginLeft: 8 }}>{r.email}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: 14, fontSize: 13, color: '#9a3412' }}>
                      Zoznam príjemcov sa pri tomto newsletteri neukladal (starší newsletter). Bol odoslaný všetkým vtedy prihláseným odberateľom — spolu {open.recipient_count}.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const thStyle: React.CSSProperties = {
  padding: '12px 20px', textAlign: 'left', fontSize: '10px', fontWeight: 700,
  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9ca3af',
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer',
        fontSize: 13, fontWeight: 700, color: active ? '#111827' : '#9ca3af',
        borderBottom: active ? '2px solid #E8711A' : '2px solid transparent', marginBottom: -1,
      }}
    >
      {children}
    </button>
  )
}

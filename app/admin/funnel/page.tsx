'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Range = '7d' | '30d' | 'all'

interface FunnelData {
  funnels: Record<string, Record<string, number>>
  sources: Record<string, number>
  range: Range
}

const STAGES: Record<string, { key: string; label: string }[]> = {
  kontakt: [
    { key: 'view', label: 'Otvorili stránku' },
    { key: 'step_2', label: 'Krok 2' },
    { key: 'step_3', label: 'Krok 3' },
    { key: 'step_4', label: 'Kontaktné údaje' },
    { key: 'submitted', label: 'Odoslali formulár' },
  ],
  predaj: [
    { key: 'view', label: 'Otvorili stránku' },
    { key: 'started_typing', label: 'Začali vyplňovať' },
    { key: 'submitted', label: 'Odoslali formulár' },
  ],
  ocenenie: [
    { key: 'view', label: 'Otvorili stránku' },
    { key: 'step_2', label: 'Krok 2' },
    { key: 'step_3', label: 'Kontaktné údaje' },
    { key: 'submitted', label: 'Odoslali formulár' },
  ],
}

const FORM_LABELS: Record<string, string> = {
  kontakt: 'Kontaktný formulár',
  predaj: 'Predaj',
  ocenenie: 'Ocenenie',
}

const RANGE_LABELS: Record<Range, string> = { '7d': '7 dní', '30d': '30 dní', all: 'Celá história' }

function getUtmLabel(source: string): string {
  if (source === 'facebook') return '📘 Facebook'
  if (source === 'instagram') return '📷 Instagram'
  return source
}

export default function FunnelPage() {
  const [range, setRange] = useState<Range>('30d')
  const [data, setData] = useState<FunnelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (r: Range) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/funnel?range=${r}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setData(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba pri načítaní')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(range) }, [range, load])

  const totalViews = data
    ? Object.values(data.sources).reduce((sum, n) => sum + n, 0)
    : 0

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="text-muted hover:text-gray-900 text-sm">
          ← Späť na dashboard
        </Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">NÁVŠTEVNOSŤ</div>
      </div>

      <header className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Návštevnosť formulárov</h1>
          <p className="text-muted text-sm mt-1">Koľko ľudí prišlo na stránku, koľko sa dostalo ďalej a koľko odoslalo formulár.</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', 'all'] as Range[]).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                range === r ? 'bg-accent text-white' : 'bg-panel2 text-muted border border-border hover:border-accent'
              }`}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mb-4 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="p-10 text-center text-muted text-sm">Načítavam...</div>
      ) : data ? (
        <>
          <div className="grid gap-4 mb-6">
            {Object.keys(STAGES).map(form => {
              const stages = STAGES[form]
              const counts = data.funnels[form] || {}
              const base = counts[stages[0].key] || 0
              return (
                <div key={form} className="bg-panel border border-border rounded-xl p-5 shadow-sm">
                  <div className="text-sm font-bold text-gray-900 mb-4">{FORM_LABELS[form]}</div>
                  <div className="space-y-2">
                    {stages.map(s => {
                      const n = counts[s.key] || 0
                      const pct = base > 0 ? Math.round((n / base) * 100) : 0
                      return (
                        <div key={s.key} className="flex items-center gap-3">
                          <div className="w-40 text-xs text-muted flex-shrink-0">{s.label}</div>
                          <div className="flex-1 bg-panel2 rounded-full h-6 overflow-hidden relative">
                            <div
                              className="h-full bg-accent/70 rounded-full transition-all"
                              style={{ width: `${Math.max(pct, n > 0 ? 4 : 0)}%` }}
                            />
                          </div>
                          <div className="w-24 text-right text-xs font-semibold text-gray-900 flex-shrink-0">
                            {n} {base > 0 && <span className="text-muted font-normal">({pct}%)</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-panel border border-border rounded-xl p-5 shadow-sm">
            <div className="text-sm font-bold text-gray-900 mb-4">Odkiaľ prišli návštevníci</div>
            {Object.keys(data.sources).length === 0 ? (
              <div className="text-muted text-sm">Zatiaľ žiadne dáta pre zvolené obdobie.</div>
            ) : (
              <div className="space-y-2">
                {Object.entries(data.sources)
                  .sort((a, b) => b[1] - a[1])
                  .map(([source, n]) => {
                    const pct = totalViews > 0 ? Math.round((n / totalViews) * 100) : 0
                    return (
                      <div key={source} className="flex items-center gap-3">
                        <div className="w-40 text-xs text-muted flex-shrink-0">{getUtmLabel(source)}</div>
                        <div className="flex-1 bg-panel2 rounded-full h-6 overflow-hidden">
                          <div className="h-full bg-blue-400/70 rounded-full" style={{ width: `${Math.max(pct, 4)}%` }} />
                        </div>
                        <div className="w-24 text-right text-xs font-semibold text-gray-900 flex-shrink-0">
                          {n} <span className="text-muted font-normal">({pct}%)</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </>
      ) : null}
    </main>
  )
}

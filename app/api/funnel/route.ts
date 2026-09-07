import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAdminOnlyUser, unauthorized } from '@/lib/adminAuth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RANGE_DAYS: Record<string, number | null> = { '7d': 7, '30d': 30, all: null }

interface EventRow {
  form: 'newsletter' | 'predaj' | 'ocenenie'
  event: string
  utm_source: string | null
}

export async function GET(req: Request) {
  if (!(await getAdminOnlyUser())) return unauthorized()

  const range = new URL(req.url).searchParams.get('range') || '30d'
  const days = RANGE_DAYS[range] ?? 30
  const since = days ? new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString() : null

  // Supabase caps a single select at 1000 rows, so page through the full set —
  // otherwise the funnel silently under-counts once traffic grows past that.
  // Order by created_at + id (id is unique) so pages don't skip or repeat rows.
  const PAGE = 1000
  const rows: EventRow[] = []
  for (let from = 0; ; from += PAGE) {
    let query = supabaseAdmin
      .from('form_events')
      .select('form,event,utm_source')
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
      .range(from, from + PAGE - 1)
    if (since) query = query.gte('created_at', since)
    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const batch = (data ?? []) as EventRow[]
    rows.push(...batch)
    if (batch.length < PAGE) break
  }

  const funnels: Record<string, Record<string, number>> = { predaj: {}, ocenenie: {}, newsletter: {} }
  for (const r of rows) {
    if (!funnels[r.form]) continue
    funnels[r.form][r.event] = (funnels[r.form][r.event] ?? 0) + 1
  }

  // Each session writes exactly one "view" row per form (dedup'd at insert time),
  // so counting those gives unique visiting sessions per traffic source.
  // Seed both paid channels at 0 so they always show, even before any traffic.
  const sources: Record<string, number> = { facebook: 0, instagram: 0 }
  for (const r of rows) {
    if (r.event !== 'view') continue
    const key = r.utm_source || 'Priamy / organický'
    sources[key] = (sources[key] ?? 0) + 1
  }

  return NextResponse.json({ funnels, sources, range })
}

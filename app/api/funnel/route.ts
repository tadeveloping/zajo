import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAdminUser, unauthorized } from '@/lib/adminAuth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RANGE_DAYS: Record<string, number | null> = { '7d': 7, '30d': 30, all: null }

interface EventRow {
  form: 'kontakt' | 'predaj' | 'ocenenie'
  event: string
  utm_source: string | null
}

export async function GET(req: Request) {
  if (!(await getAdminUser())) return unauthorized()

  const range = new URL(req.url).searchParams.get('range') || '30d'
  const days = RANGE_DAYS[range] ?? 30

  let query = supabaseAdmin.from('form_events').select('form,event,utm_source')
  if (days) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
    query = query.gte('created_at', since)
  }
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const rows = (data ?? []) as EventRow[]

  const funnels: Record<string, Record<string, number>> = { kontakt: {}, predaj: {}, ocenenie: {} }
  for (const r of rows) {
    funnels[r.form][r.event] = (funnels[r.form][r.event] ?? 0) + 1
  }

  // Each session writes exactly one "view" row per form (dedup'd at insert time),
  // so counting those gives unique visiting sessions per traffic source.
  const sources: Record<string, number> = {}
  for (const r of rows) {
    if (r.event !== 'view') continue
    const key = r.utm_source || 'Priamy / organický'
    sources[key] = (sources[key] ?? 0) + 1
  }

  return NextResponse.json({ funnels, sources, range })
}

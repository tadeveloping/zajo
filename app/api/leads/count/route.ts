import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function GET() {
  const [predaj, ocenenie, cally] = await Promise.all([
    supabaseAdmin.from('leads_predaj').select('id', { count: 'exact', head: true }).eq('status', 'novy'),
    supabaseAdmin.from('leads_ocenenie').select('id', { count: 'exact', head: true }).eq('status', 'novy'),
    supabaseAdmin.from('leads_cally').select('id', { count: 'exact', head: true }).eq('status', 'novy'),
  ])
  return NextResponse.json({
    predaj: predaj.count ?? 0,
    ocenenie: ocenenie.count ?? 0,
    cally: cally.count ?? 0,
    total: (predaj.count ?? 0) + (ocenenie.count ?? 0) + (cally.count ?? 0),
  })
}

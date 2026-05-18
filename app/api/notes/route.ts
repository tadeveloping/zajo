import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

export const runtime = 'nodejs'

const createNoteSchema = z.object({
  lead_id: z.string().uuid(),
  lead_type: z.enum(['predaj', 'ocenenie', 'cally']),
  content: z.string().min(1).max(5000),
  author_email: z.string().email().optional(),
})

// GET /api/notes?lead_id=xxx&lead_type=xxx
export async function GET(req: Request) {
  const url = new URL(req.url)
  const lead_id = url.searchParams.get('lead_id')
  const lead_type = url.searchParams.get('lead_type')

  if (!lead_id || !lead_type) {
    return NextResponse.json({ error: 'lead_id and lead_type required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('lead_notes')
    .select('*')
    .eq('lead_id', lead_id)
    .eq('lead_type', lead_type)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/notes
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = createNoteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('lead_notes')
    .insert(parsed.data)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

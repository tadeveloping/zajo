import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { trackEventSchema } from '@/lib/validators'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Public, unauthenticated on purpose — called from the landing pages themselves,
// before anyone has identified themselves. Cheap to spam, so every write is a
// silent no-op on failure; nothing here should ever affect the visitor's experience.
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({}, { status: 400 })
  }
  const parsed = trackEventSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({}, { status: 400 })

  await supabaseAdmin
    .from('form_events')
    .upsert(parsed.data, { onConflict: 'form,event,session_id', ignoreDuplicates: true })

  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getSessionUser, unauthorized } from '@/lib/adminAuth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Who am I + what can I see. The CRM uses this to decide whether to show admin-only
// controls (assign dropdown, delete, the full makléri list) or the maklér view.
export async function GET() {
  const session = await getSessionUser()
  if (!session) return unauthorized()

  let makleri: Array<{ id: string; name: string; slug: string; active: boolean }> = []
  if (session.role === 'admin') {
    const { data } = await supabaseAdmin
      .from('makleri')
      .select('id,name,slug,active')
      .order('name', { ascending: true })
    makleri = data ?? []
  }

  return NextResponse.json({
    email: session.email,
    role: session.role,
    maklerId: session.maklerId,
    name: session.name,
    makleri,
  })
}

import { supabaseAdmin } from './supabase'
import type { SessionUser } from '@/types'

// Attach the human-readable owner name to lead rows, resolved from `assigned_to`.
// Unassigned leads (shared pool) get assignee_name = null.
export async function withAssignee<T extends { assigned_to?: string | null }>(
  leads: T[]
): Promise<(T & { assignee_name: string | null })[]> {
  const ids = [...new Set(leads.map(l => l.assigned_to).filter((v): v is string => !!v))]
  if (ids.length === 0) return leads.map(l => ({ ...l, assignee_name: null }))

  const { data } = await supabaseAdmin.from('makleri').select('id,name').in('id', ids)
  const nameById = new Map((data ?? []).map((m: { id: string; name: string }) => [m.id, m.name]))
  return leads.map(l => ({ ...l, assignee_name: l.assigned_to ? nameById.get(l.assigned_to) ?? null : null }))
}

// Resolve a maklér's personal-link slug to their id, so a lead coming through
// /kontakt?m=<slug> is auto-assigned to that person. Only active makléri count.
export async function maklerIdBySlug(slug: string | null | undefined): Promise<string | null> {
  if (!slug) return null
  const { data } = await supabaseAdmin
    .from('makleri')
    .select('id')
    .eq('slug', slug.trim().toLowerCase())
    .eq('active', true)
    .maybeSingle()
  return data?.id ?? null
}

export async function maklerEmailById(id: string | null | undefined): Promise<string | null> {
  if (!id) return null
  const { data } = await supabaseAdmin.from('makleri').select('email').eq('id', id).maybeSingle()
  return data?.email ?? null
}

// A maklér only ever sees leads that are theirs or in the shared (unassigned)
// pool. This returns the ids to filter by, or null meaning "no restriction"
// (admins see everything). Applied server-side — never trust the client for this.
export function assignmentFilter(session: SessionUser): { restrict: boolean; maklerId: string | null } {
  if (session.role === 'admin') return { restrict: false, maklerId: null }
  return { restrict: true, maklerId: session.maklerId }
}

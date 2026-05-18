-- 002_lead_notes.sql
-- Run in Supabase SQL editor

create table if not exists lead_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  lead_id uuid not null,
  lead_type text not null, -- 'predaj' | 'ocenenie' | 'cally'
  content text not null,
  author_email text
);

create index if not exists lead_notes_lead_id_idx on lead_notes(lead_id, lead_type);

alter table lead_notes enable row level security;

-- Service role bypasses RLS, so no policies needed for admin API routes.

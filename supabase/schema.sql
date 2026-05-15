-- Run in Supabase SQL editor

create extension if not exists "pgcrypto";

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  source text,
  subscribed boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists contacts_subscribed_idx on contacts(subscribed);
create index if not exists contacts_created_at_idx on contacts(created_at desc);

create table if not exists issues (
  id uuid primary key default gen_random_uuid(),
  subject text,
  html_content text,
  sent_at timestamptz not null default now(),
  recipient_count integer
);

create index if not exists issues_sent_at_idx on issues(sent_at desc);

-- All access goes through the service role key in API routes;
-- no RLS policies needed because anon key is never used to read these tables.
alter table contacts enable row level security;
alter table issues enable row level security;

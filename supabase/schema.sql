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

-- CRM Lead tables
create table leads_predaj (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text not null,
  email text,
  phone text,
  typ text, -- 'Predaj' or 'Prenájom'
  lokalita text,
  casovy_ramec text,
  sprava text,
  status text default 'novy' not null, -- novy/kontaktovany/stretnutie/v_procese/uzavrety
  notes text,
  source text default 'landing_page'
);

create table leads_ocenenie (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text not null,
  email text,
  phone text,
  typ_nehnutelnosti text,
  lokalita text,
  rozloha text,
  stav_nehnutelnosti text,
  doplnujuce_info text,
  status text default 'novy' not null,
  notes text,
  source text default 'landing_page'
);

create table leads_cally (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  name text not null,
  email text,
  phone text,
  zaujem text, -- 'Predaj' / 'Kúpa' / 'Prenájom'
  nehnutelnost text,
  horizont text,
  sprava text,
  zavolame boolean default false,
  score text default 'COLD', -- HOT / WARM / COLD
  status text default 'novy' not null,
  notes text,
  source text default 'cally'
);

-- Indexes
create index leads_predaj_status_idx on leads_predaj(status);
create index leads_predaj_created_at_idx on leads_predaj(created_at desc);
create index leads_ocenenie_status_idx on leads_ocenenie(status);
create index leads_ocenenie_created_at_idx on leads_ocenenie(created_at desc);
create index leads_cally_status_idx on leads_cally(status);
create index leads_cally_created_at_idx on leads_cally(created_at desc);
create index leads_cally_score_idx on leads_cally(score);

-- RLS
alter table leads_predaj enable row level security;
alter table leads_ocenenie enable row level security;
alter table leads_cally enable row level security;

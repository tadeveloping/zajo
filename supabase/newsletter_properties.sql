-- Run this in Supabase SQL editor to create the newsletter_properties table
create table if not exists newsletter_properties (
  position integer primary key check (position between 1 and 4),
  url text not null,
  title text,
  price text,
  location text,
  area text,
  image_url text,
  updated_at timestamptz default now()
);

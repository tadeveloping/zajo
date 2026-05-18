-- 001_auth_setup.sql
-- Run in Supabase SQL editor
-- Auth schema is enabled by default in Supabase projects.
-- No additional SQL is needed to enable magic link auth.
-- Just make sure "Email" provider is enabled in:
--   Authentication > Providers > Email  (toggle on, disable "Confirm email" if you want instant login)
--
-- Optional: restrict signups to known emails via a database trigger (advanced).
-- For now, email whitelist is enforced on the client/middleware side.

-- No-op SQL to satisfy migration file requirement:
select 1;

# ZAJO Newsletter — Admin

Interný nástroj na generovanie a rozosielanie AI newslettera pre ZAJO Reality.

## Setup

1. **Inštalácia**
   ```bash
   npm install
   ```

2. **Supabase**
   - Vytvor projekt na [supabase.com](https://supabase.com)
   - V SQL editore spusti obsah `supabase/schema.sql`
   - Skopíruj URL, anon key, service role key

3. **Env**
   ```bash
   cp .env.example .env.local
   ```
   Vyplň:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY` (z [resend.com](https://resend.com))
   - `RESEND_FROM_EMAIL=newsletter@zajoreality.sk` (musí byť verifikovaná doména)
   - `ANTHROPIC_API_KEY`

4. **Lokálny vývoj**
   ```bash
   npm run dev
   ```
   Otvor http://localhost:3000 — presmeruje na `/admin`.

5. **Deploy na Vercel**
   - Push do GitHubu
   - Naimportuj projekt vo Vercel
   - Pridaj všetky env premenné
   - Deploy

## Workflow

1. `/admin` — dashboard so štatistikami
2. `/admin/generovat` — 3-krokový flow:
   - načítať inzeráty zo zajoreality.sk
   - Claude vygeneruje obsah → upraviť → náhľad
   - odoslať cez Resend všetkým prihláseným kontaktom
3. `/admin/kontakty` — CRUD nad kontaktmi, CSV export
4. `/odhlasit?email=...` — unsubscribe (linkovaný z päty emailu)

## Public endpoint

`POST /api/subscribe` — pre landing page / Instagram lead form:
```json
{ "name": "Peter Novák", "email": "peter@example.sk", "phone": "0900...", "source": "landing_page" }
```

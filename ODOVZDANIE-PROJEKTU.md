# Zajo Reality — odovzdanie projektu

Tento dokument vysvetľuje, čo bolo pre Zajo Reality vytvorené, ako to funguje, aké má adresy a čo bude treba platiť. Písané tak, aby to bolo zrozumiteľné aj bez technického vzdelania.

---

## 1. Čo bolo vytvorené a prečo

Cieľom bolo vytvoriť webový systém, ktorý dokáže:
- zbierať dopyty od záujemcov o kúpu, predaj alebo ocenenie nehnuteľnosti,
- automaticky ich triediť a upozorňovať na nové dopyty,
- posielať newsletter s ponukami nehnuteľností,
- a to všetko cez jednoduché webové formuláre, ktoré sa dajú použiť v reklamách na Facebooku a Instagrame.

### Formuláre pre kampane
Boli vytvorené štyri samostatné webové stránky, každá s vlastným krátkym formulárom, určené presne na to, aby sa na ne dalo posielať návštevníkov z platených reklám:

| Stránka | Účel |
|---|---|
| `/predaj` | Pre ľudí, ktorí chcú predať nehnuteľnosť |
| `/ocenenie` | Bezplatné ocenenie nehnuteľnosti (krok-za-krokom formulár) |
| `/kontakt` | Všeobecný kontaktný formulár (kúpa, predaj, ocenenie, obhliadka, iné) |
| `/newsletter` | Prihlásenie na odber ponúk e-mailom |

Každý formulár po odoslaní:
- uloží dopyt do databázy,
- pošle e-mail upozornenie majiteľovi (nový lead),
- pošle potvrdzujúci e-mail záujemcovi,
- ak si to niekto vyžiadal, prihlási ho aj do newslettera.

Formuláre si tiež zaznamenávajú, **odkiaľ prišiel návštevník** (napr. z Facebook alebo Instagram reklamy), takže sa dá neskôr vyhodnotiť, ktorá reklama priniesla najviac záujemcov. Formuláre sú tiež chránené proti spamu (max. 5 odoslaní za minútu z jednej adresy).

### Obrázky pre kampane
Finálne obrázky pripravené pre IG/FB reklamy sú uložené v priečinku projektu:
`marketing/ig-fb-2026-07/`
- `feed-1080x1350/` — 3 obrázky pre bežný príspevok (feed)
- `story-1080x1920/` — 3 obrázky pre Instagram/Facebook Stories

### CRM systém (správa dopytov)
Pod adresou `/admin` (po prihlásení) je jednoduchý interný systém, kde majiteľ/pracovník vidí:
- **CRM** (`/admin/crm`) — zoznam všetkých dopytov zo všetkých formulárov na jednom mieste, s možnosťou označiť stav (nový, kontaktovaný, v procese, uzavretý), pridávať poznámky, filtrovať podľa zdroja (Facebook/Instagram/iné) a podľa "teploty" leadu (HOT/WARM/COLD — podľa toho, ako rýchlo chce záujemca konať).
- **Kontakty** (`/admin/kontakty`) — zoznam všetkých e-mailových adries prihlásených na newsletter.
- **Ponuky do newslettera** (`/admin/newsletter-ponuky`) — sem sa vkladajú odkazy na aktuálne nehnuteľnosti z webu zajoreality.sk, ktoré sa majú objaviť v ďalšom newsletteri.
- **Generovanie newslettera** (`/admin/generovat`) — nástroj, ktorý automaticky stiahne aktuálne ponuky z webu a pomocou umelej inteligencie (AI) navrhne text newslettera, ktorý sa potom jedným klikom pošle všetkým prihláseným.

### Prečo takto
Cieľom bolo, aby jeden systém pokryl celý kolobeh: reklama → formulár → automatické upozornenie → CRM na spracovanie → newsletter na udržanie kontaktu so záujemcami, ktorí ešte nekúpili/nepredali hneď.

---

## 2. Ako to funguje "pod kapotou" (v skratke)

Systém stojí na štyroch externých službách:

| Služba | Na čo slúži |
|---|---|
| **Vercel** | Tu web reálne "beží" — hosting |
| **Supabase** | Databáza — tu sa ukladajú všetky dopyty, kontakty, poznámky |
| **Resend** | Odosielanie e-mailov (upozornenia, potvrdenia, newsletter) |
| **Anthropic (Claude AI)** | Pomáha vygenerovať text newslettera |

Všetky štyri momentálne bežia na účtoch vývojára.

---

## 3. Bezpečnosť

Pred odovzdaním bola urobená dôkladná kontrola celého systému. Všetky nájdené chyby boli odstránené a systém beží tak, ako má.

---

## 4. Adresy systému

| Časť systému | Adresa |
|---|---|
| Formulár — predaj nehnuteľnosti | `https://zajo-five.vercel.app/predaj` |
| Formulár — ocenenie nehnuteľnosti | `https://zajo-five.vercel.app/ocenenie` |
| Formulár — všeobecný kontakt | `https://zajo-five.vercel.app/kontakt` |
| Formulár — prihlásenie na newsletter | `https://zajo-five.vercel.app/newsletter` |
| Odhlásenie z newslettera | `https://zajo-five.vercel.app/odhlasit` |
| **Prihlásenie do administrácie** | `https://zajo-five.vercel.app/login` |
| **Admin — hlavný prehľad (dashboard)** | `https://zajo-five.vercel.app/admin` |
| Admin — CRM (dopyty) | `https://zajo-five.vercel.app/admin/crm` |
| Admin — kontakty/newsletter odberatelia | `https://zajo-five.vercel.app/admin/kontakty` |
| Admin — ponuky do newslettera | `https://zajo-five.vercel.app/admin/newsletter-ponuky` |
| Admin — generovanie a odoslanie newslettera | `https://zajo-five.vercel.app/admin/generovat` |

Administratívna sekcia (`/admin/...` a `/login`) je uzamknutá heslom — nie je verejne prístupná.

---

## 5. Za čo sa bude platiť a za čo nie

| Služba | Presná cena plateného plánu | Kedy je to POVINNÉ platiť | Kedy je to len ODPORÚČANÉ |
|---|---|---|---|
| **Vercel** (hosting) | **20 $/mesiac** za člena | Podľa vlastných podmienok Vercelu je toto už teraz "komerčné použitie" (platený vývojár + reklama na službu), takže formálne platiť treba **od začiatku**, bez ohľadu na návštevnosť | — |
| **Supabase** (databáza) | **25 $/mesiac** (+ prípadne viac podľa reálnej spotreby) | Nie je to nikde vyžadované pravidlami — bezplatná verzia funguje | **Silne odporúčané** — bezplatná verzia nemá žiadne zálohy dát a už sa raz sama pozastavila pri neaktivite. Bez tohto hrozí trvalá strata zoznamu zákazníkov |
| **Resend** (e-maily) | **20 $/mesiac** (až 50 000 e-mailov; medzi zadarmo a týmto nie je žiadny lacnejší medzistupeň) | Až keď sa prekročí bezplatný limit: **3 000 e-mailov/mesiac alebo 100 e-mailov/deň** | — |
| **Anthropic (AI)** | Platí sa len za skutočné použitie (žiadny paušál) | Nikdy ako mesačné predplatné — stačí mať na účte predplatený kredit (rádovo pár € pri bežnom používaní) | — |

**Ak by sa platilo za všetko, kde je to potrebné/odporúčané (Vercel + Supabase):** cca **45 $/mesiac** (~42 €). Resend a Anthropic zostávajú v praxi zadarmo, kým nenarastie objem.

---

## 6. Čo treba ešte spraviť — nie je súrne

- **Vlastná doména na formulároch** (namiesto `zajo-five.vercel.app`) — odporúčané pre reklamy, ale nie nutné na spustenie.

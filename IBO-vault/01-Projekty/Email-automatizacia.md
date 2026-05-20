# Projekt: Email automatizácia IBO.sk

## Status
- [ ] Fáza 1 implementovaná
- [ ] Fáza 2 implementovaná  
- [ ] Fáza 3 implementovaná

**Platforma:** Ecomail.cz + Buxus CMS
**Zodpovední:** Tadeáš (tech + obsah) + Anet (Ecomail nastavenia)
**Prvé stretnutie s Anet:** 2026-05-27

---

## Ciele (12 mesiacov)
- Miera obnovy opusteného košíka ≥12 %
- Konverzia uvítacej série ≥8 %
- E-mailom priradené tržby ≥18 % z celkových online tržieb
- Rast zoznamu +40 % cez lead magnety
- Miera odhlásenia <5 %/mesiac

---

## 3 fázy implementácie

### FÁZA 1 — Týždeň 1–4 (Okamžité tržby)
| # | Automatizácia | Trigger | Priorita |
|---|---|---|---|
| 1 | Uvítacia séria (3 emaily) | Nový odberateľ / prvý nákup | ★★★★★ |
| 2 | Opustený košík — Vysoká hodnota (≥€150) | cart_abandoned + last_cart_value ≥150 | ★★★★★ |
| 3 | Opustený košík — Nízka hodnota (<€150) | cart_abandoned + last_cart_value <150 | ★★★★☆ |
| 4 | Po-nákupná starostlivosť o stroj | purchase_confirmed + category_id = CHAINSAW/MOWER/TRACTOR | ★★★★★ |
| 5 | Po-nákupný krízový predaj spotreby | purchase_confirmed + category_id = HANDTOOLS/CONSUMABLES | ★★★★☆ |

### FÁZA 2 — Týždeň 5–8 (Životný cyklus)
| # | Automatizácia | Trigger | Priorita |
|---|---|---|---|
| 6 | Opustené prehliadanie — Stroje | viewed_category x3 / viewed_product (drahá cena) + bez nákupu 48h | ★★★★☆ |
| 7 | Znovu-získanie / Re-engagement | last_order_date >90 dní (B2C) / >60 dní (B2B) | ★★★☆☆ |
| 8 | Pripomienka záruky a servisu | machine_warranty_expiry −30 dní | ★★★★☆ |
| 9 | Žiadosť o recenziu | purchase_confirmed + 10 dní + kategória ≠ CONSUMABLES | ★★★☆☆ |

### FÁZA 3 — Týždeň 9–12+ (Sezóna + B2B)
| # | Automatizácia | Trigger | Priorita |
|---|---|---|---|
| 10 | Jarný pivot (jar. záhradníčenie) | Dátum 1. marca / segment ZIMA alebo nový odberateľ | ★★★★☆ |
| 11 | Jesenný pivot "Drevo na zimu" | Dátum 1. septembra / kúpil reťazovú pílu | ★★★★☆ |
| 12 | Personalizácia menín | contact_nameday_date (slovenský kalendár) | ★★★☆☆ |
| 13 | Pestovanie B2B lesníctva | company_name vyplnené + b2b_tag + purchase_count ≥2 | ★★★★☆ |
| 14 | Nadviazanie na lead magnet | lead_magnet_downloaded | ★★★☆☆ |

---

## Uvítacia séria — detail

### Trasa A: Drahé stroje (CHAINSAW, MOWER, TRACTOR, GENERATOR)
| Email | Čas | Predmet | Obsah | CTA |
|---|---|---|---|---|
| E1 | Okamžite | Vitajte v rodine IBO — tu je, čo vás čaká | Srdečné uvítanie. Príbeh značky. Odkaz na hlavné kategórie. | Preskúmajte katalóg |
| E2 | Deň 2 | Ako vybrať správnu reťazovú pílu pre vás [VIDEO] | 3-min expertné video. Bez tvrdého predaja. | Pozrite si video |
| E3 | Deň 5 | Prečo IBO zákazníci siahajú po Stihl a Husqvarna | Porovnávací obsah. IBO ako neutrálny expert. | Prečítajte si sprievodcu |
| E4 | Deň 8 | Naša garancia: ak to nie je správne, opravíme to | Hĺbkové predstavenie záruky, servisnej siete. | Pozrite si našu záruku |
| E5 | Deň 12 | Len pre vás: odborný poradenský hovor zadarmo | Mäkká ponuka: 15-min konzultácia. Bez zľavy. | Rezervujte konzultáciu |

### Trasa B: Spotreba a ručné náradie (HANDTOOLS, GARDEN_ACCESSORIES, CONSUMABLES)
| Email | Čas | Predmet | Obsah | CTA |
|---|---|---|---|---|
| E1 | Okamžite | Vitajte — a tu je 5% zľava na prvý nákup | Uvítanie + okamžitá hodnota. Expirácia 7 dní. | Použiť moju zľavu |
| E2 | Deň 2 | Sto zákazníkov, sto názorov: čo kupujú najčastejšie? | Top 10 bestselerov podľa recenzií. Sociálny dôkaz. | Zobraziť bestsellery |
| E3 | Deň 5 | Očakávajte do 48h — ako funguje doručenie cez Packeta | Logistický email dôvery CEE. Vysvetlenie Packeta/Zasielkovňa. | Nájdite vaše odberné miesto |
| E4 | Deň 9 | IBO tip: toto by ste mali mať v každom garáži | Obsah 'Štartovacia sada': odporúčané balíčky. | Zostavte svoju sadu |

---

## Opustený košík — detail

### Vysoká hodnota (≥€150) — Príručka na obnovu strojov
**Hlavný insajt:** Zákazník ktorý opustí stroj za 450€ nie je citlivý na cenu — chýba mu dôvera. BEZ ZĽAVY.

| Email | Čas | Predmet | CTA |
|---|---|---|---|
| E1 | 45 min po opustení | Zabudli ste nieco? Váš [Názov produktu] vás čaká | Vráť sa do košíka |
| E2 | Deň 1 (22h) | Odpovede na 3 otázky, ktoré zákazníci kladú pred kúpou [Produkt] | Prečítajte si kupný sprievodca |
| E3 | Deň 3 | Posledná šanca: [Produkt] — a toto dostanete navyše | Získajte svoju bezplatnú dar (upgrade doručenia / sada na údržbu) |

### Nízka hodnota (<€150) — Obnova spotrebného materiálu
| Email | Čas | Predmet | CTA |
|---|---|---|---|
| E1 | 30 min po opustení | Nechali ste niečo v košíku — [Produkt] | Dokončite nákup |
| E2 | Deň 1 | 274 zákazníkov kúpilo toto tento mesiac — tu je prečo | Pozrite si, čo povedali |
| E3 | Deň 2 | Pre vás: doprava zadarmo na túto objednávku | Získajte dopravu zadarmo |

---

## Po-nákupná starostlivosť o stroj — detail (CHAINSAW príklad)
| Email | Čas | Predmet | CTA |
|---|---|---|---|
| E1 | 1 deň po nákupe | Vaša píla je na ceste — tu je prvý krok po dodaní | Stiahnite si PDF checklist |
| E2 | Deň 3 po doručení | [VIDEO] Ako správne napnúť reťaz píly — 90 sekúnd | Pozrite si 90-sekundové video |
| E3 | Deň 14 | Čas na prvé čistenie — postup krok za krokom | Prečítajte si sprievodcu |
| E4 | Deň 30 | Refill kit pre [Model produktu]: olej, reťaze a viac | Nakúpte spotrebný materiál na údržbu |
| E5 | Deň 180 | Ročný servis pre vašu pílu — čo skontrolovať | Rezervujte si servisnú prehliadku |

---

## Custom Events — Buxus → Ecomail API

| Custom Event / Pole | Typ | Odoslané kedy | Použitie |
|---|---|---|---|
| cart_abandoned | Udalosť | Košík neaktívny >45 min | Toky opusteného košíka |
| last_cart_value | Číslo (€) | Spolu s cart_abandoned | Rozdelenie košíka vysoká/nízka |
| purchase_confirmed | Udalosť | Stav objednávky = zaplatená | Po-nákupné, recenzia, krízový predaj |
| category_id | Reťazec | Spolu s purchase_confirmed | Smerovanie Starostlivosť o stroj vs. Spotreba |
| last_purchase_value | Číslo (€) | Po každom purchase_confirmed | Segmentácia podľa LTV |
| viewed_product | Udalosť | Zobrazenie PDP stránky | Automatizácia opusteného prehliadania |
| viewed_category | Udalosť | Prehliadanie kategórie | Opustené prehliadanie, tagovanie |
| machine_warranty_expiry | Dátum (ISO) | Nastavené pri nákupe SKU strojov | Pripomienka záruky |
| product_sku | Reťazec | Spolu s purchase_confirmed | Identifikácia konkrétneho modelu |
| last_order_date | Dátum | Po každom nákupe | Re-engagement tok |
| contact_nameday_date | Dátum (MM-DD) | Pri registrácii / aktualizácii profilu | Personalizačný email na meniny |
| b2b_tag | Boolean | Keď je vyplnené company_name | B2B lesníctvo segment |
| purchase_count | Celé číslo | Inkrementované po každom nákupe | Logika opakovaného vs. prvého kupujúceho |
| lead_magnet_downloaded | Udalosť + Reťazec | Po stiahnutí PDF / formulári na LP | Drip séria lead magnetu |
| last_purchase_season | Reťazec (JAR/LETO/JESEN/ZIMA) | Odvodené z mesiaca last_order_date | Sezónne pivotové kampane |

**Poradie implementácie API:**
- Týždeň 1: cart_abandoned, last_cart_value, purchase_confirmed, category_id, last_order_date
- Týždeň 2: viewed_product, viewed_category, purchase_count
- Týždeň 3: machine_warranty_expiry, lead_magnet_downloaded, b2b_tag
- Týždeň 4: contact_nameday_date, last_purchase_season, last_purchase_value

---

## Lead magnety

| Lead Magnet | Segment | Umiestnenie | Dĺžka sekvencie |
|---|---|---|---|
| "Ako nabrúsiť reťazovú pílu" (PDF) | Vlastníci reťazových píl | Stránka kategórie, blog | 5 emailov, 10 dní |
| "Sprievodca výberom motorovej kosy" | Výskumníci pred nákupom | PLP kosačiek, LP Google Ads | 4 emaily, 8 dní |
| "Zimný servisný kontrolný zoznam" (PDF) | Existujúci vlastníci strojov | Po-nákupný email, listing | 3 emaily, 6 dní |
| Zľava 5% na prvý nákup | Noví návštevníci bez signálu | Pop-up exit intent, pätica | 3 emaily, 5 dní |
| "Lesný denník IBO" (Video séria) | Profesionáli v lesníctve / B2B | YouTube kanál, B2B landing page | 6 emailov, 21 dní |

---

## KPI Dashboard (sledovanie v Ecomail)

| Tok | Cieľ otvorenia | Cieľ kliknutia | Cieľ konverzie | Frekvencia kontroly |
|---|---|---|---|---|
| Uvítacia séria Trasa A | 55–65 % | 18–25 % | 8–12 % na prvý nákup | Mesačne |
| Uvítacia séria Trasa B | 50–60 % | 15–20 % | 10–15 % na prvý nákup | Mesačne |
| Opustený košík — Vysoká | 45–55 % | 20–28 % | 10–15 % obnova košíka | Týždenne |
| Opustený košík — Nízka | 40–50 % | 18–24 % | 12–18 % obnova košíka | Týždenne |
| Starostlivosť o stroj | 60–70 % | 22–30 % | 25–35 % kríz. predaj | Mesačne |
| Sezónne kampane | 28–35 % | 8–14 % | 3–6 % priame tržby | Na kampaň |
| Re-engagement | 20–30 % | 6–10 % | 5–8 % reaktivovanie | Štvrťročne |

---

## Sezónna stratégia

### Jarný pivot (spustenie: 15. februára)
- E1 (15. feb.): "Je to uz tu — jar klope na dvere." — teaser, záhradný traktor, plotostrizor
- E2 (1. mar.): "Servisný checklist pred jarnou sezónou." — príprava stroja, krízový predaj dielov
- E3 (15. mar.): "Novinka: [Nové jarné SKU]." — spustenie produktu, "prví, ktorí vedia"
- E4 (1. apr.): "Jarný nákup pre vašu záhradu — zľavy do konca týždňa." — časovo obmedzená ponuka

### Jesenný pivot "Drevo na zimu" (spustenie: 20. augusta)
- E1 (20. aug.): "Zima prichádza — je vaša reťazová píla pripravená?" — servisná pripomienka
- E2 (1. sept.): "Drevo na zimu: sprievodca výberom vhodnej píly podľa objemu."
- E3 (15. sept.): "Kompletný set pre sezónu: píla + olej + reťaze + ochrana."
- E4 (1. okt.): "Ostatné lesné pracovné odevy pred chladným počasím." — krízový predaj OOP
- E5 (1. nov.): "Zimná konzervácia stroja — ako to urobiť správne."

---

## Úlohy

- [ ] Overiť prístup k Ecomail účtu IBO
- [ ] Zistiť či Buxus má existujúcu integráciu s Ecomail
- [ ] Implementovať Custom Events API (Buxus → Ecomail) cez Claude Code
- [ ] Postaviť Uvítaciu sériu Trasa A v Ecomail
- [ ] Postaviť Uvítaciu sériu Trasa B v Ecomail
- [ ] Postaviť tok Opustený košík (oba)
- [ ] Napísať emaily pre Fázu 1
- [ ] Vytvoriť PDF lead magnet "Ako nabrúsiť reťazovú pílu"
- [ ] Nastaviť pop-up exit intent na ibo.sk

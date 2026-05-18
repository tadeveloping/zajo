import Link from 'next/link'

export const metadata = {
  title: 'Zásady ochrany osobných údajov — Zajo Reality',
  description: 'Informácie o spracovaní osobných údajov v súlade s GDPR.',
}

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: '100dvh',
      background: '#0D0B09',
      color: '#F2EDE7',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: '48px 24px 80px',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Back */}
        <div style={{ marginBottom: '32px' }}>
          <Link href="/" style={{ color: '#8A8279', fontSize: '14px', textDecoration: 'none' }}>
            ← Zajo Reality
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ color: '#E8711A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
            GDPR
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
            Zásady ochrany osobných údajov
          </h1>
          <p style={{ color: '#8A8279', fontSize: '14px', marginTop: '12px' }}>
            Platné od: 1. januára 2025
          </p>
        </div>

        <div style={{ lineHeight: 1.75, fontSize: '15px', color: '#C4B9A8' }}>

          <Section title="1. Prevádzkovateľ">
            <p>
              Prevádzkovateľom osobných údajov je:<br />
              <strong style={{ color: '#F2EDE7' }}>Zajo Reality</strong><br />
              Dolný Šianec 1, 911 48 Trenčín<br />
              Email: <a href="mailto:info@zajoreality.sk" style={{ color: '#E8711A' }}>info@zajoreality.sk</a>
            </p>
          </Section>

          <Section title="2. Aké osobné údaje zbierame">
            <p>Zbierame nasledujúce kategórie osobných údajov:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li style={{ marginBottom: '6px' }}><strong style={{ color: '#F2EDE7' }}>Identifikačné údaje</strong> — meno a priezvisko</li>
              <li style={{ marginBottom: '6px' }}><strong style={{ color: '#F2EDE7' }}>Kontaktné údaje</strong> — emailová adresa, telefónne číslo</li>
              <li style={{ marginBottom: '6px' }}><strong style={{ color: '#F2EDE7' }}>Informácie o nehnuteľnosti</strong> — typ, lokalita, rozloha, stav (v prípade formulárov pre ocenenie alebo predaj)</li>
              <li style={{ marginBottom: '6px' }}><strong style={{ color: '#F2EDE7' }}>Správy a poznámky</strong> — obsah vašich dopytov</li>
            </ul>
          </Section>

          <Section title="3. Účel spracovania">
            <p>Vaše osobné údaje spracúvame na tieto účely:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li style={{ marginBottom: '6px' }}>Kontaktovanie v súvislosti s vaším dopytom (ocenenie nehnuteľnosti, sprostredkovanie predaja alebo kúpy)</li>
              <li style={{ marginBottom: '6px' }}>Zasielanie newslettera s ponukami nehnuteľností a informáciami o trhu (len ak ste vyjadrili súhlas)</li>
              <li style={{ marginBottom: '6px' }}>Správa obchodných kontaktov a zmluvných vzťahov</li>
            </ul>
          </Section>

          <Section title="4. Právny základ spracovania">
            <p>
              Právnym základom spracovania vašich osobných údajov je váš <strong style={{ color: '#F2EDE7' }}>dobrovoľne udelený súhlas</strong> v zmysle čl. 6 ods. 1 písm. a) nariadenia GDPR, ktorý vyjadrujete zaškrtnutím príslušného políčka v našich formulároch.
            </p>
            <p style={{ marginTop: '10px' }}>
              V prípadoch, kde spracúvanie súvisí s plnením zmluvy alebo predzmluvnými rokovaniami, je právnym základom čl. 6 ods. 1 písm. b) GDPR.
            </p>
          </Section>

          <Section title="5. Doba uchovávania">
            <p>
              Vaše osobné údaje uchovávame po dobu <strong style={{ color: '#F2EDE7' }}>2 rokov</strong> od ich poskytnutia, resp. do odvolania súhlasu. Po uplynutí tejto doby budú údaje anonymizované alebo vymazané.
            </p>
            <p style={{ marginTop: '10px' }}>
              Ak odvolate súhlas so zasielaním newslettera, vaša emailová adresa bude bezodkladne odhlásená zo zoznamu príjemcov.
            </p>
          </Section>

          <Section title="6. Príjemcovia osobných údajov">
            <p>
              Vaše osobné údaje nepredávame, neprenajímame ani nezdieľame s tretími stranami na marketingové účely. Údaje môžu byť sprístupnené výlučne:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li style={{ marginBottom: '6px' }}>Subdodávateľom poskytujúcim technické služby (hosting, emailové systémy) — vždy na základe zmluvy a za rovnakých podmienok ochrany údajov</li>
              <li style={{ marginBottom: '6px' }}>Orgánom verejnej moci, ak to vyžaduje zákon</li>
            </ul>
          </Section>

          <Section title="7. Vaše práva">
            <p>V súlade s GDPR máte nasledujúce práva:</p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo na prístup</strong> — máte právo vedieť, aké údaje o vás spracúvame
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo na opravu</strong> — môžete požiadať o opravu nesprávnych alebo neúplných údajov
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo na vymazanie</strong> — môžete požiadať o vymazanie vašich údajov ("právo byť zabudnutý")
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo na obmedzenie spracovania</strong> — môžete požiadať o dočasné obmedzenie spracovania
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo na prenosnosť</strong> — môžete požiadať o poskytnutie údajov v strojovo čitateľnom formáte
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo namietať</strong> — môžete namietať proti spracúvaniu vašich údajov
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#F2EDE7' }}>Právo odvolať súhlas</strong> — udelený súhlas môžete kedykoľvek odvolať bez toho, aby to malo vplyv na zákonnosť spracúvania pred jeho odvolaním
              </li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              Ak sa domnievate, že spracúvanie vašich osobných údajov je v rozpore s GDPR, máte právo podať sťažnosť na Úrad na ochranu osobných údajov SR (<a href="https://dataprotection.gov.sk" target="_blank" rel="noreferrer" style={{ color: '#E8711A' }}>dataprotection.gov.sk</a>).
            </p>
          </Section>

          <Section title="8. Kontakt">
            <p>
              Pre uplatnenie vašich práv alebo akékoľvek otázky týkajúce sa ochrany osobných údajov nás kontaktujte na:
            </p>
            <p style={{ marginTop: '10px' }}>
              <a href="mailto:info@zajoreality.sk" style={{ color: '#E8711A' }}>info@zajoreality.sk</a><br />
              Zajo Reality, Dolný Šianec 1, 911 48 Trenčín
            </p>
          </Section>

        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#F2EDE7',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid #332F2A',
      }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

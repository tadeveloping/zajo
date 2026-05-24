const LOGO_URL = 'https://zajo-five.vercel.app/logo-transparent.png'
const SITE_URL = 'https://zajoreality.sk'

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function firstName(name: string) {
  return escape(name.trim().split(/\s+/)[0])
}

const MOBILE = `@media only screen and (max-width:620px){
  .container{width:100%!important;}
  .px{padding-left:24px!important;padding-right:24px!important;}
  .h1{font-size:26px!important;line-height:1.2!important;}
  .btn a{display:block!important;}
}`

const HEADER_BAR_LOGO = `
<tr>
  <td align="center" style="padding:0;">
    <img src="${LOGO_URL}" alt="Zajo Reality" width="120" style="display:block;height:auto;border:0;" />
  </td>
</tr>`

// ── Template 1 — Newsletter welcome ────────────────────────────────────────

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=360&fit=crop",
]

type WelcomeProperty = {
  title: string
  price: string
  location: string
  area?: string | null
  imageUrl?: string | null
  url: string
}

function buildWelcomePropertyCard(p: WelcomeProperty, idx: number): string {
  const img = p.imageUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]
  const e = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const loc = p.location.length > 35 ? p.location.slice(0, 35) + '…' : p.location
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #ECE6E0;">
  <tr><td style="padding:0;line-height:0;font-size:0;">
    <a href="${e(p.url)}" target="_blank" style="display:block;line-height:0;"><img src="${e(img)}" alt="${e(p.title)}" width="255" height="170" style="display:block;width:100%;height:170px;object-fit:cover;border:0;" /></a>
  </td></tr>
  <tr><td style="background:#E8711A;padding:8px 14px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
      <td style="font-family:'Segoe UI',Arial,sans-serif;font-size:8px;font-weight:800;color:rgba(255,255,255,0.85);letter-spacing:2px;text-transform:uppercase;">PONUKA</td>
      <td align="right" style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:900;color:#FFFFFF;">${e(p.price)}</td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:14px 14px 6px;">
    <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;color:#111111;line-height:1.35;margin-bottom:7px;">${e(p.title)}</div>
    <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:12px;color:#8A7F73;">&#128205;&nbsp;${e(loc)}</div>
  </td></tr>
  <tr><td style="padding:10px 14px 16px;">
    <a href="${e(p.url)}" target="_blank" style="display:inline-block;background:#E8711A;color:#FFFFFF;font-family:'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:800;text-decoration:none;padding:8px 16px;border-radius:5px;letter-spacing:1.5px;text-transform:uppercase;">ZOBRAZIŤ&nbsp;&rarr;</a>
  </td></tr>
</table>`
}

function buildPropertiesGrid(properties: WelcomeProperty[]): string {
  const props = properties.slice(0, 4)
  const rows: string[] = []
  for (let i = 0; i < props.length; i += 2) {
    const left = props[i]
    const right = props[i + 1]
    rows.push(`<tr>
      <td width="50%" valign="top" style="padding:0 6px 12px 0;">${buildWelcomePropertyCard(left, i)}</td>
      <td width="50%" valign="top" style="padding:0 0 12px 6px;">${right ? buildWelcomePropertyCard(right, i + 1) : '<table width="100%"><tr><td></td></tr></table>'}</td>
    </tr>`)
  }
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%">${rows.join('')}</table>`
}

const INSTAGRAM_URL = 'https://www.instagram.com/zajoreality'
const FACEBOOK_URL = 'https://www.facebook.com/zajoreality'

function emailSignature() {
  return `
              <!-- SIGNATURE -->
              <tr>
                <td style="background:#FFFFFF;padding:0 40px 32px;">
                  <div style="height:1px;background:#ECE6E0;margin:0 0 24px;font-size:0;line-height:0;">&nbsp;</div>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td valign="middle">
                        <img src="${LOGO_URL}" alt="Zajo Reality" width="56" style="display:block;height:auto;border:0;" />
                      </td>
                      <td valign="middle" style="padding-left:16px;">
                        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#111111;font-size:14px;font-weight:700;line-height:1.4;">Tomáš Zajac</div>
                        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#8A7F73;font-size:12px;line-height:1.4;">Zajo Reality · Trenčín</div>
                        <div style="margin-top:4px;">
                          <a href="${SITE_URL}" style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:12px;text-decoration:none;">zajoreality.sk</a>
                        </div>
                      </td>
                      <td valign="middle" align="right">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-right:8px;">
                              <a href="${FACEBOOK_URL}" target="_blank" style="display:inline-block;width:36px;height:36px;border-radius:8px;background:#1877F2;text-align:center;text-decoration:none;line-height:36px;">
                                <span style="font-family:Arial,sans-serif;font-size:16px;font-weight:900;color:#FFFFFF;line-height:36px;">f</span>
                              </a>
                            </td>
                            <td>
                              <a href="${INSTAGRAM_URL}" target="_blank" style="display:inline-block;width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);text-align:center;text-decoration:none;line-height:36px;">
                                <span style="font-family:Arial,sans-serif;font-size:13px;font-weight:900;color:#FFFFFF;line-height:36px;">IG</span>
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>`
}

function emailFooter(unsubscribeUrl?: string) {
  return `
              <!-- FOOTER -->
              <tr>
                <td style="background:#F8F5F1;padding:18px 40px 8px;text-align:center;border-top:1px solid #ECE6E0;">
                  ${unsubscribeUrl ? `<p style="margin:0 0 6px;font-family:'Segoe UI',Arial,sans-serif;color:#8A7F73;font-size:12px;line-height:1.65;">Tento e-mail ste dostali, lebo ste sa prihlásili na newsletter Zajo Reality.<br><a href="${unsubscribeUrl}" style="color:#6B6359;text-decoration:underline;">Odhlásiť sa z newslettera</a>.</p>` : ''}
                </td>
              </tr>
              <tr>
                <td style="background:#F8F5F1;padding:4px 40px 22px;text-align:center;">
                  <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#A89F95;font-size:11px;">© 2026 Zajo Reality · Dolný Šianec 1, 911 48 Trenčín</p>
                </td>
              </tr>`
}

export function newsletterWelcomeEmail(name: string, unsubscribeUrl: string, properties?: WelcomeProperty[]): { subject: string; html: string } {
  const fn = firstName(name)
  const subject = `${fn}, vitajte v Zajo Reality 👋`
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="sk">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Vitajte v Zajo Reality</title>
<style>${MOBILE}</style>
</head>
<body style="margin:0;padding:0;background:#F5F2EE;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F5F2EE;">Vitajte v Zajo Reality — nové ponuky, tipy z trhu a novinky 1-2× mesačne.</div>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#F5F2EE;">
  <tr>
    <td align="center" style="padding:0 16px 32px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width:600px;width:100%;">

        <!-- CARD -->
        <tr>
          <td style="background:#FFFFFF;border-radius:12px;overflow:hidden;margin-top:16px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

              <!-- ORANGE HEADER -->
              <tr>
                <td style="background:#E8711A;padding:12px 32px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td><img src="${LOGO_URL}" alt="Zajo Reality" width="70" style="display:block;height:auto;border:0;" /></td>
                      <td align="right" style="color:rgba(255,255,255,0.75);font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;">Newsletter</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- HERO -->
              <tr>
                <td style="background:linear-gradient(160deg,#FFF8F2 0%,#FFFFFF 60%);padding:44px 40px 28px;">
                  <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">Vitajte v Zajo Reality</div>
                  <h1 style="margin:0 0 18px;font-family:'Segoe UI',Arial,sans-serif;color:#111111;font-size:32px;font-weight:900;line-height:1.15;">${fn}, ďakujeme<br/>za prihlásenie&nbsp;👋</h1>
                  <div style="height:4px;width:56px;background:linear-gradient(90deg,#E8711A,#f09240);border-radius:2px;margin:0 0 22px;font-size:0;line-height:0;">&nbsp;</div>
                  <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#3D3530;font-size:15px;line-height:1.7;">Sme radi, že ste sa pridali k odberateľom Zajo Reality.<br/>Posielame newsletter <b style="color:#111111;">1-2× mesačne</b> — krátky, prehľadný a bez spamu.</p>
                </td>
              </tr>

              <!-- WHAT YOU GET -->
              <tr>
                <td style="background:#FFFFFF;padding:8px 40px 28px;">
                  <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:18px;">Čo vás čaká</div>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    ${[
                      ['🏠', 'Nové nehnuteľnosti', 'Byty, domy a pozemky v Trenčianskom kraji — často skôr ako sa objavia inde.'],
                      ['💡', 'Tipy z trhu', 'Krátke rady — ako predať za lepšiu cenu, čo sledovať pri kúpe, hypotéky, dane.'],
                      ['📍', 'Novinky z regiónu', 'Čo sa deje na realitnom trhu v Trenčíne a okolí — bez zbytočnej omáčky.'],
                    ].map(([icon, title, desc]) => `
                    <tr>
                      <td style="padding:0 0 12px 0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#FAFAF9;border-left:3px solid #E8711A;border-radius:6px;">
                          <tr>
                            <td width="44" style="padding:14px 0 14px 16px;font-size:20px;vertical-align:top;">${icon}</td>
                            <td style="padding:14px 16px 14px 8px;font-family:'Segoe UI',Arial,sans-serif;vertical-align:top;">
                              <div style="color:#111111;font-size:14px;font-weight:700;line-height:1.3;margin-bottom:3px;">${title}</div>
                              <div style="color:#6B6359;font-size:13px;line-height:1.55;">${desc}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>`).join('')}
                  </table>
                </td>
              </tr>

              ${properties && properties.length > 0 ? `
              <!-- PROPERTIES 2x2 -->
              <tr>
                <td style="background:#F8F5F1;padding:28px 32px 16px;border-top:1px solid #ECE6E0;">
                  <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:16px;">Aktuálne najvýhodnejšie ponuky</div>
                  ${buildPropertiesGrid(properties)}
                </td>
              </tr>` : ''}

              <!-- CTA -->
              <tr>
                <td class="px" align="center" style="background:#FFFFFF;padding:26px 40px 40px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn">
                    <tr>
                      <td bgcolor="#E8711A" style="border-radius:8px;">
                        <a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:16px 30px;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:900;color:#FFFFFF;text-decoration:none;border-radius:8px;letter-spacing:0.3px;">Pozrite aktuálne nehnuteľnosti&nbsp;&rarr;</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${emailSignature()}
              ${emailFooter(unsubscribeUrl)}

            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
  return { subject, html }
}

// ── Template 2 — Lead confirmation ─────────────────────────────────────────
export function leadConfirmationEmail(name: string, typZaujmu: string): { subject: string; html: string } {
  const fn = firstName(name)
  const subject = `${fn}, dostali sme vašu požiadavku ✓`
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="sk">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Dostali sme vašu požiadavku</title>
<style>${MOBILE}</style>
</head>
<body style="margin:0;padding:0;background:#F5F2EE;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F5F2EE;">Vašu správu sme prijali. Ozveme sa osobne do 24 hodín v pracovné dni.</div>
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#F5F2EE;">
  <tr>
    <td align="center" style="padding:0 16px 32px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width:600px;width:100%;">

        <!-- CARD -->
        <tr>
          <td style="background:#FFFFFF;border-radius:12px;overflow:hidden;margin-top:16px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

              <!-- ORANGE HEADER -->
              <tr>
                <td style="background:#E8711A;padding:12px 32px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td><img src="${LOGO_URL}" alt="Zajo Reality" width="70" style="display:block;height:auto;border:0;" /></td>
                      <td align="right" style="color:rgba(255,255,255,0.75);font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;">Trenčín</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- HERO -->
              <tr>
                <td class="px" style="background:#FFFFFF;padding:40px 40px 22px;">
                  <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:14px;">Potvrdenie požiadavky</div>
                  <h1 class="h1" style="margin:0 0 14px;font-family:'Segoe UI',Arial,sans-serif;color:#111111;font-size:30px;font-weight:900;line-height:1.15;">${fn}, máme vašu správu&nbsp;✓</h1>
                  <div style="height:3px;width:48px;background:#E8711A;margin:0 0 22px;font-size:0;line-height:0;">&nbsp;</div>
                  <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#3D3530;font-size:15px;line-height:1.65;">Ďakujeme, vašu požiadavku sme dostali a už sa jej venujeme.</p>
                </td>
              </tr>

              <!-- HIGHLIGHT BOX -->
              <tr>
                <td class="px" style="background:#FFFFFF;padding:14px 40px 10px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#FFF6EB;border-left:3px solid #E8711A;border-radius:6px;">
                    <tr>
                      <td style="padding:18px 22px 14px;">
                        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Čo riešite</div>
                        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#111111;font-size:16px;font-weight:700;line-height:1.4;">${escape(typZaujmu)}</div>
                      </td>
                    </tr>
                    <tr><td style="padding:0 22px;"><div style="height:1px;background:#F0DEC4;font-size:0;line-height:0;">&nbsp;</div></td></tr>
                    <tr>
                      <td style="padding:14px 22px 18px;">
                        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:12px;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">⏱&nbsp; Ozveme sa do 24 hodín</div>
                        <div style="font-family:'Segoe UI',Arial,sans-serif;color:#3D3530;font-size:14px;line-height:1.55;">V pracovné dni vás osobne kontaktujeme. Ozve sa vám jeden z našich maklérov, ktorý vám rád zodpovie všetky vaše otázky.</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- PERSONAL -->
              <tr>
                <td class="px" style="background:#FFFFFF;padding:18px 40px 8px;">
                  <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#3D3530;font-size:15px;line-height:1.65;">Zajo Reality je <b style="color:#111111;">lokálna realitná kancelária</b> z Trenčína — nie korporát. Každého klienta spoznávame osobne a každú nehnuteľnosť riešime naplno.</p>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td class="px" align="center" style="background:#FFFFFF;padding:26px 40px 40px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn">
                    <tr>
                      <td bgcolor="#E8711A" style="border-radius:8px;">
                        <a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:16px 30px;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:900;color:#FFFFFF;text-decoration:none;border-radius:8px;letter-spacing:0.3px;">Pozrite naše nehnuteľnosti&nbsp;&rarr;</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${emailSignature()}
              ${emailFooter()}

            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
  return { subject, html }
}

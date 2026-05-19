const LOGO_URL = 'https://zajo-five.vercel.app/logo-v3.png'
const SITE_URL = 'https://zajoreality.sk'

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── Shared wrapper ──────────────────────────────────────────────────────────
function wrap(inner: string) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="sk">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="x-apple-disable-message-reformatting" />
<style>
  @media only screen and (max-width:620px){
    .container{width:100%!important;}
    .px{padding-left:24px!important;padding-right:24px!important;}
    .h1{font-size:26px!important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#F4F1ED;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#F4F1ED;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width:600px;width:100%;">

        <!-- LOGO -->
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <img src="${LOGO_URL}" alt="Zajo Reality" width="120" style="display:block;height:auto;border:0;" />
          </td>
        </tr>

        <!-- CARD -->
        <tr>
          <td style="background:#15110D;border-radius:14px;overflow:hidden;">
            ${inner}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#9E948A;font-size:12px;line-height:1.7;">
              © 2026 Zajo Reality · Dolný Šianec 1, 911 48 Trenčín
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

// ── Template 1 — Newsletter welcome ────────────────────────────────────────
export function newsletterWelcomeEmail(name: string, unsubscribeUrl: string): { subject: string; html: string } {
  const subject = `${name}, vitajte v Zajo Reality 👋`
  const html = wrap(`
    <!-- HEADER -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="background:#E8711A;padding:22px 36px;border-radius:14px 14px 0 0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="color:#fff;font-family:'Segoe UI',Arial,sans-serif;font-weight:900;font-size:18px;letter-spacing:2px;">ZAJO REALITY</td>
              <td align="right" style="color:rgba(255,255,255,0.7);font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:1px;">NEWSLETTER</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- BODY -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="px" style="padding:0 36px;">
      <tr>
        <td style="padding:36px 0 20px;">
          <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:14px;">Prihlásenie potvrdené</div>
          <h1 class="h1" style="margin:0 0 12px;font-family:'Segoe UI',Arial,sans-serif;color:#FFFFFF;font-size:28px;font-weight:900;line-height:1.15;">${escape(name)}, ďakujeme za prihlásenie&nbsp;👋</h1>
          <div style="height:3px;width:40px;background:#E8711A;margin:0 0 20px;font-size:0;line-height:0;">&nbsp;</div>
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#C8BFB4;font-size:15px;line-height:1.65;">
            Posielame newsletter <strong style="color:#fff;">1–2× mesačne</strong> — prehľad nových nehnuteľností, tipy z trhu a novinky z Trenčína. Stručne, bez spamu.
          </p>
        </td>
      </tr>

      <!-- BULLETS -->
      <tr>
        <td style="padding:0 0 28px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            ${[
              ['Nové nehnuteľnosti', 'Byty, domy a pozemky v Trenčianskom kraji — často skôr ako sa objavia inde.'],
              ['Tipy z trhu', 'Ako predať za lepšiu cenu, čo sledovať pri kúpe, hypotéky a dane — bez zbytočnej teórie.'],
              ['Novinky z regiónu', 'Čo sa deje na realitnom trhu v Trenčíne a okolí.'],
            ].map(([title, desc]) => `
            <tr>
              <td valign="top" style="padding:10px 0;border-top:1px solid #2A241E;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td valign="top" width="28" style="color:#E8711A;font-size:18px;font-weight:900;font-family:'Segoe UI',Arial,sans-serif;line-height:1.3;">›</td>
                    <td>
                      <div style="color:#FFFFFF;font-size:14px;font-weight:700;line-height:1.4;margin-bottom:3px;">${title}</div>
                      <div style="color:#9E948A;font-size:13px;line-height:1.55;">${desc}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`).join('')}
          </table>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td align="center" style="padding:4px 0 36px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td bgcolor="#E8711A" style="border-radius:8px;">
                <a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:15px 28px;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:900;color:#0D0B09;text-decoration:none;border-radius:8px;letter-spacing:0.3px;">Pozrite aktuálne nehnuteľnosti &rarr;</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- SIGNATURE -->
      <tr>
        <td style="padding:0 0 32px;border-top:1px solid #2A241E;">
          <p style="margin:16px 0 2px;font-family:'Segoe UI',Arial,sans-serif;color:#C8BFB4;font-size:14px;line-height:1.6;">S pozdravom,</p>
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#FFFFFF;font-size:14px;font-weight:700;line-height:1.6;">Tomáš Zajac — Zajo Reality</p>
          <p style="margin:2px 0 0;font-family:'Segoe UI',Arial,sans-serif;color:#6B6359;font-size:12px;">Trenčín · zajoreality.sk</p>
        </td>
      </tr>
    </table>

    <!-- UNSUBSCRIBE -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="background:#0D0B09;padding:18px 36px;border-radius:0 0 14px 14px;text-align:center;">
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#5A534B;font-size:11px;line-height:1.7;">
            Dostali ste tento email, lebo ste sa prihlásili na newsletter Zajo Reality.<br>
            <a href="${unsubscribeUrl}" style="color:#9E948A;text-decoration:underline;">Odhlásiť sa z newslettera</a>
          </p>
        </td>
      </tr>
    </table>
  `)
  return { subject, html }
}

// ── Template 2 — Lead confirmation ─────────────────────────────────────────
export function leadConfirmationEmail(name: string, typZaujmu: string): { subject: string; html: string } {
  const subject = `${name}, dostali sme vašu požiadavku ✓`
  const html = wrap(`
    <!-- HEADER -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="background:#E8711A;padding:22px 36px;border-radius:14px 14px 0 0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="color:#fff;font-family:'Segoe UI',Arial,sans-serif;font-weight:900;font-size:18px;letter-spacing:2px;">ZAJO REALITY</td>
              <td align="right" style="color:rgba(255,255,255,0.7);font-family:'Segoe UI',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:1px;">TRENČÍN</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- BODY -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="px" style="padding:0 36px;">
      <tr>
        <td style="padding:36px 0 20px;">
          <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:14px;">Potvrdenie požiadavky</div>
          <h1 class="h1" style="margin:0 0 12px;font-family:'Segoe UI',Arial,sans-serif;color:#FFFFFF;font-size:28px;font-weight:900;line-height:1.15;">${escape(name)}, máme vašu správu&nbsp;✓</h1>
          <div style="height:3px;width:40px;background:#E8711A;margin:0 0 20px;font-size:0;line-height:0;">&nbsp;</div>
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#C8BFB4;font-size:15px;line-height:1.65;">
            Ďakujeme, vašu požiadavku sme dostali a už sa jej venujeme.
          </p>
        </td>
      </tr>

      <!-- HIGHLIGHT BOX -->
      <tr>
        <td style="padding:0 0 24px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#1F1A14;border-left:3px solid #E8711A;border-radius:6px;">
            <tr>
              <td style="padding:18px 22px 14px;">
                <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Čo riešite</div>
                <div style="font-family:'Segoe UI',Arial,sans-serif;color:#FFFFFF;font-size:16px;font-weight:700;line-height:1.4;">${escape(typZaujmu)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 22px;"><div style="height:1px;background:#2A241E;font-size:0;line-height:0;">&nbsp;</div></td>
            </tr>
            <tr>
              <td style="padding:14px 22px 18px;">
                <div style="font-family:'Segoe UI',Arial,sans-serif;color:#E8711A;font-size:12px;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">⏱&nbsp; Ozveme sa do 24 hodín</div>
                <div style="font-family:'Segoe UI',Arial,sans-serif;color:#C8BFB4;font-size:14px;line-height:1.6;">V pracovné dni vás osobne kontaktujeme. Ozve sa vám priamo Tomáš — bez automatických odpovedí a presúvania.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ABOUT -->
      <tr>
        <td style="padding:0 0 28px;">
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#C8BFB4;font-size:14px;line-height:1.7;">
            Zajo Reality je <strong style="color:#fff;">lokálna realitná kancelária</strong> z Trenčína — nie korporát. Každého klienta poznáme osobne a každú nehnuteľnosť riešime naplno.
          </p>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td align="center" style="padding:0 0 36px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td bgcolor="#E8711A" style="border-radius:8px;">
                <a href="${SITE_URL}" target="_blank" style="display:inline-block;padding:15px 28px;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:900;color:#0D0B09;text-decoration:none;border-radius:8px;letter-spacing:0.3px;">Pozrite naše nehnuteľnosti &rarr;</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- SIGNATURE -->
      <tr>
        <td style="padding:0 0 32px;border-top:1px solid #2A241E;">
          <p style="margin:16px 0 2px;font-family:'Segoe UI',Arial,sans-serif;color:#C8BFB4;font-size:14px;line-height:1.6;">S pozdravom,</p>
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#FFFFFF;font-size:14px;font-weight:700;line-height:1.6;">Tomáš Zajac — Zajo Reality</p>
          <p style="margin:2px 0 0;font-family:'Segoe UI',Arial,sans-serif;color:#6B6359;font-size:12px;">Trenčín · zajoreality.sk</p>
        </td>
      </tr>
    </table>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="background:#0D0B09;padding:16px 36px;border-radius:0 0 14px 14px;text-align:center;">
          <p style="margin:0;font-family:'Segoe UI',Arial,sans-serif;color:#5A534B;font-size:11px;">© 2026 Zajo Reality · Trenčín</p>
        </td>
      </tr>
    </table>
  `)
  return { subject, html }
}

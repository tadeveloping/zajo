import type { NewsletterContent, NewsletterProperty } from "@/types";

const LOGO_B64 = "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";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=360&fit=crop",
];

const TIP_ICONS: Record<string, string> = {
  rada: "&#128161;",
  novinky: "&#128240;",
  trh: "&#128202;",
};

const TIP_LABELS: Record<string, string> = {
  rada: "REALITNÁ RADA",
  novinky: "NOVINKY Z TRHU",
  trh: "POHĽAD NA TRH",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHtml(s: string): string {
  // Allow only <strong>, <br/> — strip everything else
  return s
    .replace(/&/g, "&amp;")
    .replace(/<(?!\/?(?:strong|br)\b)[^>]*>/gi, "")
    .replace(/&amp;(?=(?:strong|br))/g, "&");
}

function buildPropertyCard(p: NewsletterProperty, idx: number): string {
  const img = p.imageUrl || PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
  const badgeHtml = p.badge
    ? `<tr><td style="background:${p.badge === "ZNÍŽENÁ CENA" ? "#1C1917" : "#E0882C"};padding:6px 18px;height:28px;line-height:1;"><span style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:2.5px;text-transform:uppercase;">${esc(p.badge)}</span></td></tr>`
    : `<tr><td style="height:28px;padding:0;font-size:0;line-height:0;">&nbsp;</td></tr>`;

  const meta = [p.area ? `<strong>${esc(String(p.area))}</strong>` : null, p.rooms ? `<strong>${esc(String(p.rooms))}</strong>` : null]
    .filter(Boolean)
    .join("&nbsp;·&nbsp;");

  return `<table cellpadding="0" cellspacing="0" border="0" width="274" height="100%"
    style="background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E3E1DC;box-shadow:0 2px 12px rgba(0,0,0,0.07);height:100%;">
    <tr><td style="padding:0;line-height:0;"><img src="${esc(img)}" alt="${esc(p.title)}" width="274" height="180" style="display:block;width:274px;height:180px;object-fit:cover;border:0;"/></td></tr>
    ${badgeHtml}
    <tr><td style="padding:16px 16px 8px 16px;">
      <h3 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#1C1917;margin:0 0 7px 0;line-height:1.3;">${esc(p.title)}</h3>
      <p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#E0882C;margin:0 0 8px 0;line-height:1;">${esc(p.price)}</p>
      ${meta ? `<p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;margin:0 0 6px 0;">${meta}</p>` : ""}
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;margin:0 0 0 0;">&#128205; ${esc(p.location)}</p>
    </td></tr>
    <tr><td style="height:100%;padding:0;"></td></tr>
    <tr><td style="padding:12px 16px 20px 16px;">
      <a href="${esc(p.url)}" style="display:inline-block;background:#E0882C;color:#FFFFFF;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:9px;font-weight:800;letter-spacing:1.5px;text-decoration:none;padding:8px 16px;border-radius:3px;text-transform:uppercase;">Zobraziť &#8594;</a>
    </td></tr>
  </table>`;
}

function buildGrid(properties: NewsletterProperty[]): string {
  const rows: string[] = [];
  for (let i = 0; i < properties.length; i += 2) {
    const left = properties[i];
    const right = properties[i + 1];
    rows.push(`<tr><td style="padding:0 20px 14px 20px;">
      <table cellpadding="0" cellspacing="0" border="0" width="560"><tr>
        <td width="274" style="vertical-align:top;padding-right:6px;height:1px;">${buildPropertyCard(left, i)}</td>
        <td width="274" style="vertical-align:top;padding-left:6px;height:1px;">${right ? buildPropertyCard(right, i + 1) : ""}</td>
      </tr></table>
    </td></tr>`);
  }
  return rows.join("");
}

export function generateNewsletterHTML(content: NewsletterContent, recipientEmail: string): string {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://zajo-five.vercel.app").replace(/\/$/, "");
  // Email clients block data: URLs — use hosted logo when APP_URL is set
  const logoSrc = appUrl ? `${appUrl}/logo.png` : `data:image/png;base64,${LOGO_B64}`;
  const unsubscribeUrl = appUrl
    ? `${appUrl}/odhlasit?email=${encodeURIComponent(recipientEmail)}`
    : `/odhlasit?email=${encodeURIComponent(recipientEmail)}`;
  const tipIcon = TIP_ICONS[content.tip.type] || "&#128161;";
  const tipLabel = TIP_LABELS[content.tip.type] || "TIP";
  const count = content.properties.length;

  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(content.greeting)} — ZAJO Reality</title>
</head>
<body style="margin:0;padding:40px 0;background:#ECEAE5;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ECEAE5;padding:40px 0;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:600px;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-radius:12px;">

<!-- HEADER -->
<tr><td style="background:linear-gradient(90deg,#E0882C 0%,#C97520 100%);border-radius:12px 12px 0 0;padding:20px 32px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td style="vertical-align:middle;">
      <img src="${logoSrc}" alt="ZAJO Reality" width="144" height="140" style="display:block;width:72px;height:70px;border:0;"/>
    </td>
    <td align="right" style="vertical-align:middle;">
      <span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,0.90);letter-spacing:0.5px;">${esc(content.month)}</span>
    </td>
  </tr></table>
</td></tr>

<!-- HERO -->
<tr><td style="background:#FFFFFF;padding:44px 32px 44px 32px;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr><td><p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 18px 0;">&#9632;&nbsp; VÝBER DOPORUČENÝCH NEHNUTEĽNOSTÍ</p></td></tr>
    <tr><td>
      <h1 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:34px;font-weight:800;color:#1C1917;margin:0 0 8px 0;line-height:1.15;letter-spacing:-0.5px;">${esc(content.greeting)},</h1>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td style="background:#B8860B;height:2px;width:48px;border-radius:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
    </td></tr>
    <tr><td><p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;color:#555555;line-height:1.8;margin:0;max-width:460px;">${safeHtml(content.intro)}</p></td></tr>
  </table>
</td></tr>

<!-- TIP -->
<tr><td style="background:#FFFFFF;padding:32px 32px 36px 32px;border-top:1px solid #E3E1DC;">
  <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr>
    <td style="padding-right:10px;vertical-align:middle;font-size:18px;line-height:1;">${tipIcon}</td>
    <td style="vertical-align:middle;border-bottom:2px solid #E0882C;padding-bottom:2px;"><span style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;">${tipLabel}</span></td>
  </tr></table>
  <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#1C1917;margin:0 0 14px 0;line-height:1.3;letter-spacing:-0.2px;">${esc(content.tip.title)}</h2>
  <div style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.85;">${safeHtml(content.tip.body)}</div>
</td></tr>

<!-- PROPERTIES HEADER -->
<tr><td style="background:#F7F5F1;padding:28px 32px 16px 32px;border-top:1px solid #E3E1DC;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td>
      <p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 4px 0;">VÝBER NEHNUTEĽNOSTÍ</p>
      <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#1C1917;margin:0;letter-spacing:-0.2px;">Najnovšie ponuky v Trenčíne</h2>
    </td>
    <td align="right" style="vertical-align:bottom;"><span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;">${count} nehnuteľnost${count === 1 ? "" : count < 5 ? "i" : "í"}</span></td>
  </tr></table>
  <table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;"><tr><td style="background:#B8860B;height:2px;width:40px;border-radius:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
</td></tr>

<!-- GRID -->
<tr><td style="background:#F7F5F1;padding-bottom:12px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    ${buildGrid(content.properties)}
  </table>
</td></tr>

<!-- CTA -->
<tr><td style="background:linear-gradient(135deg,#E0882C 0%,#C97520 100%);padding:40px 32px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center">
    <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#FFFFFF;margin:0 0 10px 0;line-height:1.3;">${esc(content.ctaText)}</h2>
    <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 24px 0;line-height:1.65;">Máme stovky overených ponúk v Trenčíne a okolí.<br/>Zavolajte nám alebo prezrite celé portfólio.</p>
    <a href="${esc(content.ctaUrl)}" style="display:inline-block;background:#FFFFFF;color:#C97520;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.5px;text-decoration:none;padding:14px 36px;border-radius:3px;text-transform:uppercase;">Zobraziť všetky ponuky</a>
  </td></tr></table>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#FFFFFF;border-top:1px solid #E3E1DC;padding:24px 32px 30px 32px;border-radius:0 0 12px 12px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td align="center" style="padding-bottom:14px;"><img src="${logoSrc}" alt="ZAJO Reality" width="96" height="94" style="display:block;margin:0 auto;width:48px;height:47px;border:0;"/></td></tr>
    <tr><td align="center" style="padding-bottom:14px;">
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#888888;margin:0 0 4px 0;line-height:1.9;">ZAJO Reality s.r.o.&nbsp;&nbsp;·&nbsp;&nbsp;Trenčín, Slovensko</p>
      <p style="margin:0;">
        <a href="mailto:zajac@zajoreality.sk" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E0882C;text-decoration:none;">zajac@zajoreality.sk</a>
        <span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E3E1DC;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <a href="https://www.zajoreality.sk" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E0882C;text-decoration:none;">zajoreality.sk</a>
      </p>
    </td></tr>
    <tr><td style="border-top:1px solid #E3E1DC;padding-top:14px;">
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#BBBBBB;margin:0;text-align:center;line-height:2;">
        Tento email bol odoslaný na adresu <span style="color:#888888;">${esc(recipientEmail)}</span>.<br/>
        <a href="${unsubscribeUrl}" style="color:#888888;text-decoration:underline;">Odhlásiť sa z odberu</a>&nbsp;·&nbsp;
        <a href="https://www.zajoreality.sk/gdpr" style="color:#888888;text-decoration:underline;">Ochrana osobných údajov</a>
      </p>
    </td></tr>
  </table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

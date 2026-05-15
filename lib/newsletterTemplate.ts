import type { NewsletterContent } from "@/types";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

export function generateNewsletterHTML(
  content: NewsletterContent,
  recipientEmail: string
): string {
  const unsubscribeUrl = `/odhlasit?email=${encodeURIComponent(recipientEmail)}`;

  const listingsHtml = content.listings
    .map(
      (l) => `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 32px 16px;background:#1e1e1e;border-left:3px solid #c8773a;border-radius:4px;">
        <tr><td style="padding:20px;">
          <div style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:700;margin-bottom:4px;">${esc(l.title)}</div>
          <div style="color:#c8773a;font-family:Arial,sans-serif;font-size:15px;font-weight:600;">${esc(l.price)}</div>
          <div style="color:#888888;font-family:Arial,sans-serif;font-size:13px;margin-top:2px;">${esc(l.location)} · ${esc(l.area)}</div>
          <div style="color:#d4d4d4;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;margin-top:8px;">${nl2br(l.description)}</div>
          <div style="margin-top:8px;"><a href="${esc(l.url)}" style="color:#c8773a;font-family:Arial,sans-serif;font-size:13px;text-decoration:none;">Zobraziť ponuku →</a></div>
        </td></tr>
      </table>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(content.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;">
  <tr><td align="center" style="padding:24px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#141414;">
      <tr><td style="padding:32px;border-bottom:1px solid #2a2a2a;">
        <div style="color:#ffffff;font-family:Georgia,serif;font-size:28px;font-weight:700;">ZAJO Reality</div>
      </td></tr>

      <tr><td style="padding:32px;color:#d4d4d4;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">
        ${nl2br(content.greeting)}
      </td></tr>

      <tr><td style="padding:0 32px 16px;">
        <div style="color:#ffffff;font-family:Arial,sans-serif;font-size:18px;font-weight:700;">Aktuálne nehnuteľnosti</div>
      </td></tr>

      <tr><td style="padding:0;">${listingsHtml}</td></tr>

      <tr><td style="padding:0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:32px;background:#1a1a1a;border-left:3px solid #c8773a;border-radius:4px;width:calc(100% - 64px);">
          <tr><td style="padding:20px;">
            <div style="color:#c8773a;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Tip mesiaca</div>
            <div style="color:#d4d4d4;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;font-style:italic;">${nl2br(content.tip)}</div>
          </td></tr>
        </table>
      </td></tr>

      <tr><td align="center" style="padding:32px;">
        <div style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;margin-bottom:20px;">${nl2br(content.cta)}</div>
        <a href="mailto:zajac@zajoreality.sk" style="display:inline-block;background:#c8773a;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:600;padding:12px 32px;border-radius:4px;text-decoration:none;">Napíšte Tomášovi</a>
      </td></tr>

      <tr><td style="background:#0f0f0f;padding:24px 32px;color:#555555;font-family:Arial,sans-serif;font-size:12px;line-height:1.8;">
        ZAJO Reality | Dolný Šianec 1, 911 48 Trenčín<br>
        zajac@zajoreality.sk | 0907 980 436<br>
        <a href="${unsubscribeUrl}" style="color:#555555;text-decoration:underline;">Odhlásiť odber</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

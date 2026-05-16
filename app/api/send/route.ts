import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { supabaseAdmin } from "@/lib/supabase";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { generateNewsletterHTML } from "@/lib/newsletterTemplate";
import { sendSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const maxDuration = 300;

const BATCH = 50;
const BATCH_DELAY_MS = 200;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Attachment = { filename: string; content: string; content_id: string };

async function fetchImageAsAttachment(url: string, cid: string, idx: number): Promise<Attachment | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const ct = res.headers.get("content-type") || "image/jpeg";
    const ext = ct.includes("png") ? "png" : "jpg";
    return { filename: `property-${idx}.${ext}`, content: Buffer.from(buf).toString("base64"), content_id: cid };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }
  const parsed = sendSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatný obsah" }, { status: 400 });
  }
  const { subject, content } = parsed.data;

  const { data: contacts, error } = await supabaseAdmin
    .from("contacts")
    .select("id,email,name")
    .eq("subscribed", true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!contacts || contacts.length === 0) {
    return NextResponse.json({ error: "Žiadni odberatelia" }, { status: 400 });
  }

  // Build attachments list once — logo + all property images
  const attachments: Attachment[] = [];

  // Logo from disk
  try {
    const logoBuffer = readFileSync(join(process.cwd(), "public/logo-v2.png"));
    attachments.push({ filename: "logo.png", content: logoBuffer.toString("base64"), content_id: "zajo-logo" });
  } catch { /* logo missing — broken img is acceptable fallback */ }

  // Property images downloaded in parallel; build url→cid map for HTML substitution
  const urlToCid = new Map<string, string>();
  await Promise.all(
    content.properties.map(async (p, idx) => {
      if (!p.imageUrl) return;
      const cid = `prop-img-${idx}`;
      const att = await fetchImageAsAttachment(p.imageUrl, cid, idx);
      if (att) {
        attachments.push(att);
        urlToCid.set(p.imageUrl, cid);
      }
    })
  );

  // Generate base HTML (uses cid:zajo-logo for logo by default)
  // then replace property image URLs with their CIDs
  function buildHtml(recipientEmail: string): string {
    let html = generateNewsletterHTML(content, recipientEmail);
    for (const [url, cid] of urlToCid) {
      html = html.replaceAll(url, `cid:${cid}`);
    }
    return html;
  }

  let sent = 0;
  const failures: string[] = [];

  for (let i = 0; i < contacts.length; i += BATCH) {
    const slice = contacts.slice(i, i + BATCH);
    await Promise.all(
      slice.map(async (c) => {
        try {
          const html = buildHtml(c.email);
          const result = await getResend().emails.send({
            from: FROM_EMAIL,
            to: c.email,
            subject,
            html,
            ...(attachments.length ? { attachments } : {}),
          });
          if (result.error) {
            console.error("Resend error for", c.email, result.error);
            failures.push(`${c.email}: ${result.error.message}`);
          } else {
            sent++;
          }
        } catch (e) {
          failures.push(`${c.email}: ${e instanceof Error ? e.message : "unknown"}`);
        }
      })
    );
    if (i + BATCH < contacts.length) await sleep(BATCH_DELAY_MS);
  }

  const archiveHtml = buildHtml(contacts[0].email);
  await supabaseAdmin.from("issues").insert({
    subject,
    html_content: archiveHtml,
    recipient_count: sent,
  });

  return NextResponse.json({
    success: true,
    sent,
    total: contacts.length,
    failures: failures.length ? failures : undefined,
  });
}

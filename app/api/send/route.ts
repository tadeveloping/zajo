import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { generateNewsletterHTML } from "@/lib/newsletterTemplate";
import { sendSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const maxDuration = 300;

const BATCH = 50;
const BATCH_DELAY_MS = 200;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

  let sent = 0;
  const failures: string[] = [];

  for (let i = 0; i < contacts.length; i += BATCH) {
    const slice = contacts.slice(i, i + BATCH);
    await Promise.all(
      slice.map(async (c) => {
        try {
          const html = generateNewsletterHTML(content, c.email);
          const result = await getResend().emails.send({
            from: FROM_EMAIL,
            to: c.email,
            subject,
            html,
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

  // Store issue (use first contact's email for the canonical render — simple/representative)
  const archiveHtml = generateNewsletterHTML(content, contacts[0].email);
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

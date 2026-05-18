import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { subscribeSchema } from "@/lib/validators";

export const runtime = "nodejs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400, headers: CORS });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Neplatné údaje" },
      { status: 400 }
    );
  }
  const { name, email, phone, source } = parsed.data;

  const { data: existing } = await supabaseAdmin
    .from("contacts")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Email už existuje" }, { status: 409, headers: CORS });
  }

  const { error: insertErr } = await supabaseAdmin.from("contacts").insert({
    name,
    email,
    phone: phone ?? null,
    source: source ?? "landing_page",
    subscribed: true,
  });
  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500, headers: CORS });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Vitajte — ZAJO Reality",
      html: `<!DOCTYPE html><html lang="sk"><body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;"><tr><td align="center" style="padding:32px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#141414;">
            <tr><td style="padding:32px;border-bottom:1px solid #2a2a2a;color:#fff;font-family:Georgia,serif;font-size:28px;font-weight:700;">ZAJO Reality</td></tr>
            <tr><td style="padding:32px;color:#d4d4d4;font-size:15px;line-height:1.7;">
              Vitajte, ${name.replace(/</g, "&lt;")}!<br><br>
              Ďakujeme za prihlásenie. Budeme vás informovať o nových nehnuteľnostiach z Trenčína a okolia.<br><br>
              — Tomáš Zajac, ZAJO Reality
            </td></tr>
            <tr><td style="background:#0f0f0f;padding:24px 32px;color:#555;font-size:12px;line-height:1.8;">
              ZAJO Reality | Dolný Šianec 1, 911 48 Trenčín<br>
              zajac@zajoreality.sk | 0907 980 436
            </td></tr>
          </table>
        </td></tr></table></body></html>`,
    });
  } catch (e) {
    console.error("welcome email failed", e);
  }

  return NextResponse.json({ success: true }, { headers: CORS });
}

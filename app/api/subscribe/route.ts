import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { subscribeSchema } from "@/lib/validators";
import { newsletterWelcomeEmail } from "@/lib/emailTemplates";

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
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zajo-five.vercel.app'
    const unsubscribeUrl = `${appUrl}/odhlasit?email=${encodeURIComponent(email)}`
    const { subject, html } = newsletterWelcomeEmail(name, unsubscribeUrl)
    await resend.emails.send({ from: FROM_EMAIL, to: email, subject, html })
  } catch (e) {
    console.error("welcome email failed", e);
  }

  return NextResponse.json({ success: true }, { headers: CORS });
}

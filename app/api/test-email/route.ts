import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { to } = await req.json().catch(() => ({ to: null }));
  if (!to) return NextResponse.json({ error: "Chýba 'to' email" }, { status: 400 });

  const resend = getResend();
  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Test — ZAJO Newsletter",
    html: "<p>Testovací email funguje.</p>",
  });

  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, id: result.data?.id });
}

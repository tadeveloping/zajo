import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { contactSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ contacts: data ?? [] });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Neplatné údaje" },
      { status: 400 }
    );
  }
  const { name, email, phone, source, subscribed } = parsed.data;

  const { data: existing } = await supabaseAdmin
    .from("contacts")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existing) return NextResponse.json({ error: "Email už existuje" }, { status: 409 });

  const { data, error } = await supabaseAdmin
    .from("contacts")
    .insert({
      name,
      email,
      phone: phone ?? null,
      source: source ?? "manual",
      subscribed: subscribed ?? true,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ contact: data });
}

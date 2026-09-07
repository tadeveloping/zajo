import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminOnlyUser, unauthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Consent timeline for one email (opt-in / opt-out events), newest first.
// Admin only. Returns [] if the consent_log table doesn't exist yet.
export async function GET(req: Request) {
  if (!(await getAdminOnlyUser())) return unauthorized();
  const email = new URL(req.url).searchParams.get("email")?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Chýba email" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("consent_log")
    .select("id,email,name,action,source,actor,consent_text,created_at")
    .eq("email", email)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ events: [] });
  return NextResponse.json({ events: data ?? [] });
}

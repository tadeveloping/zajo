import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminOnlyUser, unauthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminOnlyUser())) return unauthorized();
  const { count, error } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("subscribed", true);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ count: count ?? 0 });
}

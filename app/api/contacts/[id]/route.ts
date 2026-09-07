import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminOnlyUser, unauthorized } from "@/lib/adminAuth";
import { logConsent } from "@/lib/consent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminOnlyUser();
  if (!admin) return unauthorized();
  let body: { subscribed?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }
  const update: Record<string, unknown> = {};
  if (typeof body.subscribed === "boolean") update.subscribed = body.subscribed;
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nič na update" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .update(update)
    .eq("id", params.id)
    .select("email,name")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Record the manual change in the consent audit log (who + when + which way).
  if (typeof body.subscribed === "boolean" && data?.email) {
    await logConsent({
      email: data.email,
      name: data.name,
      action: body.subscribed ? "opt_in" : "opt_out",
      source: "manual_admin",
      actor: admin.email,
    });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!(await getAdminOnlyUser())) return unauthorized();
  const { error } = await supabaseAdmin.from("contacts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

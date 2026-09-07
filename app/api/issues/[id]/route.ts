import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminOnlyUser, unauthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Full content of one sent newsletter: subject, rendered HTML, and the snapshot
// of recipients captured at send time. Admin only.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!(await getAdminOnlyUser())) return unauthorized();
  const { data, error } = await supabaseAdmin
    .from("issues")
    .select("id,subject,html_content,sent_at,recipient_count,recipients")
    .eq("id", params.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Nenájdené" }, { status: 404 });
  return NextResponse.json(data);
}

import { supabaseAdmin } from "@/lib/supabase";
import { getAdminUser, unauthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(v: unknown): string {
  const s = v == null ? "" : String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  if (!(await getAdminUser())) return unauthorized();
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return new Response(error.message, { status: 500 });

  const header = ["name", "email", "phone", "source", "subscribed", "created_at"];
  const rows = (data ?? []).map((c) =>
    header.map((h) => csvCell((c as Record<string, unknown>)[h])).join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="zajo-kontakty-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

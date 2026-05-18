import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getStats() {
  const [
    { count: total },
    { count: subscribed },
    { count: issuesCount },
    { data: recent },
    { count: leadsPredajNew },
    { count: leadsOcenenieNew },
    { count: leadsCallyNew },
  ] = await Promise.all([
    supabaseAdmin.from("contacts").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("contacts").select("*", { count: "exact", head: true }).eq("subscribed", true),
    supabaseAdmin.from("issues").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("issues")
      .select("id,subject,sent_at,recipient_count")
      .order("sent_at", { ascending: false })
      .limit(3),
    supabaseAdmin.from("leads_predaj").select("id", { count: "exact", head: true }).eq("status", "novy"),
    supabaseAdmin.from("leads_ocenenie").select("id", { count: "exact", head: true }).eq("status", "novy"),
    supabaseAdmin.from("leads_cally").select("id", { count: "exact", head: true }).eq("status", "novy"),
  ]);

  return {
    total: total ?? 0,
    subscribed: subscribed ?? 0,
    issuesCount: issuesCount ?? 0,
    recent: recent ?? [],
    newLeads: (leadsPredajNew ?? 0) + (leadsOcenenieNew ?? 0) + (leadsCallyNew ?? 0),
  };
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-panel border border-border rounded-lg p-6">
      <div className="text-muted text-xs uppercase tracking-widest font-semibold">{label}</div>
      <div className="text-4xl font-bold mt-3 text-white">{value}</div>
    </div>
  );
}

export default async function AdminPage() {
  let stats = { total: 0, subscribed: 0, issuesCount: 0, recent: [] as Array<{ id: string; subject: string; sent_at: string; recipient_count: number }>, newLeads: 0 };
  let dbError: string | null = null;
  try {
    stats = await getStats();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Neznáma chyba DB";
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-12">
        <div>
          <div className="text-accent text-xs uppercase tracking-widest font-bold">ZAJO Reality</div>
          <h1 className="text-3xl font-bold mt-2">Newsletter Admin</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/crm"
            className="px-5 py-2.5 rounded-md border border-border text-white hover:border-accent transition text-sm font-semibold"
          >
            CRM Leady
          </Link>
          <Link
            href="/admin/kontakty"
            className="px-5 py-2.5 rounded-md border border-border text-white hover:border-accent transition text-sm font-semibold"
          >
            Správa kontaktov
          </Link>
          <Link
            href="/admin/generovat"
            className="px-5 py-2.5 rounded-md bg-accent hover:bg-accentHover transition text-white text-sm font-semibold"
          >
            Generovať newsletter →
          </Link>
        </div>
      </header>

      {dbError && (
        <div className="bg-red-950/40 border border-red-900 text-red-300 rounded-lg p-4 mb-8 text-sm">
          Chyba pripojenia k databáze: {dbError}. Skontroluj env premenné.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <StatCard label="Kontakty celkovo" value={stats.total} />
        <StatCard label="Prihlásení" value={stats.subscribed} />
        <StatCard label="Odoslané newslettre" value={stats.issuesCount} />
        <Link href="/admin/crm" className="block">
          <div className="bg-panel border border-border rounded-lg p-6 hover:border-accent transition h-full">
            <div className="text-muted text-xs uppercase tracking-widest font-semibold">Nové CRM leady</div>
            <div className="text-4xl font-bold mt-3 text-white">{stats.newLeads}</div>
            <div className="text-accent text-xs mt-2 font-semibold">→ Otvoriť CRM</div>
          </div>
        </Link>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-4">Posledné newslettre</h2>
        <div className="bg-panel border border-border rounded-lg overflow-hidden">
          {stats.recent.length === 0 ? (
            <div className="p-8 text-center text-muted text-sm">Zatiaľ žiadne odoslané newslettre.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted text-xs uppercase tracking-widest border-b border-border">
                  <th className="px-5 py-3 font-semibold">Predmet</th>
                  <th className="px-5 py-3 font-semibold">Dátum</th>
                  <th className="px-5 py-3 font-semibold text-right">Príjemcovia</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((i) => (
                  <tr key={i.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 text-white">{i.subject}</td>
                    <td className="px-5 py-4 text-muted">
                      {new Date(i.sent_at).toLocaleString("sk-SK")}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold">{i.recipient_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

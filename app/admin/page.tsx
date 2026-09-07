import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/adminAuth";
import { LogoutButton } from "./components/LogoutButton";
import { NewLeadsCard } from "./components/NewLeadsCard";
import { MaklerLinkCard } from "./components/MaklerLinkCard";
import { SentNewsletters } from "./components/SentNewsletters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getStats() {
  const [
    { count: total },
    { count: subscribed },
    { count: issuesCount },
    { data: recent },
  ] = await Promise.all([
    supabaseAdmin.from("contacts").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("contacts").select("*", { count: "exact", head: true }).eq("subscribed", true),
    supabaseAdmin.from("issues").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("issues").select("id,subject,sent_at,recipient_count").order("sent_at", { ascending: false }).limit(5),
  ]);

  return {
    total: total ?? 0,
    subscribed: subscribed ?? 0,
    issuesCount: issuesCount ?? 0,
    recent: recent ?? [],
  };
}

export default async function AdminPage() {
  const session = await getSessionUser();
  const isAdmin = session?.role === "admin";

  // A maklér gets a leads-first dashboard with their personal link — no
  // subscriber / newsletter data (admin-only).
  if (session && !isAdmin) {
    let slug: string | null = null;
    if (session.maklerId) {
      const { data } = await supabaseAdmin.from("makleri").select("slug").eq("id", session.maklerId).maybeSingle();
      slug = (data as { slug: string } | null)?.slug ?? null;
    }
    return (
      <div className="min-h-screen" style={{ background: "#f6f7f9" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-5 border-b border-[#e5e7eb]">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-v3.png" alt="Zajo Reality" style={{ height: 42, width: "auto", display: "block" }} />
              <div style={{ width: 1, height: 32, background: "#e5e7eb" }} />
              <h1 style={{ fontSize: 16, fontWeight: 700, color: "#6b7280", margin: 0 }}>Maklér</h1>
            </div>
            <nav className="flex flex-wrap gap-2 items-center">
              <NavLink href="/admin/crm" icon="👥">Moje leady</NavLink>
              <LogoutButton />
            </nav>
          </header>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Vitajte{session.name ? `, ${session.name}` : ""}!</h2>
            <p className="text-muted text-sm mt-1">Tu sú vaše leady a váš kontaktný link.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Link href="/admin/crm" className="block">
              <NewLeadsCard />
            </Link>
            {slug ? (
              <MaklerLinkCard slug={slug} />
            ) : (
              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 14, padding: 18, fontSize: 13, color: "#9a3412" }}>
                Váš kontaktný link ešte nie je nastavený. Požiadajte administrátora o doplnenie.
              </div>
            )}
          </div>

          <Link
            href="/admin/crm"
            className="block text-center py-4 rounded-xl text-white font-bold"
            style={{ background: "linear-gradient(135deg, #E8711A, #F5923D)", boxShadow: "0 4px 16px rgba(232,113,26,0.3)" }}
          >
            Otvoriť CRM →
          </Link>
        </div>
      </div>
    );
  }

  // Admin dashboard.
  let stats = { total: 0, subscribed: 0, issuesCount: 0, recent: [] as Array<{ id: string; subject: string; sent_at: string; recipient_count: number }> };
  let dbError: string | null = null;
  try {
    stats = await getStats();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Neznáma chyba DB";
  }

  return (
    <div className="min-h-screen" style={{ background: '#f6f7f9' }}>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12 pb-5 sm:pb-7 border-b border-[#e5e7eb]">
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-v3.png"
              alt="Zajo Reality"
              style={{ height: '42px', width: 'auto', display: 'block' }}
            />
            <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
            <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#6b7280', margin: 0, letterSpacing: '-0.01em' }}>
              Admin panel
            </h1>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-2 items-center">
            <NavLink href="/admin/crm" icon="👥">CRM</NavLink>
            <NavLink href="/admin/makleri" icon="🧑‍💼">Tím</NavLink>
            <NavLink href="/admin/kontakty" icon="📋">Kontakty</NavLink>
            <NavLink href="/admin/newsletter-ponuky" icon="🏠">Ponuky</NavLink>
            <NavLink href="/admin/funnel" icon="📊">Návštevnosť</NavLink>
            <Link
              href="/admin/generovat"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #E8711A, #F5923D)',
                color: '#fff', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '-0.01em',
                boxShadow: '0 4px 16px rgba(232,113,26,0.3)',
                transition: 'opacity 150ms',
              }}
            >
              <span>✨</span> Newsletter
            </Link>
            <LogoutButton />
          </nav>
        </header>

        {dbError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '10px', padding: '14px 18px', marginBottom: '28px', fontSize: '14px' }}>
            Chyba DB: {dbError}
          </div>
        )}

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5 mb-8 sm:mb-10">
          <StatCard
            label="Kontakty celkovo"
            value={stats.total}
            icon="👤"
            color="rgba(59,130,246,0.08)"
            borderColor="rgba(59,130,246,0.25)"
            valueColor="#2563eb"
          />
          <StatCard
            label="Prihlásení"
            value={stats.subscribed}
            icon="✅"
            color="rgba(34,197,94,0.08)"
            borderColor="rgba(34,197,94,0.22)"
            valueColor="#16a34a"
          />
          <StatCard
            label="Odoslané newslettre"
            value={stats.issuesCount}
            icon="📨"
            color="rgba(168,85,247,0.08)"
            borderColor="rgba(168,85,247,0.22)"
            valueColor="#9333ea"
          />
          <NewLeadsCard />
        </div>

        {/* ── Recent newsletters ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>Posledné newslettre</h2>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '14px', overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <SentNewsletters issues={stats.recent} />
          </div>
        </section>

      </div>
    </div>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '8px 14px', borderRadius: '8px',
      border: '1px solid #e5e7eb',
      color: '#4b5563', fontSize: '13px', fontWeight: 600,
      textDecoration: 'none', transition: 'border-color 150ms, color 150ms',
    }}>
      <span style={{ fontSize: '14px' }}>{icon}</span>
      {children}
    </Link>
  );
}

function StatCard({ label, value, icon, color, borderColor, valueColor }: {
  label: string; value: number; icon: string;
  color: string; borderColor: string; valueColor: string;
}) {
  return (
    <div style={{
      background: color, border: `1px solid ${borderColor}`,
      borderRadius: '14px',
    }} className="px-4 py-4 sm:px-6 sm:py-[22px]">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280' }}>{label}</span>
        <span style={{ fontSize: '18px' }}>{icon}</span>
      </div>
      <div style={{ fontWeight: 800, color: valueColor, letterSpacing: '-0.04em', lineHeight: 1 }} className="text-[28px] sm:text-[40px]">
        {value}
      </div>
    </div>
  );
}

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { LogoutButton } from "./components/LogoutButton";
import { NewLeadsCard } from "./components/NewLeadsCard";

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
  let stats = { total: 0, subscribed: 0, issuesCount: 0, recent: [] as Array<{ id: string; subject: string; sent_at: string; recipient_count: number }> };
  let dbError: string | null = null;
  try {
    stats = await getStats();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Neznáma chyba DB";
  }

  return (
    <div className="min-h-screen" style={{ background: '#080706' }}>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 40% at 50% -10%, rgba(200,119,58,0.13) 0%, transparent 70%)',
      }} />
      {/* Subtle grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.018,
        backgroundImage: 'repeating-linear-gradient(90deg,#c8773a 0,#c8773a 1px,transparent 0,transparent 50%), repeating-linear-gradient(180deg,#c8773a 0,#c8773a 1px,transparent 0,transparent 50%)',
        backgroundSize: '48px 48px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '48px',
          paddingBottom: '28px',
          borderBottom: '1px solid rgba(200,119,58,0.15)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-v3.png"
              alt="Zajo Reality"
              style={{ height: '42px', width: 'auto', display: 'block' }}
            />
            <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />
            <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#8a8279', margin: 0, letterSpacing: '-0.01em' }}>
              Admin panel
            </h1>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <NavLink href="/admin/crm" icon="👥">CRM</NavLink>
            <NavLink href="/admin/kontakty" icon="📋">Kontakty</NavLink>
            <Link
              href="/admin/generovat"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #c8773a, #d68a4f)',
                color: '#fff', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '-0.01em',
                boxShadow: '0 4px 16px rgba(200,119,58,0.3)',
                transition: 'opacity 150ms',
              }}
            >
              <span>✨</span> Newsletter
            </Link>
            <LogoutButton />
          </nav>
        </header>

        {dbError && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '10px', padding: '14px 18px', marginBottom: '28px', fontSize: '14px' }}>
            Chyba DB: {dbError}
          </div>
        )}

        {/* ── Stat cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '40px' }}>
          <StatCard
            label="Kontakty celkovo"
            value={stats.total}
            icon="👤"
            color="rgba(96,165,250,0.12)"
            borderColor="rgba(96,165,250,0.2)"
            valueColor="#93c5fd"
          />
          <StatCard
            label="Prihlásení"
            value={stats.subscribed}
            icon="✅"
            color="rgba(74,222,128,0.1)"
            borderColor="rgba(74,222,128,0.18)"
            valueColor="#86efac"
          />
          <StatCard
            label="Odoslané newslettre"
            value={stats.issuesCount}
            icon="📨"
            color="rgba(167,139,250,0.1)"
            borderColor="rgba(167,139,250,0.18)"
            valueColor="#c4b5fd"
          />
          <NewLeadsCard />
        </div>

        {/* ── Recent newsletters ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#f5f0ea', margin: 0 }}>Posledné newslettre</h2>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div style={{
            background: 'rgba(20,18,16,0.7)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px', overflow: 'hidden',
            backdropFilter: 'blur(8px)',
          }}>
            {stats.recent.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                Zatiaľ žiadne odoslané newslettre.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>Predmet</th>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>Dátum</th>
                    <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>Príjemcovia</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((i, idx) => (
                    <tr key={i.id} style={{
                      borderBottom: idx < stats.recent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      transition: 'background 150ms',
                    }}>
                      <td style={{ padding: '14px 20px', color: '#e8e0d8', fontWeight: 500 }}>{i.subject}</td>
                      <td style={{ padding: '14px 20px', color: '#666', fontFamily: 'monospace', fontSize: '13px' }}>
                        {new Date(i.sent_at).toLocaleString("sk-SK")}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-block', padding: '3px 10px',
                          background: 'rgba(200,119,58,0.12)', border: '1px solid rgba(200,119,58,0.2)',
                          borderRadius: '20px', color: '#c8773a', fontSize: '12px', fontWeight: 700,
                        }}>
                          {i.recipient_count}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#c8bfb4', fontSize: '13px', fontWeight: 600,
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
      borderRadius: '14px', padding: '22px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8279' }}>{label}</span>
        <span style={{ fontSize: '20px' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '40px', fontWeight: 800, color: valueColor, letterSpacing: '-0.04em', lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Listing, NewsletterContent } from "@/types";

type Step = 1 | 2 | 3;

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: "Inzeráty" },
  { id: 2, label: "Generovať" },
  { id: 3, label: "Odoslať" },
];

const BADGE_OPTIONS = ["—", "NOVÉ", "ZNÍŽENÁ CENA", "REZERVOVANÉ"] as const;

function StepNav({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {STEPS.map((s, i) => {
        const active = s.id === current;
        const done = s.id < current;
        return (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                active
                  ? "bg-accent text-white"
                  : done
                  ? "bg-accent/30 text-accent border border-accent/50"
                  : "bg-panel text-muted border border-border"
              }`}
            >
              {done ? "✓" : s.id}
            </div>
            <span className={`text-sm font-semibold ${active ? "text-white" : "text-muted"}`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && <div className="w-10 h-px bg-border ml-2" />}
          </div>
        );
      })}
    </div>
  );
}

export default function GenerovatPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  const [listings, setListings] = useState<Listing[]>([]);
  const [scrapeSource, setScrapeSource] = useState<"live" | "mock" | null>(null);
  const [scraping, setScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState<NewsletterContent | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleScrape() {
    setScraping(true);
    setScrapeError(null);
    try {
      const res = await fetch("/api/scrape");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scrape zlyhal");
      setListings(data.listings);
      setScrapeSource(data.source);
    } catch (e) {
      setScrapeError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setScraping(false);
    }
  }

  async function handleGenerate() {
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listings }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generovanie zlyhalo");
      setSubject(data.subject || "");
      setContent(data.content);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSend() {
    if (!content) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Odoslanie zlyhalo");
      if (data.failures?.length) {
        throw new Error(`Odoslané ${data.sent}/${data.total}. Chyby: ${data.failures.join(" | ")}`);
      }
      alert(`Odoslané ${data.sent} ľuďom!`);
      router.push("/admin");
    } catch (e) {
      setSendError(e instanceof Error ? e.message : "Chyba");
      setSending(false);
    }
  }

  const previewHtml = useMemo(() => {
    if (!content) return "";
    return buildPreviewHtml(content);
  }, [content]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/admin" className="text-muted hover:text-white text-sm">← Späť na dashboard</Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">Generovať newsletter</div>
      </div>

      <StepNav current={step} />

      {/* STEP 1 */}
      {step === 1 && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Krok 1 — Načítať inzeráty</h2>
          <p className="text-muted text-sm mb-6">Zo stránky zajoreality.sk vytiahneme aktuálne ponuky.</p>

          {listings.length === 0 ? (
            <div className="bg-panel border border-border rounded-lg p-10 text-center">
              <button
                onClick={handleScrape}
                disabled={scraping}
                className="px-6 py-3 rounded-md bg-accent hover:bg-accentHover disabled:opacity-50 transition text-white font-semibold"
              >
                {scraping ? "Načítavam..." : "Načítať inzeráty zo zajoreality.sk"}
              </button>
              {scrapeError && (
                <div className="mt-4 text-red-400 text-sm">
                  {scrapeError}
                  <button onClick={handleScrape} className="ml-3 underline hover:text-red-300">Skúsiť znova</button>
                </div>
              )}
            </div>
          ) : (
            <>
              {scrapeSource === "mock" && (
                <div className="bg-yellow-950/40 border border-yellow-900 text-yellow-300 rounded-md p-3 mb-4 text-sm">
                  Scraping zlyhal — používame ukážkové dáta. Môžeš pokračovať.
                </div>
              )}
              <div className="grid gap-3 mb-6">
                {listings.map((l, i) => (
                  <div key={i} className="bg-panel border border-border rounded-lg p-4">
                    <div className="flex justify-between gap-4">
                      <div>
                        <div className="font-bold text-white">{l.title}</div>
                        <div className="text-muted text-xs mt-1">{l.location} · {l.area}</div>
                      </div>
                      <div className="text-accent font-semibold whitespace-nowrap">{l.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={handleScrape} className="px-4 py-2 rounded-md border border-border hover:border-accent transition text-sm">Znova načítať</button>
                <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-md bg-accent hover:bg-accentHover transition font-semibold">Pokračovať →</button>
              </div>
            </>
          )}
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Krok 2 — Vygenerovať obsah</h2>
          <p className="text-muted text-sm mb-6">Claude napíše newsletter. Potom môžeš každý kus upraviť.</p>

          {!content ? (
            <div className="bg-panel border border-border rounded-lg p-10 text-center">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-6 py-3 rounded-md bg-accent hover:bg-accentHover disabled:opacity-50 transition text-white font-semibold"
              >
                {generating ? "Claude píše newsletter..." : "Generovať obsah s Claude"}
              </button>
              {generating && (
                <div className="mt-4 inline-flex items-center gap-2 text-muted text-sm">
                  <span className="inline-block w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  Môže to trvať 10–30 sekúnd
                </div>
              )}
              {genError && <div className="mt-4 text-red-400 text-sm">{genError}</div>}
            </div>
          ) : (
            <div className="space-y-5">
              <Field label="Predmet emailu" value={subject} onChange={setSubject} />
              <Field label="Úvodný odsek" value={content.intro} onChange={(v) => setContent({ ...content, intro: v })} textarea />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">Vydanie</label>
                  <select value={content.edition} onChange={(e) => setContent({ ...content, edition: Number(e.target.value) as 1 | 2 })}>
                    <option value={1}>1. vydanie (1–14)</option>
                    <option value={2}>2. vydanie (15–31)</option>
                  </select>
                </div>
                <Field label="Mesiac a rok" value={content.month} onChange={(v) => setContent({ ...content, month: v })} />
              </div>

              <div className="bg-panel border border-border rounded-lg p-4 space-y-3">
                <div className="text-xs uppercase tracking-widest text-muted font-semibold">Tip mesiaca</div>
                <div>
                  <label className="text-xs text-muted block mb-1">Typ</label>
                  <select
                    value={content.tip.type}
                    onChange={(e) => setContent({ ...content, tip: { ...content.tip, type: e.target.value as "rada" | "novinky" | "trh" } })}
                  >
                    <option value="rada">Realitná rada</option>
                    <option value="novinky">Novinky z trhu</option>
                    <option value="trh">Pohľad na trh</option>
                  </select>
                </div>
                <Field label="Nadpis tipu" value={content.tip.title} onChange={(v) => setContent({ ...content, tip: { ...content.tip, title: v } })} />
                <Field label="Text tipu (môže obsahovať <strong> a <br/>)" value={content.tip.body} onChange={(v) => setContent({ ...content, tip: { ...content.tip, body: v } })} textarea />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-3">Nehnuteľnosti</div>
                <div className="space-y-3">
                  {content.properties.map((p, i) => (
                    <div key={i} className="bg-panel border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold text-sm text-white">{p.title}</div>
                          <div className="text-accent text-sm font-semibold">{p.price}</div>
                          <div className="text-muted text-xs mt-0.5">{p.location}{p.area ? ` · ${p.area}` : ""}</div>
                        </div>
                        <div className="shrink-0">
                          <label className="text-xs text-muted block mb-1">Badge</label>
                          <select
                            value={p.badge || "—"}
                            onChange={(e) => {
                              const next = [...content.properties];
                              next[i] = { ...next[i], badge: e.target.value === "—" ? null : e.target.value as typeof p.badge };
                              setContent({ ...content, properties: next });
                            }}
                            className="text-xs w-36"
                          >
                            {BADGE_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Field label="CTA text" value={content.ctaText} onChange={(v) => setContent({ ...content, ctaText: v })} />

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setShowPreview((v) => !v)}
                  className="px-4 py-2 rounded-md border border-border hover:border-accent transition text-sm"
                >
                  {showPreview ? "Skryť náhľad" : "Náhľad"}
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="px-4 py-2 rounded-md border border-border hover:border-accent transition text-sm disabled:opacity-50"
                  >
                    {generating ? "..." : "Generovať znova"}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-md bg-accent hover:bg-accentHover transition font-semibold"
                  >
                    Pokračovať →
                  </button>
                </div>
              </div>

              {showPreview && (
                <iframe srcDoc={previewHtml} className="w-full h-[800px] rounded-lg border border-border mt-4" title="Náhľad" />
              )}
            </div>
          )}

          <div className="mt-6">
            <button onClick={() => setStep(1)} className="text-muted hover:text-white text-sm">← Späť na inzeráty</button>
          </div>
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && content && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Krok 3 — Odoslať</h2>
          <p className="text-muted text-sm mb-6">Skontroluj náhľad a odošli.</p>

          <div className="bg-panel border border-border rounded-lg p-4 mb-4">
            <div className="text-muted text-xs uppercase tracking-widest font-semibold mb-1">Predmet</div>
            <div className="text-white font-semibold">{subject || "(bez predmetu)"}</div>
          </div>

          <iframe srcDoc={previewHtml} className="w-full h-[800px] rounded-lg border border-border mb-6" title="Finálny náhľad" />

          <RecipientCount />

          {sendError && <div className="mt-4 text-red-400 text-sm">{sendError}</div>}

          <div className="flex justify-between items-center mt-6">
            <button onClick={() => setStep(2)} className="text-muted hover:text-white text-sm">← Späť na úpravy</button>
            <button
              onClick={handleSend}
              disabled={sending}
              className="px-8 py-3.5 rounded-md bg-accent hover:bg-accentHover disabled:opacity-50 transition text-white font-bold text-lg"
            >
              {sending ? "Odosielam..." : "Odoslať newsletter"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">{label}</label>
      {textarea
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} />}
    </div>
  );
}

function RecipientCount() {
  const [n, setN] = useState<number | null>(null);
  if (n === null) {
    fetch("/api/contacts/count")
      .then((r) => (r.ok ? r.json() : { count: 0 }))
      .then((d) => setN(d.count ?? 0))
      .catch(() => setN(0));
  }
  return (
    <div className="bg-panel border border-border rounded-lg p-4 text-center">
      <span className="text-muted">Odošle sa </span>
      <span className="text-white font-bold text-lg">{n ?? "..."}</span>
      <span className="text-muted"> odberateľom</span>
    </div>
  );
}

function buildPreviewHtml(c: NewsletterContent): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/<(?!\/?(?:strong|br)\b)[^>]*>/gi, "");

  const PLACEHOLDERS = [
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=360&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=360&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=360&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=360&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=360&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=360&fit=crop",
  ];

  const TIP_ICONS: Record<string, string> = { rada: "💡", novinky: "📰", trh: "📊" };
  const TIP_LABELS: Record<string, string> = { rada: "REALITNÁ RADA", novinky: "NOVINKY Z TRHU", trh: "POHĽAD NA TRH" };

  const card = (p: NewsletterContent["properties"][0], idx: number) => {
    const img = p.imageUrl || PLACEHOLDERS[idx % PLACEHOLDERS.length];
    const badge = p.badge
      ? `<div style="background:${p.badge === "ZNÍŽENÁ CENA" ? "#1C1917" : "#E0882C"};height:28px;box-sizing:border-box;padding:0 18px;display:flex;align-items:center;"><span style="font-family:Arial;font-size:9px;font-weight:800;color:#FFF;letter-spacing:2.5px;text-transform:uppercase;">${esc(p.badge)}</span></div>`
      : `<div style="height:28px;"></div>`;
    const meta = [p.area, p.rooms].filter(Boolean).join(" · ");
    return `<div style="background:#FFF;border-radius:8px;border:1px solid #E3E1DC;overflow:hidden;width:274px;display:inline-block;vertical-align:top;">
      <img src="${esc(img)}" width="274" height="180" style="display:block;width:274px;height:180px;object-fit:cover;"/>
      ${badge}
      <div style="padding:16px;">
        <div style="font-family:Arial;font-size:14px;font-weight:700;color:#1C1917;margin-bottom:6px;">${esc(p.title)}</div>
        <div style="font-family:Arial;font-size:18px;font-weight:800;color:#E0882C;margin-bottom:6px;">${esc(p.price)}</div>
        ${meta ? `<div style="font-family:Arial;font-size:11px;color:#888;margin-bottom:4px;">${esc(meta)}</div>` : ""}
        <div style="font-family:Arial;font-size:11px;color:#888;margin-bottom:12px;">📍 ${esc(p.location)}</div>
        <a href="${esc(p.url)}" style="background:#E0882C;color:#FFF;font-family:Arial;font-size:9px;font-weight:800;padding:8px 16px;text-decoration:none;border-radius:3px;text-transform:uppercase;letter-spacing:1.5px;">Zobraziť →</a>
      </div>
    </div>`;
  };

  const rows: string[] = [];
  for (let i = 0; i < c.properties.length; i += 2) {
    rows.push(`<div style="padding:0 20px 14px;"><div style="display:flex;gap:12px;">${card(c.properties[i], i)}${c.properties[i + 1] ? card(c.properties[i + 1], i + 1) : ""}</div></div>`);
  }

  return `<!DOCTYPE html><html><body style="margin:0;padding:40px 0;background:#ECEAE5;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#FFF;border-radius:12px;box-shadow:0 4px 32px rgba(0,0,0,0.1);overflow:hidden;">
    <div style="background:linear-gradient(90deg,#E0882C,#C97520);height:4px;"></div>
    <div style="padding:22px 32px 0;border-bottom:1px solid #E3E1DC;display:flex;justify-content:space-between;align-items:center;padding-bottom:20px;">
      <span style="font-size:20px;font-weight:800;color:#1C1917;font-family:Georgia,serif;">ZAJO Reality</span>
      <span style="font-size:11px;color:#888;">${c.edition}. vydanie · ${esc(c.month)}</span>
    </div>
    <div style="padding:44px 32px;">
      <p style="font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 18px;">■ VÝBER DOPORUČENÝCH NEHNUTEĽNOSTÍ</p>
      <h1 style="font-size:34px;font-weight:800;color:#1C1917;margin:0 0 8px;">${esc(c.greeting)},</h1>
      <div style="background:#B8860B;height:2px;width:48px;margin-bottom:20px;"></div>
      <p style="font-size:15px;color:#555;line-height:1.8;margin:0;">${safeHtml(c.intro)}</p>
    </div>
    <div style="padding:32px;border-top:1px solid #E3E1DC;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
        <span style="font-size:18px;">${TIP_ICONS[c.tip.type] || "💡"}</span>
        <span style="font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;border-bottom:2px solid #E0882C;padding-bottom:2px;">${TIP_LABELS[c.tip.type] || "TIP"}</span>
      </div>
      <h2 style="font-size:20px;font-weight:800;color:#1C1917;margin:0 0 14px;">${esc(c.tip.title)}</h2>
      <div style="font-size:14px;color:#555;line-height:1.85;">${safeHtml(c.tip.body)}</div>
    </div>
    <div style="background:#F7F5F1;padding:28px 32px 16px;border-top:1px solid #E3E1DC;">
      <p style="font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 4px;">VÝBER NEHNUTEĽNOSTÍ</p>
      <h2 style="font-size:20px;font-weight:800;color:#1C1917;margin:0 0 12px;">Najnovšie ponuky v Trenčíne</h2>
    </div>
    <div style="background:#F7F5F1;padding-bottom:12px;">${rows.join("")}</div>
    <div style="background:linear-gradient(135deg,#E0882C,#C97520);padding:40px 32px;text-align:center;">
      <h2 style="font-size:22px;font-weight:800;color:#FFF;margin:0 0 10px;">${esc(c.ctaText)}</h2>
      <p style="font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 24px;line-height:1.65;">Máme stovky overených ponúk v Trenčíne a okolí.</p>
      <a href="${esc(c.ctaUrl)}" style="background:#FFF;color:#C97520;font-size:11px;font-weight:800;padding:14px 36px;text-decoration:none;border-radius:3px;text-transform:uppercase;letter-spacing:1.5px;">Zobraziť všetky ponuky</a>
    </div>
    <div style="padding:24px 32px;text-align:center;border-top:1px solid #E3E1DC;">
      <p style="font-size:12px;color:#888;margin:0 0 4px;">ZAJO Reality s.r.o. · Trenčín, Slovensko</p>
      <p style="font-size:11px;color:#BBB;margin:0;">Náhľad newslettera</p>
    </div>
  </div>
</body></html>`;
}

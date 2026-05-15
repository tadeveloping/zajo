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
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scraping, setScraping] = useState(false);

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
      setContent(data);
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
        body: JSON.stringify({ subject: content.subject, content }),
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
        <Link href="/admin" className="text-muted hover:text-white text-sm">
          ← Späť na dashboard
        </Link>
        <div className="text-accent text-xs uppercase tracking-widest font-bold">Generovať newsletter</div>
      </div>

      <StepNav current={step} />

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
                  <button
                    onClick={handleScrape}
                    className="ml-3 underline hover:text-red-300"
                  >
                    Skúsiť znova
                  </button>
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
                        <div className="text-muted text-xs mt-1">
                          {l.location} · {l.area}
                        </div>
                      </div>
                      <div className="text-accent font-semibold whitespace-nowrap">{l.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleScrape}
                  className="px-4 py-2 rounded-md border border-border hover:border-accent transition text-sm"
                >
                  Znova načítať
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-md bg-accent hover:bg-accentHover transition font-semibold"
                >
                  Pokračovať →
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {step === 2 && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Krok 2 — Vygenerovať obsah</h2>
          <p className="text-muted text-sm mb-6">Claude napíše newsletter na základe inzerátov. Potom môžeš každý kus upraviť.</p>

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
              <Field
                label="Predmet emailu"
                value={content.subject}
                onChange={(v) => setContent({ ...content, subject: v })}
              />
              <Field
                label="Úvodný pozdrav"
                value={content.greeting}
                onChange={(v) => setContent({ ...content, greeting: v })}
                textarea
              />

              <div>
                <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-3">
                  Popisy nehnuteľností
                </div>
                <div className="space-y-3">
                  {content.listings.map((l, i) => (
                    <div key={i} className="bg-panel border border-border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="font-bold text-sm">{l.title}</div>
                        <div className="text-accent text-sm font-semibold">{l.price}</div>
                      </div>
                      <textarea
                        value={l.description}
                        onChange={(e) => {
                          const next = [...content.listings];
                          next[i] = { ...next[i], description: e.target.value };
                          setContent({ ...content, listings: next });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Field
                label="Tip mesiaca"
                value={content.tip}
                onChange={(v) => setContent({ ...content, tip: v })}
                textarea
              />
              <Field
                label="Záverečná výzva"
                value={content.cta}
                onChange={(v) => setContent({ ...content, cta: v })}
                textarea
              />

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
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[700px] bg-white rounded-lg border border-border mt-4"
                  title="Náhľad"
                />
              )}
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => setStep(1)}
              className="text-muted hover:text-white text-sm"
            >
              ← Späť na inzeráty
            </button>
          </div>
        </section>
      )}

      {step === 3 && content && (
        <section>
          <h2 className="text-2xl font-bold mb-2">Krok 3 — Odoslať</h2>
          <p className="text-muted text-sm mb-6">Skontroluj náhľad a odošli.</p>

          <div className="bg-panel border border-border rounded-lg p-4 mb-4">
            <div className="text-muted text-xs uppercase tracking-widest font-semibold mb-1">Predmet</div>
            <div className="text-white font-semibold">{content.subject}</div>
          </div>

          <iframe
            srcDoc={previewHtml}
            className="w-full h-[700px] bg-white rounded-lg border border-border mb-6"
            title="Finálny náhľad"
          />

          <RecipientCount />

          {sendError && <div className="mt-4 text-red-400 text-sm">{sendError}</div>}

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setStep(2)}
              className="text-muted hover:text-white text-sm"
            >
              ← Späť na úpravy
            </button>
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

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function RecipientCount() {
  const [n, setN] = useState<number | null>(null);
  if (n === null) {
    fetch("/api/contacts/count")
      .then((r) => (r.ok ? r.json() : { count: null }))
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
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

  const listings = c.listings
    .map(
      (l) => `
      <div style="margin:0 32px 16px;background:#1e1e1e;border-left:3px solid #c8773a;padding:20px;border-radius:4px;">
        <div style="color:#fff;font-family:Arial,sans-serif;font-size:16px;font-weight:700;margin-bottom:4px;">${esc(l.title)}</div>
        <div style="color:#c8773a;font-family:Arial,sans-serif;font-size:15px;font-weight:600;">${esc(l.price)}</div>
        <div style="color:#888;font-family:Arial,sans-serif;font-size:13px;margin-top:2px;">${esc(l.location)} · ${esc(l.area)}</div>
        <div style="color:#d4d4d4;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;margin-top:8px;">${nl2br(l.description)}</div>
        <div style="margin-top:8px;"><a href="${esc(l.url)}" style="color:#c8773a;font-family:Arial,sans-serif;font-size:13px;">Zobraziť ponuku →</a></div>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0a0a0a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;"><tr><td align="center" style="padding:24px 0;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#141414;">
        <tr><td style="padding:32px;border-bottom:1px solid #2a2a2a;color:#fff;font-family:Georgia,serif;font-size:28px;font-weight:700;">ZAJO Reality</td></tr>
        <tr><td style="padding:32px;color:#d4d4d4;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">${nl2br(c.greeting)}</td></tr>
        <tr><td style="padding:0 32px 16px;color:#fff;font-family:Arial,sans-serif;font-size:18px;font-weight:700;">Aktuálne nehnuteľnosti</td></tr>
        <tr><td>${listings}</td></tr>
        <tr><td><div style="margin:32px;background:#1a1a1a;border-left:3px solid #c8773a;padding:20px;border-radius:4px;">
          <div style="color:#c8773a;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Tip mesiaca</div>
          <div style="color:#d4d4d4;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;font-style:italic;">${nl2br(c.tip)}</div>
        </div></td></tr>
        <tr><td align="center" style="padding:32px;">
          <div style="color:#fff;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;margin-bottom:20px;">${nl2br(c.cta)}</div>
          <a href="mailto:zajac@zajoreality.sk" style="display:inline-block;background:#c8773a;color:#fff;font-family:Arial,sans-serif;font-size:15px;font-weight:600;padding:12px 32px;border-radius:4px;text-decoration:none;">Napíšte Tomášovi</a>
        </td></tr>
        <tr><td style="background:#0f0f0f;padding:24px 32px;color:#555;font-family:Arial,sans-serif;font-size:12px;line-height:1.8;">
          ZAJO Reality | Dolný Šianec 1, 911 48 Trenčín<br>
          zajac@zajoreality.sk | 0907 980 436<br>
          <span style="color:#555;">Odhlásiť odber</span>
        </td></tr>
      </table>
    </td></tr></table></body></html>`;
}

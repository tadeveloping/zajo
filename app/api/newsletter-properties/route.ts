import { NextResponse } from "next/server";
import { load } from "cheerio";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function absUrl(href: string, base: string): string {
  if (!href) return "";
  if (href.startsWith("http")) return href;
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

function toFullRes(url: string): string {
  return url.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
}

function bestFromSrcset(srcset: string): string | undefined {
  const entries = srcset
    .split(",")
    .map((s) => {
      const parts = s.trim().split(/\s+/);
      return { u: parts[0], w: parseInt(parts[1] || "0") };
    })
    .filter(({ u }) => u && !u.startsWith("data:"));
  if (!entries.length) return undefined;
  entries.sort((a, b) => b.w - a.w);
  return entries[0].u;
}

function extractPrice(text: string): string {
  // Match € amounts like "145 000 €" or "145.000€" — no newlines, max 20 chars
  const m = text.match(/\d[\d .]*\s*€/);
  if (m && m[0].length <= 20) return m[0].trim();
  const m2 = text.match(/€\s*\d[\d .]*/);
  if (m2 && m2[0].length <= 20) return m2[0].trim();
  return "";
}

async function scrapeListing(url: string): Promise<{
  title: string;
  price: string;
  location: string;
  area: string | null;
  imageUrl: string | null;
}> {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const html = await res.text();
  const $ = load(html);

  // ── Image ──────────────────────────────────────────────────────────────────
  let imageUrl: string | null = null;

  // 1. OG image — best quality
  const og = $("meta[property='og:image']").attr("content");
  if (og && !og.startsWith("data:")) {
    imageUrl = toFullRes(absUrl(og, url));
  }

  // 2. Largest srcset
  if (!imageUrl) {
    $("img[srcset], img[data-srcset]").each((_, el) => {
      if (imageUrl) return;
      const ss = $(el).attr("srcset") || $(el).attr("data-srcset") || "";
      const candidate = bestFromSrcset(ss);
      if (candidate) imageUrl = toFullRes(absUrl(candidate, url));
    });
  }

  // 3. Gallery images
  if (!imageUrl) {
    const galEl = $(
      ".gallery img, .property-gallery img, .swiper-slide img, .owl-item img, .slider img, [class*='gallery'] img"
    ).first();
    const galSrc =
      galEl.attr("data-src") || galEl.attr("data-lazy-src") || galEl.attr("src");
    if (galSrc && !galSrc.startsWith("data:"))
      imageUrl = toFullRes(absUrl(galSrc, url));
  }

  // 4. Featured image
  if (!imageUrl) {
    const wpImg = $(
      ".wp-post-image, .attachment-full, .size-full, img.featured-image"
    ).first();
    const wpSrc = wpImg.attr("src");
    if (wpSrc && !wpSrc.startsWith("data:")) imageUrl = toFullRes(absUrl(wpSrc, url));
  }

  // 5. Widest img by width attribute
  if (!imageUrl) {
    let widest: { w: number; src: string } | undefined;
    $("img").each((_, el) => {
      const w = parseInt($(el).attr("width") || "0");
      const src = $(el).attr("src") || "";
      if (w > (widest?.w ?? 200) && !src.startsWith("data:") && src.length > 10) {
        widest = { w, src: toFullRes(absUrl(src, url)) };
      }
    });
    if (widest) imageUrl = widest.src;
  }

  // ── Title ──────────────────────────────────────────────────────────────────
  let title =
    $("h1").first().text().trim() ||
    $("meta[property='og:title']").attr("content")?.trim() ||
    $("title").text().trim() ||
    "";

  // ── Price ──────────────────────────────────────────────────────────────────
  let price = "";
  $(".price,.cena,.cost,[class*='price'],[class*='cena'],[class*='amount']")
    .first()
    .each((_, el) => {
      const t = $(el).clone().children().remove().end().text().trim();
      if (t.length < 25) price = t;
      else price = extractPrice($(el).text()) || "";
    });
  if (!price) {
    $("*").each((_, node) => {
      if (price) return false;
      const t = $(node).clone().children().remove().end().text().trim();
      if (/\d[\d .]*€/.test(t) && t.length < 20) price = t;
    });
  }
  if (!price) price = extractPrice($("body").text());

  // ── Location ──────────────────────────────────────────────────────────────
  let location =
    $(
      ".location,.lokalita,.place,.city,[class*='location'],[class*='place'],[class*='address']"
    )
      .first()
      .text()
      .trim() ||
    $("meta[name='geo.placename']").attr("content")?.trim() ||
    "";

  // ── Area ──────────────────────────────────────────────────────────────────
  let area: string | null =
    $(".area,.vymera,.size,[class*='area'],[class*='size'],[class*='vymera']")
      .first()
      .text()
      .trim() || null;

  // Fallback: look for m² in text
  if (!area) {
    $("*").each((_, node) => {
      if (area) return false;
      const t = $(node).clone().children().remove().end().text().trim();
      if (/\d+\s*m[²2]/.test(t) && t.length < 20) area = t;
    });
  }

  return {
    title: title || "Nehnuteľnosť",
    price: price || "Cena na vyžiadanie",
    location: location || "Trenčín a okolie",
    area: area || null,
    imageUrl: imageUrl || null,
  };
}

// ── GET ────────────────────────────────────────────────────────────────────
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("newsletter_properties")
    .select("*")
    .order("position");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ properties: data ?? [] });
}

// ── POST ───────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }

  const { position, url } = body as { position?: number; url?: string };

  if (!position || position < 1 || position > 4) {
    return NextResponse.json(
      { error: "position musí byť 1–4" },
      { status: 400 }
    );
  }
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Chýba URL" }, { status: 400 });
  }

  let scraped: {
    title: string;
    price: string;
    location: string;
    area: string | null;
    imageUrl: string | null;
  };
  try {
    scraped = await scrapeListing(url);
  } catch (e) {
    return NextResponse.json(
      { error: `Chyba pri načítaní stránky: ${e instanceof Error ? e.message : String(e)}` },
      { status: 502 }
    );
  }

  const { error: upsertErr } = await supabaseAdmin
    .from("newsletter_properties")
    .upsert(
      {
        position,
        url,
        title: scraped.title,
        price: scraped.price,
        location: scraped.location,
        area: scraped.area,
        image_url: scraped.imageUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "position" }
    );

  if (upsertErr) {
    return NextResponse.json({ error: upsertErr.message }, { status: 500 });
  }

  return NextResponse.json({
    property: {
      position,
      url,
      ...scraped,
    },
  });
}

// ── DELETE ─────────────────────────────────────────────────────────────────
export async function DELETE(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }

  const { position } = body as { position?: number };

  if (!position || position < 1 || position > 4) {
    return NextResponse.json(
      { error: "position musí byť 1–4" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("newsletter_properties")
    .delete()
    .eq("position", position);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { load } from "cheerio";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";
import type { Listing } from "@/types";
import { getAdminUser, unauthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://www.zajoreality.sk";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const MOCK: Listing[] = [
  { title: "3-izbový byt, Trenčín centrum", price: "145 000 €", location: "Trenčín", area: "72 m²", url: "https://www.zajoreality.sk", imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=360&fit=crop" },
  { title: "Rodinný dom, Trenčianska Turná", price: "189 000 €", location: "Trenčianska Turná", area: "120 m²", url: "https://www.zajoreality.sk", imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=360&fit=crop" },
  { title: "2-izbový byt s balkónom, Trenčín", price: "112 000 €", location: "Trenčín", area: "55 m²", url: "https://www.zajoreality.sk", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=360&fit=crop" },
  { title: "Rodinný dom s garážou, Zlatovce", price: "285 000 €", location: "Trenčín, Zlatovce", area: "140 m²", url: "https://www.zajoreality.sk", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=360&fit=crop" },
  { title: "Garsónka, centrum Trenčína", price: "79 000 €", location: "Trenčín, centrum", area: "32 m²", url: "https://www.zajoreality.sk", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=360&fit=crop" },
  { title: "5-izbový byt s terasou, Sihoť", price: "310 000 €", location: "Trenčín, Sihoť", area: "112 m²", url: "https://www.zajoreality.sk", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=360&fit=crop" },
];

function absUrl(href: string): string {
  if (!href) return "";
  if (href.startsWith("http")) return href;
  return `${BASE}${href.startsWith("/") ? "" : "/"}${href}`;
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

function extractImage($el: Cheerio<AnyNode>, $: CheerioAPI): string | undefined {
  const imgEl = $el.find("img").first();
  const raw =
    imgEl.attr("src") ||
    imgEl.attr("data-src") ||
    imgEl.attr("data-lazy-src") ||
    imgEl.attr("data-original") ||
    imgEl.attr("data-lazy") ||
    imgEl.attr("data-url") ||
    imgEl.attr("data-image") ||
    "";

  // srcset — pick the LARGEST available
  const srcset = imgEl.attr("srcset") || imgEl.attr("data-srcset") || "";
  if (!raw && srcset) {
    const best = bestFromSrcset(srcset);
    if (best) return toFullRes(absUrl(best));
  }
  // If we have a raw src but also srcset, prefer the largest srcset entry
  if (raw && srcset) {
    const best = bestFromSrcset(srcset);
    if (best) return toFullRes(absUrl(best));
  }

  // Also check for background-image in style attribute
  let bgImg: string | undefined;
  if (!raw) {
    $el.find("[style*='background']").each((_, node) => {
      if (bgImg) return;
      const style = $(node).attr("style") || "";
      const m = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (m && m[1] && !m[1].startsWith("data:")) bgImg = absUrl(m[1]);
    });
  }
  if (bgImg) return bgImg;

  if (!raw || raw.startsWith("data:") || raw.length < 10) return undefined;
  return toFullRes(absUrl(raw));
}

function extractPrice($el: Cheerio<AnyNode>, $: CheerioAPI): string {
  let price = $el.find(".price,.cena,.cost,[class*='price'],[class*='cena'],[class*='amount']").first().text().trim();
  if (!price) {
    $el.find("*").each((_, node) => {
      if (price) return false;
      const t = $(node).clone().children().remove().end().text().trim();
      if (/\d[\d\s.]*[€Eur]/.test(t) && t.length < 30) price = t;
    });
  }
  return price;
}

/** Fetch an individual listing page and extract the main property image (full-res) */
async function fetchListingImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return undefined;
    const html = await res.text();
    const $ = load(html);

    // 1. Open Graph image — usually high quality
    const og = $("meta[property='og:image']").attr("content");
    if (og && !og.startsWith("data:")) return toFullRes(absUrl(og));

    // 2. Largest img found via srcset on the page
    let bestSrcset: string | undefined;
    $("img[srcset], img[data-srcset]").each((_, el) => {
      if (bestSrcset) return;
      const ss = $(el).attr("srcset") || $(el).attr("data-srcset") || "";
      const candidate = bestFromSrcset(ss);
      if (candidate) bestSrcset = toFullRes(absUrl(candidate));
    });
    if (bestSrcset) return bestSrcset;

    // 3. Gallery / slider selectors — prefer data-src (lazy) over src (may be tiny placeholder)
    const galEl = $(".gallery img, .property-gallery img, .swiper-slide img, .owl-item img, .slider img, [class*='gallery'] img").first();
    const galSrc = galEl.attr("data-src") || galEl.attr("data-lazy-src") || galEl.attr("src");
    if (galSrc && !galSrc.startsWith("data:")) return toFullRes(absUrl(galSrc));

    // 4. WordPress featured image classes
    const wpImg = $(".wp-post-image, .attachment-full, .size-full, img.featured-image").first();
    const wpSrc = wpImg.attr("src");
    if (wpSrc && !wpSrc.startsWith("data:")) return toFullRes(absUrl(wpSrc));

    // 5. Widest img by width attribute
    let widest: { w: number; src: string } | undefined;
    $("img").each((_, el) => {
      const w = parseInt($(el).attr("width") || "0");
      const src = $(el).attr("src") || "";
      if (w > (widest?.w ?? 200) && !src.startsWith("data:") && src.length > 10) {
        widest = { w, src: toFullRes(absUrl(src)) };
      }
    });
    if (widest) return widest.src;
  } catch {
    // timeout or network error — skip
  }
  return undefined;
}

export async function GET() {
  if (!(await getAdminUser())) return unauthorized();
  try {
    const res = await fetch(`${BASE}/vsetky-reality/`, {
      headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = load(html);

    const partials: Array<Omit<Listing, "imageUrl"> & { imageUrl?: string; _url: string }> = [];
    const seen = new Set<string>();

    const selectors = [
      ".property-item", ".listing-item", ".estate-item", ".ponuka-item",
      "article.property", "article.listing", ".card--property",
      ".properties-list__item", ".reality-item", ".inzerat", ".offer-item",
      "article", ".item",
    ];

    for (const sel of selectors) {
      const els = $(sel).toArray();
      if (els.length < 2) continue;

      for (const el of els) {
        const $el = $(el);

        const title =
          $el.find("h1,h2,h3,h4,.title,.property-title,.name,.heading").first().text().trim() ||
          $el.find("a[href*='reality'],a[href*='nehnutelnost'],a[href*='dom'],a[href*='byt']").first().text().trim();

        const price = extractPrice($el, $);
        const location = $el.find(".location,.lokalita,.place,.city,[class*='location'],[class*='place']").first().text().trim() || "Trenčín a okolie";
        const area = $el.find(".area,.vymera,.size,[class*='area'],[class*='size']").first().text().trim();
        const imageUrl = extractImage($el, $);

        const linkEl = $el.is("a") ? $el : $el.find("a[href]").first();
        const href = linkEl.attr("href") || "";
        if (!title || !href) continue;

        const url = absUrl(href);
        if (seen.has(url) || url === BASE || url === `${BASE}/`) continue;
        seen.add(url);

        partials.push({ title, price: price || "Cena na vyžiadanie", location, area: area || "", url, imageUrl, _url: url });
        if (partials.length >= 8) break;
      }
      if (partials.length >= 3) break;
    }

    if (partials.length === 0) throw new Error("No listings parsed");

    // For listings missing an image, fetch their detail page in parallel
    const withImages = await Promise.all(
      partials.map(async (p) => {
        let imageUrl = p.imageUrl;
        if (!imageUrl) {
          imageUrl = await fetchListingImage(p._url);
        }
        const { _url, ...rest } = p;
        void _url;
        return { ...rest, imageUrl } as Listing;
      })
    );

    return NextResponse.json({ listings: withImages, source: "live" });
  } catch (err) {
    console.error("scrape failed, returning mock:", err);
    return NextResponse.json({ listings: MOCK, source: "mock" });
  }
}

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { Listing } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MOCK: Listing[] = [
  { title: "3-izbový byt, Trenčín centrum", price: "145 000 €", location: "Trenčín", area: "72 m²", url: "https://www.zajoreality.sk" },
  { title: "Rodinný dom, Trenčianska Turná", price: "189 000 €", location: "Trenčianska Turná", area: "120 m²", url: "https://www.zajoreality.sk" },
  { title: "2-izbový byt s balkónom, Trenčín", price: "112 000 €", location: "Trenčín", area: "55 m²", url: "https://www.zajoreality.sk" },
  { title: "Rodinný dom s garážou, Zlatovce", price: "285 000 €", location: "Trenčín, Zlatovce", area: "140 m²", url: "https://www.zajoreality.sk" },
  { title: "Garsónka, centrum Trenčína", price: "79 000 €", location: "Trenčín, centrum", area: "32 m²", url: "https://www.zajoreality.sk" },
  { title: "5-izbový byt s terasou, Sihoť", price: "310 000 €", location: "Trenčín, Sihoť", area: "112 m²", url: "https://www.zajoreality.sk" },
];

export async function GET() {
  try {
    const res = await fetch("https://www.zajoreality.sk/vsetky-reality/", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const listings: Listing[] = [];
    const seen = new Set<string>();

    // Try multiple selectors for zajoreality.sk listing cards
    const selectors = [
      ".property-item", ".listing-item", ".estate-item", ".ponuka-item",
      "article.property", "article.listing", ".card--property",
      ".properties-list__item", ".reality-item",
      // Generic fallback: any article or div with a link and price
      "article", ".item",
    ];

    for (const sel of selectors) {
      const els = $(sel).toArray();
      if (els.length < 2) continue;

      for (const el of els) {
        const $el = $(el);

        const title = $el.find("h1,h2,h3,h4,.title,.property-title,.name,.heading").first().text().trim()
          || $el.find("a[href*='reality']").first().text().trim();

        // Try many price selectors including text patterns
        let price = $el.find(".price,.cena,.cost,[class*='price'],[class*='cena']").first().text().trim();
        if (!price) {
          // Search for text matching price pattern (e.g. "145 000 €" or "145000€")
          $el.find("*").each((_, node) => {
            const t = $(node).clone().children().remove().end().text().trim();
            if (/\d[\d\s]*[€Eur]/.test(t) && !price) price = t;
          });
        }

        const location = $el.find(".location,.lokalita,.place,[class*='location'],[class*='place']").first().text().trim()
          || "Trenčín a okolie";

        const area = $el.find(".area,.vymera,.size,[class*='area'],[class*='size']").first().text().trim();

        const imageEl = $el.find("img").first();
        const rawImg = imageEl.attr("src") || imageEl.attr("data-src") || imageEl.attr("data-lazy-src") || "";
        const imageUrl = rawImg && !rawImg.startsWith("data:") && rawImg.length > 10
          ? (rawImg.startsWith("http") ? rawImg : `https://www.zajoreality.sk${rawImg.startsWith("/") ? "" : "/"}${rawImg}`)
          : undefined;

        const linkEl = $el.is("a") ? $el : $el.find("a[href]").first();
        const href = linkEl.attr("href") || "";

        if (!title || !href) continue;
        const url = href.startsWith("http") ? href : `https://www.zajoreality.sk${href.startsWith("/") ? "" : "/"}${href}`;
        if (seen.has(url)) continue;
        seen.add(url);

        listings.push({
          title,
          price: price || "Cena na vyžiadanie",
          location,
          area: area || "",
          url,
          imageUrl,
        });
        if (listings.length >= 8) break;
      }
      if (listings.length >= 3) break;
    }

    if (listings.length === 0) throw new Error("No listings parsed");
    return NextResponse.json({ listings, source: "live" });
  } catch (err) {
    console.error("scrape failed, returning mock:", err);
    return NextResponse.json({ listings: MOCK, source: "mock" });
  }
}

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { Listing } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MOCK: Listing[] = [
  {
    title: "3-izbový byt, Trenčín centrum",
    price: "145 000 €",
    location: "Trenčín",
    area: "72 m²",
    url: "https://www.zajoreality.sk",
  },
  {
    title: "Rodinný dom, Trenčianska Turná",
    price: "189 000 €",
    location: "Trenčianska Turná",
    area: "120 m²",
    url: "https://www.zajoreality.sk",
  },
  {
    title: "2-izbový byt s balkónom, Trenčín",
    price: "112 000 €",
    location: "Trenčín",
    area: "55 m²",
    url: "https://www.zajoreality.sk",
  },
];

export async function GET() {
  try {
    const res = await fetch("https://www.zajoreality.sk/vsetky-reality/", {
      headers: { "User-Agent": "Mozilla/5.0 (ZajoNewsletterBot)" },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const listings: Listing[] = [];
    const seen = new Set<string>();

    const candidates = $("article, .property, .listing, .estate-item, .ponuka, a.listing-card, .grid-item")
      .toArray()
      .slice(0, 40);

    for (const el of candidates) {
      const $el = $(el);
      const title = $el.find("h1, h2, h3, .title, .property-title").first().text().trim();
      const priceText = $el.find(".price, .cena, [class*='price']").first().text().trim();
      const locText = $el.find(".location, .lokalita, [class*='location']").first().text().trim();
      const areaText = $el.find(".area, .vymera, [class*='area']").first().text().trim();
      const href = $el.is("a") ? $el.attr("href") : $el.find("a").first().attr("href");

      if (!title || !href) continue;
      const url = href.startsWith("http") ? href : `https://www.zajoreality.sk${href.startsWith("/") ? "" : "/"}${href}`;
      if (seen.has(url)) continue;
      seen.add(url);

      listings.push({
        title,
        price: priceText || "Cena na vyžiadanie",
        location: locText || "Trenčín a okolie",
        area: areaText || "",
        url,
      });
      if (listings.length >= 8) break;
    }

    if (listings.length === 0) throw new Error("No listings parsed");

    return NextResponse.json({ listings, source: "live" });
  } catch (err) {
    console.error("scrape failed, returning mock:", err);
    return NextResponse.json({ listings: MOCK, source: "mock" });
  }
}

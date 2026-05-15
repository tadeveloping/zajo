import { NextResponse } from "next/server";
import { anthropic, NEWSLETTER_MODEL } from "@/lib/anthropic";
import { generateSchema, newsletterContentSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `Si expert copywriter pre realitné kancelárie na Slovensku. Píšeš mesačný newsletter pre ZAJO Reality — rodinnú realitnú kanceláriu z Trenčína vedenú Tomášom Zajacom. Tón: priateľský, odborný, dôveryhodný. Nikdy predajný ani agresívny. Vždy po slovensky. Vráť IBA čistý JSON bez markdown.`;

function stripFences(s: string): string {
  return s
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }
  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Chýbajú inzeráty" }, { status: 400 });
  }

  const userPrompt = `Vygeneruj obsah newslettera na základe týchto nehnuteľností:
${JSON.stringify(parsed.data.listings, null, 2)}

Vráť JSON presne v tomto formáte:
{
  "subject": "predmet emailu max 55 znakov",
  "greeting": "úvodný odsek 3-4 vety osobný tón od Tomáša",
  "listings": [
    {
      "title": "názov",
      "price": "cena",
      "location": "lokalita",
      "area": "výmera",
      "description": "2 vety prečo je zaujímavá",
      "url": "url"
    }
  ],
  "tip": "Tip mesiaca 3-4 vety praktická rada",
  "cta": "záverečná výzva 2 vety kontaktujte Tomáša"
}`;

  try {
    const res = await anthropic.messages.create({
      model: NEWSLETTER_MODEL,
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = res.content
      .filter((c): c is { type: "text"; text: string } => c.type === "text")
      .map((c) => c.text)
      .join("");

    const cleaned = stripFences(text);
    const json = JSON.parse(cleaned);
    const valid = newsletterContentSchema.parse(json);
    return NextResponse.json(valid);
  } catch (err) {
    console.error("generate failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generovanie zlyhalo" },
      { status: 500 }
    );
  }
}

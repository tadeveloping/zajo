import { NextResponse } from "next/server";
import { getAnthropic, NEWSLETTER_MODEL } from "@/lib/anthropic";
import { generateSchema, newsletterContentSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SYSTEM = `Si asistent pre realitku ZAJO Reality (Trenčín, Slovensko).
Tvojou úlohou je vyplniť newsletter šablónu na základe dodaných nehnuteľností.

PRAVIDLÁ:
- properties[]: zahrň presne tie nehnuteľnosti čo dostaneš (zachovaj url a imageUrl z dát)
- imageUrl: VŽDY skopíruj presne z poskytnutých dát — nikdy nevymýšľaj vlastný
- tip: vyber relevantný typ (rada/novinky/trh) podľa aktuálnej situácie na trhu
- tip.body smie obsahovať <strong> a <br/> HTML tagy
- greeting: "Dobrý deň"
- month: aktuálny mesiac a rok po slovensky, napr. "Máj 2026"
- edition: 1 ak je dnes 1.–14. v mesiaci, 2 ak je 15.–31.
- ctaUrl: vždy "https://www.zajoreality.sk"
- Všetky texty píš po slovensky, formálne (Vy/Vám/Vás)
- Vráť IBA čistý JSON objekt, žiadny markdown, žiadny iný text`;

function stripFences(s: string): string {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
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

  const today = new Date();
  const day = today.getDate();

  const userPrompt = `Vygeneruj obsah newslettera na základe týchto nehnuteľností:
${JSON.stringify(parsed.data.listings, null, 2)}

Dnešný dátum: ${today.toLocaleDateString("sk-SK")}

Vráť JSON presne v tomto formáte:
{
  "subject": "predmet emailu max 55 znakov",
  "content": {
    "edition": ${day <= 14 ? 1 : 2},
    "greeting": "Dobrý deň",
    "intro": "úvodný odsek 2-3 vety, priateľský tón",
    "tip": {
      "type": "rada|novinky|trh",
      "title": "nadpis tipu max 60 znakov",
      "body": "3-4 vety, môže obsahovať <strong>text</strong> a <br/>"
    },
    "properties": [
      {
        "title": "názov z dát",
        "price": "cena z dát",
        "location": "lokalita z dát",
        "area": "výmera z dát ak existuje",
        "rooms": "počet izieb ak je zrejmý z názvu",
        "imageUrl": "imageUrl z dát — skopíruj presne",
        "url": "url z dát — skopíruj presne",
        "badge": "NOVÉ|ZNÍŽENÁ CENA|REZERVOVANÉ|null"
      }
    ],
    "ctaText": "Hľadáte svoju ideálnu nehnuteľnosť?",
    "ctaUrl": "https://www.zajoreality.sk",
    "month": "mesiac rok po slovensky"
  }
}`;

  try {
    const res = await getAnthropic().messages.create({
      model: NEWSLETTER_MODEL,
      max_tokens: 3000,
      system: SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = res.content
      .filter((c): c is { type: "text"; text: string } => c.type === "text")
      .map((c) => c.text)
      .join("");

    const json = JSON.parse(stripFences(text));
    const subject = typeof json.subject === "string" ? json.subject : "";
    const content = newsletterContentSchema.parse(json.content);
    return NextResponse.json({ subject, content });
  } catch (err) {
    console.error("generate failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generovanie zlyhalo" },
      { status: 500 }
    );
  }
}

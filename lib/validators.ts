import { z } from "zod";

export const subscribeSchema = z.object({
  name: z.string().min(1, "Meno je povinné").max(120),
  email: z.string().email("Neplatný email"),
  phone: z.string().max(40).optional(),
  source: z.string().max(60).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).nullable().optional(),
  source: z.string().max(60).nullable().optional(),
  subscribed: z.boolean().optional(),
});

export const listingSchema = z.object({
  title: z.string(),
  price: z.string(),
  location: z.string(),
  area: z.string(),
  url: z.string(),
  imageUrl: z.string().optional(),
});

export const newsletterPropertySchema = z.object({
  title: z.string(),
  price: z.string(),
  location: z.string(),
  area: z.string().nullable().optional(),
  rooms: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  url: z.string(),
  badge: z.enum(["NOVÉ", "ZNÍŽENÁ CENA", "REZERVOVANÉ"]).nullable().optional(),
});

export const newsletterTipSchema = z.object({
  type: z.enum(["rada", "novinky", "trh"]),
  title: z.string(),
  body: z.string(),
});

export const newsletterContentSchema = z.object({
  edition: z.union([z.literal(1), z.literal(2)]),
  greeting: z.string(),
  intro: z.string(),
  tip: newsletterTipSchema,
  properties: z.array(newsletterPropertySchema),
  ctaText: z.string(),
  ctaUrl: z.string(),
  month: z.string(),
});

export const sendSchema = z.object({
  subject: z.string(),
  content: newsletterContentSchema,
});

export const generateSchema = z.object({
  listings: z.array(listingSchema).min(1),
});

export const leadPredajSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  typ: z.string().optional().nullable(),
  lokalita: z.string().optional().nullable(),
  casovy_ramec: z.string().optional().nullable(),
  sprava: z.string().optional().nullable(),
  source: z.string().optional().default('landing_page'),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  newsletter_opt: z.boolean().optional().default(false),
})

export const leadOceneniaSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  typ_nehnutelnosti: z.string().optional().nullable(),
  lokalita: z.string().optional().nullable(),
  rozloha: z.string().optional().nullable(),
  stav_nehnutelnosti: z.string().optional().nullable(),
  doplnujuce_info: z.string().optional().nullable(),
  source: z.string().optional().default('landing_page'),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  newsletter_opt: z.boolean().optional().default(false),
})

export const leadCallySchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  zaujem: z.string().optional().nullable(),
  nehnutelnost: z.string().optional().nullable(),
  horizont: z.string().optional().nullable(),
  sprava: z.string().optional().nullable(),
  zavolame: z.boolean().optional().default(false),
  score: z.enum(['HOT', 'WARM', 'COLD']).optional().default('COLD'),
  source: z.string().optional().default('cally'),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
})

export const updateLeadStatusSchema = z.object({
  status: z.enum(['novy', 'kontaktovany', 'stretnutie', 'v_procese', 'uzavrety']),
  notes: z.string().optional().nullable(),
})

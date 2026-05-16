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
  area: z.string().optional(),
  rooms: z.string().optional(),
  imageUrl: z.string(),
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

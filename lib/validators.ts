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
  description: z.string().optional(),
});

export const newsletterContentSchema = z.object({
  subject: z.string(),
  greeting: z.string(),
  listings: z.array(
    z.object({
      title: z.string(),
      price: z.string(),
      location: z.string(),
      area: z.string(),
      description: z.string(),
      url: z.string(),
    })
  ),
  tip: z.string(),
  cta: z.string(),
});

export const sendSchema = z.object({
  subject: z.string(),
  content: newsletterContentSchema,
});

export const generateSchema = z.object({
  listings: z.array(listingSchema).min(1),
});

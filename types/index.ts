export interface Listing {
  title: string;
  price: string;
  location: string;
  area: string;
  url: string;
  imageUrl?: string;
}

export interface NewsletterProperty {
  title: string;
  price: string;
  location: string;
  area?: string | null;
  rooms?: string | null;
  imageUrl: string;
  url: string;
  badge?: "NOVÉ" | "ZNÍŽENÁ CENA" | "REZERVOVANÉ" | null;
}

export interface NewsletterTip {
  type: "rada" | "novinky" | "trh";
  title: string;
  body: string;
}

export interface NewsletterContent {
  edition: 1 | 2;
  greeting: string;
  intro: string;
  tip: NewsletterTip;
  properties: NewsletterProperty[];
  ctaText: string;
  ctaUrl: string;
  month: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  subscribed: boolean;
  created_at: string;
}

export interface Issue {
  id: string;
  subject: string;
  html_content: string;
  sent_at: string;
  recipient_count: number;
}

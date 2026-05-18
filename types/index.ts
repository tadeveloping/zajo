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
  imageUrl?: string | null;
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

export type LeadStatus = 'novy' | 'kontaktovany' | 'stretnutie' | 'v_procese' | 'uzavrety'
export type LeadScore = 'HOT' | 'WARM' | 'COLD'

export interface LeadPredaj {
  id: string
  created_at: string
  name: string
  email: string | null
  phone: string | null
  typ: string | null
  lokalita: string | null
  casovy_ramec: string | null
  sprava: string | null
  status: LeadStatus
  notes: string | null
  source: string | null
}

export interface LeadOcenenie {
  id: string
  created_at: string
  name: string
  email: string | null
  phone: string | null
  typ_nehnutelnosti: string | null
  lokalita: string | null
  rozloha: string | null
  stav_nehnutelnosti: string | null
  doplnujuce_info: string | null
  status: LeadStatus
  notes: string | null
  source: string | null
}

export interface LeadCally {
  id: string
  created_at: string
  name: string
  email: string | null
  phone: string | null
  zaujem: string | null
  nehnutelnost: string | null
  horizont: string | null
  sprava: string | null
  zavolame: boolean
  score: LeadScore
  status: LeadStatus
  notes: string | null
  source: string | null
}

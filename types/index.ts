export interface Listing {
  title: string;
  price: string;
  location: string;
  area: string;
  url: string;
  description?: string;
}

export interface NewsletterListing {
  title: string;
  price: string;
  location: string;
  area: string;
  description: string;
  url: string;
}

export interface NewsletterContent {
  subject: string;
  greeting: string;
  listings: NewsletterListing[];
  tip: string;
  cta: string;
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

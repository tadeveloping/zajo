import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ako vám môžem pomôcť? — Zajo Reality",
  description: "Máte záujem o kúpu, predaj, ocenenie alebo obhliadku nehnuteľnosti? Napíšte nám, ozveme sa vám čo najskôr.",
  openGraph: {
    title: "Ako vám môžem pomôcť? — Zajo Reality",
    description: "Máte záujem o kúpu, predaj, ocenenie alebo obhliadku nehnuteľnosti? Napíšte nám, ozveme sa vám čo najskôr.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ako vám môžem pomôcť? — Zajo Reality",
    description: "Máte záujem o kúpu, predaj, ocenenie alebo obhliadku nehnuteľnosti? Napíšte nám, ozveme sa vám čo najskôr.",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

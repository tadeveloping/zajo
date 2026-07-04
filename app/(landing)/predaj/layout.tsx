import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predaj nehnuteľnosti — Zajo Reality",
  description: "Od fotiek až po zmluvy, postaráme sa o všetko. Reálna cena, rýchly predaj, žiadne prekvapenia.",
  openGraph: {
    title: "Predaj nehnuteľnosti — Zajo Reality",
    description: "Od fotiek až po zmluvy, postaráme sa o všetko. Reálna cena, rýchly predaj, žiadne prekvapenia.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Predaj nehnuteľnosti — Zajo Reality",
    description: "Od fotiek až po zmluvy, postaráme sa o všetko. Reálna cena, rýchly predaj, žiadne prekvapenia.",
  },
};

export default function PredajLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

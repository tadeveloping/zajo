import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bezplatné ocenenie nehnuteľnosti — Zajo Reality",
  description: "Zistite reálnu predajnú cenu vašej nehnuteľnosti, bezplatne a do 48 hodín.",
  openGraph: {
    title: "Bezplatné ocenenie nehnuteľnosti — Zajo Reality",
    description: "Zistite reálnu predajnú cenu vašej nehnuteľnosti, bezplatne a do 48 hodín.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bezplatné ocenenie nehnuteľnosti — Zajo Reality",
    description: "Zistite reálnu predajnú cenu vašej nehnuteľnosti, bezplatne a do 48 hodín.",
  },
};

export default function OcenenieLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

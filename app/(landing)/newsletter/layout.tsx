import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — Zajo Reality",
  description: "Byty, domy a pozemky v Trenčianskom kraji priamo do vášho e-mailu, skôr ako sa objavia inde.",
  openGraph: {
    title: "Newsletter — Zajo Reality",
    description: "Byty, domy a pozemky v Trenčianskom kraji priamo do vášho e-mailu, skôr ako sa objavia inde.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter — Zajo Reality",
    description: "Byty, domy a pozemky v Trenčianskom kraji priamo do vášho e-mailu, skôr ako sa objavia inde.",
  },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIAC | Sistema Inteligente de Análise Criminal",
  description: "Plataforma demonstrativa para consolidação, validação e análise estatística criminal em Moçambique.",
  applicationName: "SIAC",
};

export const viewport: Viewport = {
  themeColor: "#0b222e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}

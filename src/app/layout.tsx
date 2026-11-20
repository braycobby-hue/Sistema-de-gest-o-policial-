import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIAC | Sistema Inteligente de Análise Criminal",
  description: "Pré-visualização da interface SIAC para submissões estatísticas mensais. Sem autenticação ou persistência de dados.",
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

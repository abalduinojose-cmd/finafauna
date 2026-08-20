import type { Metadata } from "next";
import { Baloo_2, DM_Mono, Nunito } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { WhatsAppProvider } from "@/components/ui/WhatsAppModal";
import { montarJsonLd } from "@/lib/jsonld";
import { SITE_DESCRICAO, SITE_NOME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Dupla arredondada e amigável, com cara de marca pet:
// Baloo 2 nos títulos, Nunito no corpo, DM Mono nos kickers.
const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NOME} · Pet shop, ração e banho e tosa em Petrópolis (Posse e Pedro do Rio)`,
    template: `%s · ${SITE_NOME}`,
  },
  description: SITE_DESCRICAO,
  keywords: [
    "pet shop Petrópolis",
    "ração para cachorro Posse Petrópolis",
    "ração para gato Pedro do Rio",
    "banho e tosa Posse",
    "banho e tosa Pedro do Rio",
    "delivery de ração Petrópolis",
    "casa de ração Petrópolis",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NOME,
    title: `${SITE_NOME} · Tudo para tornar a vida do seu Pet mais feliz`,
    description: SITE_DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NOME} · Pet shop em Petrópolis`,
    description: SITE_DESCRICAO,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${baloo.variable} ${nunito.variable} ${dmMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(montarJsonLd()) }}
        />
        <WhatsAppProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppFab />
        </WhatsAppProvider>
      </body>
    </html>
  );
}

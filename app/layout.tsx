import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { business } from "@/data/business";
import { img } from "@/lib/images";
import { Providers } from "@/components/Providers";
import "./globals.css";

// Didone serif kao "GOLD ADA" u logou, Jost za razmaknut verzal kao "EXCLUSIVE".
const bodoni = Bodoni_Moda({ weight: ["400", "500", "600"], style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-bodoni", display: "swap" });
const jost = Jost({ weight: ["300", "400", "500"], subsets: ["latin", "latin-ext"], variable: "--font-jost", display: "swap" });

const title = "Gold Ada Exclusive — Sala za venčanja i proslave | Ada Ciganlija, Beograd";
const description =
  "Gold Ada Exclusive na Adi Ciganliji: elegantna sala, privatna bašta za ceremoniju, izdašna gozba i premium karta pića. Venčanja, rođendani, krštenja i sve vrste proslava.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "sr_RS",
    siteName: business.name,
    images: [{ url: img.sala.src, width: img.sala.width, height: img.sala.height, alt: "Mladenački sto u sali Gold Ada Exclusive" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [img.sala.src] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#1b1814" };

// Strukturirani podaci — samo verifikovane informacije iz data/business.ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: business.name,
  description: business.tagline,
  telephone: business.phone.e164,
  url: business.siteUrl,
  image: `${business.siteUrl}${img.sala.src}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: business.city,
    addressCountry: business.country,
  },
  sameAs: [business.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr-Latn" className={`${bodoni.variable} ${jost.variable}`}>
      <body className="grain">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

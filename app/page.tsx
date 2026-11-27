import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Inquiry } from "@/components/Inquiry";
import { Location } from "@/components/Location";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Nav } from "@/components/Nav";
import { Offer } from "@/components/Offer";
import { Quote } from "@/components/Quote";
import { Spaces } from "@/components/Spaces";

export default function Home() {
  return (
    <>
      <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Preskoči na sadržaj
      </a>
      <Nav />
      <main id="sadrzaj">
        <Hero />
        <Spaces />
        <Offer />
        <Quote />
        <Gallery />
        <Location />
        <Inquiry />
      </main>
      <Footer />
      <MobileOrderBar />
    </>
  );
}

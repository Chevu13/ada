import Image from "next/image";
import { business, occasions } from "@/data/business";
import { img } from "@/lib/images";
import { Button } from "./ui";
import { label, wrap } from "./styles";

export function Hero() {
  return (
    <section id="pocetna" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper md:items-center">
      <Image
        src={img.hero}
        alt="Mladenački sto sa inicijalima, svećama i belim cvećem pod kristalnim lusterom"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="slow-zoom object-cover object-[50%_40%]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,24,20,.35),rgba(27,24,20,.78)_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className={`${wrap} relative z-10 pt-32 pb-16 text-center md:pb-0`}>
        <div className="hero-in hero-in-delay mx-auto max-w-[62rem]">
          <p className="inline-flex items-center gap-3 rounded-full border border-gold-light/40 bg-ink/30 px-5 py-2 text-[0.8rem] tracking-[0.06em] text-gold-light backdrop-blur-sm">
            <span aria-hidden>★★★★★</span>
            {business.announcement}
          </p>
          <h1 className="mt-8 font-display text-[clamp(3rem,8.4vw,7.6rem)] leading-[0.98] tracking-[-0.02em]">
            Vaš datum zaslužuje <em className="gold-text not-italic md:italic">savršeno</em> mesto.
          </h1>
          <ul className={`${label} mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-paper/80`}>
            {occasions.map((o, i) => (
              <li key={o} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden className="hidden h-1 w-1 rotate-45 bg-crust sm:block" />}
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="gold" href="#upit" className="w-full sm:w-auto">
              Zakažite obilazak
            </Button>
            <Button variant="ghost" href={business.phone.href} className="w-full sm:w-auto">
              {business.phone.display}
            </Button>
          </div>
          <p className="mt-8 text-[0.95rem] text-paper/65">
            {business.area} · {business.street}, {business.city}
          </p>
        </div>
      </div>
    </section>
  );
}

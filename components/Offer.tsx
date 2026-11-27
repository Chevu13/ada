import Image from "next/image";
import { features, occasions } from "@/data/business";
import { img } from "@/lib/images";
import { Button, Reveal } from "./ui";
import { h2, label, section, wrap } from "./styles";

const roman = ["I", "II", "III", "IV", "V", "VI"];

export function Offer() {
  return (
    <section id="ponuda" aria-labelledby="ponuda-naslov" className={`relative overflow-hidden bg-ink text-paper ${section}`}>
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12 lg:gap-16`}>
        {/* Fotografija sa zlatnim okvirom pomerenim u stranu */}
        <Reveal className="relative lg:col-span-5">
          <div aria-hidden className="absolute -top-4 -left-4 h-full w-full border border-crust/60 md:-top-6 md:-left-6" />
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={img.sto} alt="Okrugli sto sa zlatnim podmetačima, svećnjakom i belim ružama" fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className={`${label} text-crust`}>Sve na jednom mestu</p>
            <h2 id="ponuda-naslov" className={`${h2} mt-5`}>
              Vaš zadatak je da <span className="gold-text italic">uživate</span>.
            </h2>
            <p className="mt-5 text-lg text-paper/70">Za sve ostalo brinemo mi.</p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {features.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={i * 0.05} className="flex gap-5 border-t border-crust/30 py-6">
                  <span className="w-8 shrink-0 font-display text-xl italic text-crust">{roman[i]}</span>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight">{f.title}</h3>
                    <p className="mt-1.5 text-[1rem] leading-relaxed text-paper/70">{f.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className={`${label} text-paper/60`}>{occasions.join(" · ")}</p>
            <Button variant="gold" href="#upit" className="w-full sm:w-auto">
              Zatražite ponudu
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

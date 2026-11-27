import Image from "next/image";
import { spaces } from "@/data/business";
import { img } from "@/lib/images";
import { Reveal } from "./ui";
import { accent, h2, label, section, wrap } from "./styles";

export function Spaces() {
  return (
    <section id="prostor" aria-labelledby="prostor-naslov" className={`bg-cream ${section}`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className={`${label} text-crust`}>Prostor</p>
          <h2 id="prostor-naslov" className={`${h2} mt-5`}>
            Dva prostora i <span className={accent}>bašta</span> za dan koji se pamti
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Na Adi Ciganliji, usred Beograda — mesto gde ceo dan, od ceremonije do poslednje igre, provodite na jednom mestu.
          </p>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {spaces.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={i * 0.08} className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-ink text-paper md:aspect-[3/4]">
                <Image
                  src={img[s.image]}
                  alt={s.name}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className={`${label} text-gold-light`}>{s.guests}</p>
                  <h3 className="mt-3 font-display text-[2rem] leading-tight">{s.name}</h3>
                  <p className="mt-2 max-w-xs text-[1rem] leading-relaxed text-paper/80">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

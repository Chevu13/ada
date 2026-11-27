import { business, directions } from "@/data/business";
import { Button, Reveal } from "./ui";
import { accent, h2, label, section, wrap } from "./styles";

export function Location() {
  return (
    <section id="lokacija" aria-labelledby="lokacija-naslov" className={`bg-paper ${section}`}>
      <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <Reveal className="lg:col-span-5">
          <p className={`${label} text-crust`}>Lokacija</p>
          <h2 id="lokacija-naslov" className={`${h2} mt-5`}>
            Kako do <span className={accent}>nas</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {business.street}, {business.area}, {business.city} — na samo nekoliko minuta od Ada Mall-a.
          </p>

          <ol className="mt-10 space-y-5">
            {directions.map((d, i) => (
              <li key={d} className="flex gap-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-crust font-display text-lg text-crust">{i + 1}</span>
                <p className="pt-1.5 text-[1.05rem] leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-crust pl-4 text-[1rem] text-ink-soft">Na raspolaganju vam je veliki privatni parking.</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={business.maps} className="w-full sm:w-auto">
              Otvori u mapama
            </Button>
            <Button variant="ghost" href={business.phone.href} className="w-full sm:w-auto">
              {business.phone.display}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden bg-ink/5 lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
          <iframe
            title={`Mapa: ${business.name}, ${business.street}`}
            src={business.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[.55] sepia-[.25]"
          />
        </Reveal>
      </div>
    </section>
  );
}

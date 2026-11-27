"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { spaces } from "@/data/business";
import { img } from "@/lib/images";
import { Ornament } from "./Ornament";
import { Reveal, ease } from "./ui";
import { accent, h2, label, section, wrap } from "./styles";

/** Javlja formi za upit koji je prostor izabran (forma sluša ovaj događaj). */
export const selectSpace = (name: string) => window.dispatchEvent(new CustomEvent("gold:space", { detail: name }));

export function Spaces() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="prostor" aria-labelledby="prostor-naslov" className={`bg-cream ${section}`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className={`${label} text-crust`}>Prostor</p>
          <h2 id="prostor-naslov" className={`${h2} mt-5`}>
            Dva prostora i <span className={accent}>bašta</span> za dan koji se pamti
          </h2>
          <Ornament className="mt-7" />
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            Na Adi Ciganliji, usred Beograda — mesto gde ceo dan, od ceremonije do poslednje igre, provodite na jednom mestu.
          </p>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {spaces.map((s, i) => {
            const expanded = open === s.id;
            return (
              <li key={s.id}>
                <Reveal delay={i * 0.1} className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-ink text-paper shadow-[0_30px_60px_-40px_rgba(27,24,20,.6)] md:aspect-[3/4]">
                  <Image
                    src={img[s.image]}
                    alt={s.name}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07] ${expanded ? "scale-[1.07]" : ""}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent transition-opacity duration-700 ${expanded ? "opacity-100" : "opacity-90"}`} />
                  {/* Tanak zlatni okvir koji se pojavi na hover */}
                  <div aria-hidden className="pointer-events-none absolute inset-3 border border-gold-light/0 transition-colors duration-700 group-hover:border-gold-light/50" />

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className={`${label} text-gold-light`}>{s.guests}</p>
                    <h3 className="mt-3 font-display text-[2rem] leading-tight">{s.name}</h3>
                    <p className="mt-2 max-w-xs text-[1rem] leading-relaxed text-paper/80">{s.text}</p>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          id={`detalji-${s.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-5 space-y-2 border-t border-gold-light/30 pt-4">
                            {s.details.map((d) => (
                              <li key={d} className="flex items-center gap-3 text-[0.98rem] text-paper/90">
                                <span aria-hidden className="h-1 w-1 rotate-45 bg-gold-light" />
                                {d}
                              </li>
                            ))}
                          </ul>
                          <a
                            href="#upit"
                            onClick={() => selectSpace(s.name)}
                            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-crust px-5 font-label text-[0.74rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-light"
                          >
                            Upit za ovaj prostor →
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? null : s.id)}
                      aria-expanded={expanded}
                      aria-controls={`detalji-${s.id}`}
                      className={`${label} mt-5 inline-flex min-h-11 items-center gap-3 text-paper/85 transition-colors hover:text-gold-light`}
                    >
                      {expanded ? "Zatvori" : "Detalji"}
                      <span aria-hidden className={`grid h-7 w-7 place-items-center rounded-full border border-current text-base leading-none transition-transform duration-500 ${expanded ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

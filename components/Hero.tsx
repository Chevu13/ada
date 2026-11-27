"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { business, occasions } from "@/data/business";
import { img } from "@/lib/images";
import { useRichMotion } from "@/lib/motion";
import { Button, ease } from "./ui";
import { label, wrap } from "./styles";

const slides = [
  { src: img.hero, alt: "Mladenački sto sa inicijalima, svećama i belim cvećem pod kristalnim lusterom", pos: "50% 40%" },
  { src: img.salaDetalj, alt: "Sala sa kristalnim lusterom i postavljenim stolovima", pos: "50% 35%" },
  { src: img.basta, alt: "Senica u privatnoj bašti za ceremoniju na otvorenom", pos: "50% 45%" },
  { src: img.dekoracija, alt: "Visoki cvetni aranžmani od belih ruža i zlatni svećnjaci", pos: "50% 40%" },
];
const SLIDE_MS = 6500;
const FADE_S = 1.6;
const words = "Vaš datum zaslužuje savršeno mesto.".split(" ");

export function Hero() {
  const reduced = useReducedMotion();
  const rich = useRichMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", rich ? "14%" : "0%"]);

  useEffect(() => {
    if (reduced) return; // bez automatske smene slajdova za "manje animacija"
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, reduced]);

  return (
    <section ref={ref} id="pocetna" aria-roledescription="slajdšou" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper md:items-center">
      <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
        {slides.map((s, i) => {
          const on = i === active;
          return (
            <motion.div
              key={s.src.src}
              aria-hidden={!on}
              initial={false}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: FADE_S, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Ken Burns: spor zum dok je slajd aktivan, tihi reset tek kad se potpuno sakrije */}
              <motion.div
                initial={false}
                animate={{ scale: on && !reduced ? 1 : 1.1 }}
                transition={on ? { duration: SLIDE_MS / 1000 + FADE_S, ease: "linear" } : { delay: FADE_S, duration: 0 }}
                className="absolute inset-0"
              >
                <Image src={s.src} alt={s.alt} fill priority={i === 0} placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: s.pos }} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,24,20,.35),rgba(27,24,20,.78)_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className={`${wrap} relative z-10 pt-32 pb-24 text-center md:pb-0`}>
        <div className="mx-auto max-w-[62rem]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="inline-flex items-center gap-3 rounded-full border border-gold-light/40 bg-ink/30 px-5 py-2 text-[0.8rem] tracking-[0.06em] text-gold-light backdrop-blur-sm"
          >
            <span aria-hidden>★★★★★</span>
            {business.announcement}
          </motion.p>

          <h1 className="mt-8 font-display text-[clamp(3rem,8.4vw,7.6rem)] leading-[0.98] tracking-[-0.02em]">
            {words.map((w, i) => (
              <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${w === "savršeno" ? "gold-text md:italic" : ""}`}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, ease, delay: 0.45 + i * 0.09 }}
                >
                  {w}
                </motion.span>
              </span>
              {/* razmak van inline-block elementa, inače se gubi */}
              {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.15 }}>
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
          </motion.div>
        </div>
      </div>

      {/* Izbor slajda: tanke zlatne linije koje se pune dok slajd traje */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5 md:bottom-10" role="group" aria-label="Izbor fotografije">
        {slides.map((s, i) => (
          <button key={s.src.src} type="button" onClick={() => setActive(i)} aria-label={`Fotografija ${i + 1} od ${slides.length}`} aria-current={i === active} className="group grid h-8 w-12 place-items-center">
            <span className="relative block h-px w-full overflow-hidden bg-paper/30 transition-colors group-hover:bg-paper/60">
              {i === active && (
                <motion.span
                  key={`p-${active}`}
                  className="absolute inset-y-0 left-0 bg-gold-light"
                  initial={{ width: reduced ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: reduced ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

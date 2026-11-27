"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import { business, occasions } from "@/data/business";
import { img } from "@/lib/images";
import { useRichMotion } from "@/lib/motion";
import { Button, ease } from "./ui";
import { label, wrap } from "./styles";

// Dron snimak sa njihovog reela "Kako doći do nas" (uspravan, 720 px, bez titlova i zvuka).
const VIDEO = "/video/dron.mp4";
const words = "Vaš datum zaslužuje savršeno mesto.".split(" ");

export function Hero() {
  const reduced = useReducedMotion();
  const rich = useRichMotion();
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", rich ? "12%" : "0%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", rich ? "-10%" : "0%"]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    setPlaying(!v.paused);
  };

  return (
    <section ref={ref} id="pocetna" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper lg:items-center">
      {/* Desktop pozadina: sala sa svećama (dron snimak je preuzak za ceo širok ekran) */}
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[8%] inset-x-0 hidden lg:block">
        <Image src={img.hero} alt="" fill priority placeholder="blur" sizes="100vw" className="slow-zoom object-cover object-[50%_38%]" />
      </motion.div>
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(27,24,20,.94)_0%,rgba(27,24,20,.78)_45%,rgba(27,24,20,.55)_100%)] lg:block" />

      {/* Dron snimak: preko celog ekrana na telefonu, u zlatnom ramu na desktopu */}
      <motion.figure
        style={{ y: cardY }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
        className="absolute inset-0 lg:inset-auto lg:top-1/2 lg:right-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:z-10 lg:-mt-[calc(min(30vw,430px)*792/1440)] lg:w-[min(30vw,430px)]"
      >
        <div aria-hidden className="absolute -top-5 -left-5 hidden h-full w-full border border-crust/70 lg:block" />
        <div className="relative h-full w-full overflow-hidden lg:aspect-[720/792] lg:shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]">
          <Image src={img.dronPoster} alt="Ada Ciganlija iz vazduha" fill priority placeholder="blur" sizes="(min-width: 1024px) 430px, 100vw" className="object-cover" />
          {!reduced && (
            <video ref={video} className="absolute inset-0 h-full w-full object-cover" src={VIDEO} poster={img.dronPoster.src} autoPlay muted loop playsInline preload="auto" aria-hidden />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(27,24,20,.55),rgba(27,24,20,.25)_30%,rgba(27,24,20,.6)_60%,#1b1814_96%)] lg:bg-[linear-gradient(to_top,rgba(27,24,20,.55),transparent_40%)]" />
        </div>
        <figcaption className={`${label} absolute bottom-4 left-5 hidden items-center gap-3 text-[0.68rem] text-paper/85 lg:flex`}>
          <span aria-hidden className="h-px w-6 bg-gold-light" />
          Ada Ciganlija iz vazduha
        </figcaption>
        {!reduced && (
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pauziraj video" : "Pusti video"}
            className="absolute top-24 right-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-paper/40 bg-ink/30 text-[0.7rem] text-paper backdrop-blur-sm transition-colors hover:border-gold-light hover:text-gold-light lg:top-auto lg:right-3 lg:bottom-3"
          >
            {playing ? "❚❚" : "▶"}
          </button>
        )}
      </motion.figure>

      <div className={`${wrap} relative z-10 pt-32 pb-16 text-center lg:pb-0 lg:text-left`}>
        <div className="mx-auto max-w-[40rem] lg:mx-0 lg:max-w-[52%]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="inline-flex items-center gap-3 rounded-full border border-gold-light/40 bg-ink/30 px-5 py-2 text-[0.8rem] tracking-[0.06em] text-gold-light backdrop-blur-sm"
          >
            <span aria-hidden>★★★★★</span>
            {business.announcement}
          </motion.p>

          <h1 className="mt-8 font-display text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[1] tracking-[-0.02em]">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={`inline-block ${w === "savršeno" ? "gold-text italic" : ""}`}
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
            <span aria-hidden className="mx-auto mt-8 block h-px w-20 bg-crust lg:mx-0" />
            <ul className={`${label} mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-paper/85 lg:justify-start`}>
              {occasions.map((o, i) => (
                <li key={o} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden className="hidden h-1 w-1 rotate-45 bg-crust sm:block" />}
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
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

      {/* Diskretan poziv na skrol (samo desktop) */}
      <a href="#prostor" aria-label="Pogledajte prostor" className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/60 transition-colors hover:text-gold-light lg:flex">
        <span className={`${label} text-[0.62rem]`}>Prostor</span>
        <motion.span aria-hidden className="block h-10 w-px bg-current" animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} style={{ originY: 0 }} />
      </a>
    </section>
  );
}

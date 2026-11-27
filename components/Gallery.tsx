"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { business } from "@/data/business";
import { img } from "@/lib/images";
import { Ornament } from "./Ornament";
import { Button, Reveal, ease } from "./ui";
import { accent, h2, label, section, wrap } from "./styles";

type Cat = "Sala" | "Detalji" | "Spolja" | "Mladenci";
const photos: { src: StaticImageData; alt: string; cat: Cat }[] = [
  { src: img.salaDetalj, alt: "Sala sa kristalnim lusterom i postavljenim stolovima", cat: "Sala" },
  { src: img.dekoracija, alt: "Visoki cvetni aranžmani od belih ruža i zlatni svećnjaci", cat: "Detalji" },
  { src: img.basta, alt: "Senica u privatnoj bašti za ceremoniju", cat: "Spolja" },
  { src: img.mladenackiSto, alt: "Mladenački sto sa inicijalima i svećama", cat: "Sala" },
  { src: img.prviPles, alt: "Mladenci u prvom plesu", cat: "Mladenci" },
  { src: img.sto, alt: "Zlatni podmetači i bele salvete na okruglom stolu", cat: "Detalji" },
  { src: img.kocija, alt: "Bela kočija sa belim konjem u bašti", cat: "Spolja" },
  { src: img.sala, alt: "Mladenački sto i plesni podijum u sali", cat: "Sala" },
  { src: img.kompleks, alt: "Kompleks na Adi Ciganliji iz vazduha", cat: "Spolja" },
];
const cats = ["Sve", "Sala", "Detalji", "Spolja", "Mladenci"] as const;

export function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Sve");
  const list = cat === "Sve" ? photos : photos.filter((p) => p.cat === cat);
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i === null ? i : (i + d + list.length) % list.length));
    },
    [list.length],
  );
  const openAt = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, go, close]);

  const current = index === null ? null : list[index];

  return (
    <section id="galerija" aria-labelledby="galerija-naslov" className={`bg-cream ${section}`}>
      <div className={wrap}>
        <Reveal className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className={`${label} text-crust`}>Galerija</p>
          <h2 id="galerija-naslov" className={`${h2} mt-5`}>
            Trenuci koji se <span className={accent}>pamte</span>
          </h2>
          <Ornament className="mt-7" />
        </Reveal>

        <div role="group" aria-label="Filter fotografija" className="mb-10 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`relative min-h-11 rounded-full px-5 font-label text-[0.74rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                cat === c ? "text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {cat === c && <motion.span layoutId="gal-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.45, ease }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <motion.ul layout className="grid auto-rows-[9.5rem] grid-cols-2 gap-2 md:auto-rows-[15rem] md:grid-cols-3 md:gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.li
                key={p.src.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease }}
                className={p.src.height > p.src.width * 1.05 ? "row-span-2" : ""}
              >
                <button type="button" onClick={() => openAt(i)} className="group relative block h-full w-full overflow-hidden bg-ink" aria-label={`Uvećaj: ${p.alt}`}>
                  <Image src={p.src} alt={p.alt} fill placeholder="blur" sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
                  <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                  <span aria-hidden className={`${label} absolute bottom-3 left-3 translate-y-2 text-[0.65rem] text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100`}>
                    {p.cat}
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-10 text-center">
          <Button variant="link" href={business.instagram.url}>
            Još na Instagramu {business.instagram.handle}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galerija fotografija"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-16"
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              // prevlačenje prstom levo/desno menja fotografiju
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={current.src.src}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease }}
                className="relative h-full w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-5 left-1/2 w-[calc(100%-8rem)] -translate-x-1/2 text-center text-sm text-paper/70">
              {current.alt} <span className="ml-2 text-gold-light">{index + 1} / {list.length}</span>
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label="Zatvori galeriju" className="absolute top-4 right-4 grid h-12 w-12 place-items-center text-3xl text-paper transition-colors hover:text-gold-light">
              ×
            </button>
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(d);
                }}
                aria-label={d < 0 ? "Prethodna fotografija" : "Sledeća fotografija"}
                className={`absolute bottom-3 grid h-12 w-12 place-items-center rounded-full border border-gold-light/40 text-paper transition-colors hover:border-gold-light hover:bg-gold-light hover:text-ink md:top-1/2 md:bottom-auto md:-translate-y-1/2 ${d < 0 ? "left-3 md:left-6" : "right-3 md:right-6"}`}
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

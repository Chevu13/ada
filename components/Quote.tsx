"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/lib/images";
import { useRichMotion } from "@/lib/motion";
import { Ornament } from "./Ornament";
import { Reveal } from "./ui";
import { label, wrap } from "./styles";

/** Filmska traka sa njihovom rečenicom (VERIFIKOVANO, objava); blaga paralaksa samo na desktopu. */
export function Quote() {
  const ref = useRef<HTMLElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], rich ? ["-12%", "12%"] : ["0%", "0%"]);

  return (
    <section ref={ref} aria-label="Naša filozofija" className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <Image src={img.mladenackiSto} alt="" fill placeholder="blur" sizes="100vw" className="object-cover object-[50%_45%]" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/65" />
      <Reveal className={`${wrap} relative z-10 py-24 text-center`}>
        <p className={`${label} text-gold-light`}>Gold Ada Exclusive</p>
        <blockquote className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.15]">
          „Venčanje nije samo jedan dan. To je <span className="gold-text italic">uspomena</span> koja ostaje zauvek.“
        </blockquote>
        <Ornament light className="mt-10" />
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import { img } from "@/lib/images";
import { Reveal } from "./ui";
import { label, wrap } from "./styles";

/** Filmska traka sa njihovom rečenicom (VERIFIKOVANO, objava). */
export function Quote() {
  return (
    <section aria-label="Naša filozofija" className="relative flex min-h-[70svh] items-center overflow-hidden bg-ink text-paper">
      <Image src={img.mladenackiSto} alt="" fill placeholder="blur" sizes="100vw" className="object-cover object-[50%_45%]" />
      <div className="absolute inset-0 bg-ink/65" />
      <Reveal className={`${wrap} relative z-10 py-24 text-center`}>
        <p className={`${label} text-gold-light`}>Gold Ada Exclusive</p>
        <blockquote className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.15]">
          „Venčanje nije samo jedan dan. To je <span className="gold-text italic">uspomena</span> koja ostaje zauvek.“
        </blockquote>
        <span aria-hidden className="mx-auto mt-10 block h-px w-24 bg-crust" />
      </Reveal>
    </section>
  );
}

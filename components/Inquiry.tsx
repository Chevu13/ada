"use client";

import { useEffect, useState, type FormEvent } from "react";
import { business, occasions, spaces } from "@/data/business";
import { Ornament } from "./Ornament";
import { Reveal } from "./ui";
import { accent, h2, label, section, wrap } from "./styles";

type Form = { name: string; occasion: string; space: string; date: string; guests: string; note: string };

const ANY_SPACE = "Još ne znam";

/** Tekst upita — šalje se kao poruka na Instagram (njihov kanal: "Pišite nam u DM") ili čita telefonom. */
export function inquiryText(f: Form) {
  return [
    `Dobar dan, zanima me termin u ${business.name}.`,
    `Ime: ${f.name}`,
    `Proslava: ${f.occasion}`,
    f.space !== ANY_SPACE && `Prostor: ${f.space}`,
    f.date && `Datum: ${f.date.split("-").reverse().join(".")}.`,
    f.guests && `Broj gostiju: ${f.guests}`,
    f.note && `Napomena: ${f.note}`,
  ]
    .filter(Boolean)
    .join("\n");
}

const field = "mt-2 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-crust";

export function Inquiry() {
  const [f, setF] = useState<Form>({ name: "", occasion: occasions[0], space: ANY_SPACE, date: "", guests: "", note: "" });
  const [state, setState] = useState<"idle" | "copied" | "manual" | "error">("idle");
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF((v) => ({ ...v, [k]: e.target.value }));

  // Klik na "Upit za ovaj prostor" u sekciji Prostor unapred bira prostor.
  useEffect(() => {
    const on = (e: Event) => setF((v) => ({ ...v, space: (e as CustomEvent<string>).detail }));
    window.addEventListener("gold:space", on);
    return () => window.removeEventListener("gold:space", on);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (f.name.trim().length < 2) return setState("error");
    try {
      await navigator.clipboard.writeText(inquiryText(f));
      setState("copied");
    } catch {
      setState("manual"); // bez dozvole za clipboard: prikazujemo tekst da ga posetilac sam kopira
    }
    window.open(business.instagram.dm, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="upit" aria-labelledby="upit-naslov" className={`bg-cream ${section}`}>
      <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <Reveal className="lg:col-span-5">
          <p className={`${label} text-crust`}>Upit za termin</p>
          <h2 id="upit-naslov" className={`${h2} mt-5`}>
            Zakažite <span className={accent}>obilazak</span>
          </h2>
          <Ornament className="mt-6 justify-start" />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Pišite nam za ponudu, obilazak prostora i slobodne termine. Rado ćemo vam pokazati zašto mladenci svoje najlepše uspomene stvaraju upravo kod nas.
          </p>
          <div className="mt-10 space-y-6">
            <div>
              <p className={`${label} text-muted`}>Telefon</p>
              <a href={business.phone.href} className="mt-2 block font-display text-[2.2rem] leading-none transition-colors hover:text-crust">
                {business.phone.display}
              </a>
            </div>
            <div>
              <p className={`${label} text-muted`}>Instagram</p>
              <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-lg underline decoration-ink/25 underline-offset-4 hover:text-crust">
                {business.instagram.handle}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="border border-crust/40 bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(27,24,20,.35)] md:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={`${label} text-muted`}>Ime i prezime</span>
                <input className={field} value={f.name} onChange={set("name")} autoComplete="name" required placeholder="Vaše ime" />
              </label>
              <label className="block">
                <span className={`${label} text-muted`}>Vrsta proslave</span>
                <select className={field} value={f.occasion} onChange={set("occasion")}>
                  {occasions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={`${label} text-muted`}>Prostor</span>
                <select className={field} value={f.space} onChange={set("space")}>
                  {[ANY_SPACE, ...spaces.map((sp) => sp.name)].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={`${label} text-muted`}>Željeni datum</span>
                <input className={field} type="date" value={f.date} onChange={set("date")} />
              </label>
              <label className="block">
                <span className={`${label} text-muted`}>Broj gostiju</span>
                <input className={field} type="number" inputMode="numeric" min={1} value={f.guests} onChange={set("guests")} placeholder="npr. 150" />
              </label>
              <label className="block sm:col-span-2">
                <span className={`${label} text-muted`}>Napomena (opciono)</span>
                <textarea className={`${field} min-h-20 resize-y`} value={f.note} onChange={set("note")} placeholder="Ceremonija u bašti, dekoracija, termin obilaska…" />
              </label>
            </div>

            {state === "error" && (
              <p role="alert" className="mt-6 text-[0.95rem] text-tomato-deep">
                Unesite ime i prezime.
              </p>
            )}
            {state === "copied" && (
              <p role="status" className="mt-6 text-[0.95rem] text-ink-soft">
                Upit je kopiran — nalepite ga u Instagram poruku koja se otvorila.
              </p>
            )}

            {state === "manual" && (
              <pre className="mt-6 whitespace-pre-wrap border border-ink/15 bg-cream p-4 font-sans text-[0.95rem] text-ink-soft">{inquiryText(f)}</pre>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-crust px-8 font-label text-[0.8rem] font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Pošalji upit na Instagram ↗
              </button>
              <a
                href={business.phone.href}
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-ink/25 px-8 font-label text-[0.8rem] font-medium uppercase tracking-[0.22em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Pozovite
              </a>
            </div>
            <p className="mt-4 text-[0.85rem] text-muted">Upit se ne šalje automatski: kopiramo ga i otvaramo njihov Instagram, gde ga samo nalepite i pošaljete.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

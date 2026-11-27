"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ANY_SPACE, inquiryText, validateInquiry, type Inquiry as Form } from "@/lib/inquiry";
import { business, occasions, spaces } from "@/data/business";
import { Ornament } from "./Ornament";
import { Reveal } from "./ui";
import { accent, h2, label, section, wrap } from "./styles";

const field = "mt-2 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-crust";

export function Inquiry() {
  const [f, setF] = useState<Form>({ name: "", phone: "", email: "", occasion: occasions[0], space: ANY_SPACE, date: "", guests: "", note: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF((v) => ({ ...v, [k]: e.target.value }));

  // Klik na "Upit za ovaj prostor" u sekciji Prostor unapred bira prostor.
  useEffect(() => {
    const on = (e: Event) => setF((v) => ({ ...v, space: (e as CustomEvent<string>).detail }));
    window.addEventListener("gold:space", on);
    return () => window.removeEventListener("gold:space", on);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validateInquiry(f);
    if (!v.ok) {
      setError(v.error);
      return setState("error");
    }
    setState("sending");
    try {
      const res = await fetch("/api/upit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fallback?: boolean };
      if (res.ok) return setState("sent");
      if (data.fallback) return setState("fallback"); // mejl još nije podešen ili servis ne radi
      setError(data.error ?? "Slanje nije uspelo.");
      setState("error");
    } catch {
      setState("fallback");
    }
  }

  // Rezerva: isti upit poslat kao Instagram poruka (njihov kanal "Pišite nam u DM").
  async function sendViaInstagram() {
    const v = validateInquiry(f);
    if (v.ok) await navigator.clipboard?.writeText(inquiryText(v.data, business.name)).catch(() => {});
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
          <form onSubmit={onSubmit} noValidate className="relative border border-crust/40 bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(27,24,20,.35)] md:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={`${label} text-muted`}>Ime i prezime</span>
                <input className={field} value={f.name} onChange={set("name")} autoComplete="name" required placeholder="Vaše ime" />
              </label>
              <label className="block">
                <span className={`${label} text-muted`}>Telefon</span>
                <input className={field} type="tel" inputMode="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" required placeholder="06x xxx xxxx" />
              </label>
              <label className="block">
                <span className={`${label} text-muted`}>E-mail (opciono)</span>
                <input className={field} type="email" inputMode="email" value={f.email} onChange={set("email")} autoComplete="email" placeholder="vas@mejl.com" />
              </label>
              {/* zamka za spam botove: skriveno od ljudi i čitača ekrana */}
              <input type="text" name="website" value={f.website} onChange={set("website")} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
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

            <div aria-live="polite">
              {state === "error" && <p role="alert" className="mt-6 text-[0.95rem] text-tomato-deep">{error}</p>}
              {state === "sent" && (
                <p className="mt-6 border-l-2 border-crust bg-cream px-4 py-3 text-[1rem] text-ink">
                  Hvala! Upit je poslat — javićemo vam se u najkraćem roku.
                </p>
              )}
              {state === "fallback" && (
                <div className="mt-6 border-l-2 border-crust bg-cream px-4 py-3 text-[0.98rem] text-ink-soft">
                  Trenutno ne možemo da pošaljemo mejl. Pošaljite isti upit preko Instagrama ili nas pozovite.
                  <button type="button" onClick={sendViaInstagram} className="mt-3 block font-label text-[0.76rem] font-medium uppercase tracking-[0.2em] text-ink underline underline-offset-4 hover:text-crust">
                    Pošalji preko Instagrama ↗
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={state === "sending" || state === "sent"}
                className="shine inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-crust px-8 font-label text-[0.8rem] font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
              >
                {state === "sending" ? "Šaljem…" : state === "sent" ? "Upit je poslat ✓" : "Pošalji upit"}
              </button>
              <a
                href={business.phone.href}
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-ink/25 px-8 font-label text-[0.8rem] font-medium uppercase tracking-[0.22em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Pozovite
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

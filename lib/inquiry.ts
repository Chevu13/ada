/**
 * Upit za termin: provera podataka i tekst poruke.
 * Bez "@/" importa, da bi radilo i na serveru (API ruta) i u testu (`node --test`).
 */
export type Inquiry = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  space: string;
  date: string; // YYYY-MM-DD ili prazno
  guests: string;
  note: string;
  website?: string; // zamka za spam botove: ljudi ne vide ovo polje
};

export const ANY_SPACE = "Još ne znam";

const clip = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");

/** Čisti ulaz i vraća grešku za posetioca ili gotov upit. */
export function validateInquiry(raw: Partial<Record<keyof Inquiry, unknown>>): { ok: true; data: Inquiry } | { ok: false; error: string } {
  const d: Inquiry = {
    name: clip(raw.name, 100),
    phone: clip(raw.phone, 40),
    email: clip(raw.email, 120),
    occasion: clip(raw.occasion, 60),
    space: clip(raw.space, 60) || ANY_SPACE,
    date: clip(raw.date, 10),
    guests: clip(raw.guests, 5),
    note: clip(raw.note, 1500),
    website: clip(raw.website, 200),
  };
  if (d.name.length < 2) return { ok: false, error: "Unesite ime i prezime." };
  const digits = d.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return { ok: false, error: "Unesite ispravan broj telefona." };
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return { ok: false, error: "E-mail adresa nije ispravna." };
  if (d.date && !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) return { ok: false, error: "Datum nije ispravan." };
  if (d.guests && !/^\d{1,4}$/.test(d.guests)) return { ok: false, error: "Broj gostiju nije ispravan." };
  return { ok: true, data: d };
}

export function inquiryText(d: Inquiry, venue: string) {
  return [
    `Dobar dan, zanima me termin u ${venue}.`,
    `Ime: ${d.name}`,
    `Telefon: ${d.phone}`,
    d.email && `E-mail: ${d.email}`,
    `Proslava: ${d.occasion}`,
    d.space !== ANY_SPACE && `Prostor: ${d.space}`,
    d.date && `Datum: ${d.date.split("-").reverse().join(".")}.`,
    d.guests && `Broj gostiju: ${d.guests}`,
    d.note && `Napomena: ${d.note}`,
  ]
    .filter(Boolean)
    .join("\n");
}

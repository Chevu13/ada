/**
 * Podaci o prostoru. VERIFIKOVANO = Instagram @gold_ada_exclusive_ (bio i opisi objava, novembar 2026).
 * Polja sa TODO treba potvrditi sa vlasnikom pre objave.
 */
const q = "Gold Ada Exclusive, Obrenovački drum 17, Ada Ciganlija, Beograd";

export const business = {
  name: "Gold Ada Exclusive",
  tagline: "Prostor za sve vrste proslava", // VERIFIKOVANO (logo, objave)
  slogan: "Vaš datum zaslužuje savršeno mesto.", // VERIFIKOVANO (objava)

  // VERIFIKOVANO (bio)
  street: "Obrenovački drum 17",
  area: "Ada Ciganlija",
  postalCode: "11030",
  city: "Beograd",
  country: "RS",
  phone: { display: "065 2222 480", href: "tel:+381652222480", e164: "+381652222480" },

  instagram: {
    handle: "@gold_ada_exclusive_",
    url: "https://www.instagram.com/gold_ada_exclusive_/",
    dm: "https://ig.me/m/gold_ada_exclusive_", // "Pišite nam u DM" (objava)
  },

  // VERIFIKOVANO (objava, rezervacije za 2027). TODO: ukloniti ili izmeniti kad akcija istekne.
  announcement: "Rezervacije za 2027. su u toku · 10% popusta na booking",

  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`,

  // TODO: upisati pravi domen pre objave.
  siteUrl: "https://goldada.vercel.app",
} as const;

/** Dva prostora (VERIFIKOVANO, bio) i bašta (objave). */
export const spaces = [
  { id: "gold", name: "Gold Ada Exclusive", guests: "50 – 200 gostiju", text: "Elegantna sala sa kristalnim lusterima, mladenačkim stolom i podijumom za prvi ples.", image: "sala" as const },
  { id: "grand", name: "Grand Ada Exclusive", guests: "100 – 400 gostiju", text: "Za velika venčanja i proslave, do 400 gostiju.", image: "kompleks" as const },
  { id: "basta", name: "Privatna bašta", guests: "Ceremonija na otvorenom", text: "Bajkovita bašta za venčanje pod vedrim nebom i fotografisanje.", image: "basta" as const },
];

/** "Sve na jednom mestu" — VERIFIKOVANO iz opisa objava. */
export const features = [
  { title: "Bajkovita bašta", text: "Privatna bašta za ceremoniju na otvorenom i fotografisanje." },
  { title: "Elegantna sala", text: "Sala do 220 gostiju, uređena do poslednjeg detalja." },
  { title: "Izdašna gozba", text: "Neograničena gozba i kompletna ponuda hrane." },
  { title: "Premium karta pića", text: "Pića za celo slavlje, od dobrodošlice do poslednje igre." },
  { title: "Besprekorna usluga", text: "Vaš zadatak je da uživate. Za sve ostalo brinemo mi." },
  { title: "Privatni parking", text: "Veliki parking samo za vaše goste." },
];

export const occasions = ["Venčanja", "Rođendani", "Krštenja", "Sve vrste proslava"];

/** Kako do nas — VERIFIKOVANO (objava). */
export const directions = [
  "Kada stignete do Ada Mall-a, nastavite Radničkom ulicom pravo.",
  "Kod znaka Pionir skrenite desno, u ulicu Obrenovački put.",
  "Posle 2–3 minuta vožnje, sa leve strane ugledaćete naš bilbord.",
  "Skrenite levo — stigli ste u Gold Ada Exclusive.",
];

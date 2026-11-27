# Gold Ada Exclusive — sajt

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

```
npm install
npm run dev
npm run build
```

## Šta se menja pre objave

| Fajl | Šta |
|---|---|
| `data/business.ts` | adresa, telefon, Instagram, najava (rezervacije 2027), prostori, ponuda, "kako do nas", `siteUrl` |
| `assets/images/` | fotografije i logo sa @gold_ada_exclusive_ |

## Upit za termin → mejl

Forma šalje upit na `/api/upit`, a ruta ga prosleđuje mejlom preko [Resend](https://resend.com). U Vercel → Settings → Environment Variables dodati:

| Promenljiva | Vrednost |
|---|---|
| `RESEND_API_KEY` | API ključ sa resend.com |
| `INQUIRY_TO` | mejl lokala na koji stižu upiti |
| `INQUIRY_FROM` | opciono, npr. `Gold Ada <upit@domen.rs>` (domen verifikovan u Resend-u) |

Dok ovo nije podešeno, forma nudi da se isti upit pošalje preko Instagram DM-a ili poziva telefonom.

Test: `node --test lib/inquiry.test.ts`

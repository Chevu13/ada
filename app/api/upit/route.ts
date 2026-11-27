import { business } from "@/data/business";
import { inquiryText, validateInquiry } from "@/lib/inquiry";

/**
 * Šalje upit za termin na mejl lokala preko Resend-a (https://resend.com).
 * Potrebne promenljive okruženja (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  – API ključ
 *   INQUIRY_TO      – adresa na koju stižu upiti (mejl lokala)
 *   INQUIRY_FROM    – opciono, pošiljalac sa verifikovanog domena; bez njega Resend test adresa
 * Bez njih ruta vraća 503, a forma nudi Instagram kao rezervu.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  const v = validateInquiry((body ?? {}) as Record<string, unknown>);
  if (!v.ok) return Response.json({ error: v.error }, { status: 400 });
  // Bot je popunio skriveno polje: glumimo uspeh, ništa ne šaljemo.
  if (v.data.website) return Response.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  if (!key || !to) return Response.json({ error: "Slanje mejla još nije podešeno.", fallback: true }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM || `${business.name} sajt <onboarding@resend.dev>`,
      to: [to],
      ...(v.data.email ? { reply_to: v.data.email } : {}),
      subject: `Upit za termin: ${v.data.occasion} — ${v.data.name}`,
      text: inquiryText(v.data, business.name),
    }),
  });
  if (!res.ok) return Response.json({ error: "Slanje nije uspelo. Pokušajte ponovo ili nas pozovite.", fallback: true }, { status: 502 });
  return Response.json({ ok: true });
}

// Pokretanje: node --test lib/inquiry.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { inquiryText, validateInquiry } from "./inquiry.ts";

const ok = { name: "Ana Anić", phone: "065 123 4567", occasion: "Venčanja" };

test("prihvata ispravan upit i formatira datum", () => {
  const r = validateInquiry({ ...ok, date: "2027-06-12", guests: "150" });
  assert.ok(r.ok);
  if (!r.ok) return;
  const text = inquiryText(r.data, "Gold Ada Exclusive");
  assert.match(text, /Datum: 12\.06\.2027\./);
  assert.match(text, /Broj gostiju: 150/);
  assert.doesNotMatch(text, /Prostor:/); // "Još ne znam" se ne šalje
});

test("odbija nevažeće podatke", () => {
  assert.equal(validateInquiry({ ...ok, name: "A" }).ok, false);
  assert.equal(validateInquiry({ ...ok, phone: "123" }).ok, false);
  assert.equal(validateInquiry({ ...ok, email: "nije-mejl" }).ok, false);
  assert.equal(validateInquiry({ ...ok, guests: "-5" }).ok, false);
  assert.equal(validateInquiry({ ...ok, date: "12.06.2027" }).ok, false);
});

test("seče predugačak unos i ignoriše ne-string vrednosti", () => {
  const r = validateInquiry({ ...ok, note: "x".repeat(5000), guests: 42 as unknown as string });
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.data.note.length, 1500);
    assert.equal(r.data.guests, "");
  }
});

"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Paralaksa i jači efekti samo na desktopu i samo ako korisnik nije tražio manje animacija. */
export function useRichMotion() {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop && !reduced;
}

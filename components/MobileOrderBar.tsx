"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { ease } from "./ui";

/** Lepljiva traka na telefonu: poziv i upit za termin, posle hero sekcije. */
export function MobileOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const btn = "flex min-h-13 items-center justify-center rounded-full py-3.5 font-label text-[0.76rem] font-medium uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(27,24,20,.3)]";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <a href={business.phone.href} className={`${btn} bg-ink text-paper`}>
            Pozovite
          </a>
          <a href="#upit" className={`${btn} bg-crust text-ink`}>
            Zakažite obilazak
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

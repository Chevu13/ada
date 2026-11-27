"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { navLinks } from "@/data/nav";
import { Logo } from "./Logo";
import { ease } from "./ui";


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const { scrollYProgress } = useScroll();

  // Aktivna stavka menija prati sekciju koja je trenutno na sredini ekrana.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,padding] duration-500 ${
          solid ? "bg-paper/95 py-2 text-ink shadow-[0_1px_0_rgba(23,19,16,.12)] backdrop-blur-md" : "py-4 text-paper"
        } ${menuOpen ? "!bg-ink !text-paper !shadow-none" : ""}`}
      >
        <nav aria-label="Glavna navigacija" className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 md:px-10">
          <a href="#pocetna" aria-label="Gold Ada Exclusive — početna" onClick={() => setMenuOpen(false)}>
            <Logo priority height={solid ? 40 : 52} />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current === l.href ? "location" : undefined}
                  className="group relative font-label text-[0.78rem] font-medium uppercase tracking-[0.24em] transition-colors hover:text-crust"
                >
                  {l.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-crust transition-transform duration-500 group-hover:scale-x-100 ${current === l.href ? "scale-x-100" : "scale-x-0"}`} />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-4">
            <a href={business.phone.href} className="hidden font-label text-[0.85rem] tracking-[0.08em] transition-colors hover:text-crust xl:inline-block">
              {business.phone.display}
            </a>
            <a
              href="#upit"
              className="shine hidden min-h-11 items-center rounded-full bg-crust px-6 font-label text-[0.76rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-gold-light sm:inline-flex"
            >
              Zakažite obilazak
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobilni-meni"
              aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
              className="grid h-11 w-11 place-items-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
        {/* Tanka zlatna linija napretka čitanja */}
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className={`absolute inset-x-0 bottom-0 h-px origin-left bg-crust transition-opacity duration-500 ${solid && !menuOpen ? "opacity-100" : "opacity-0"}`} />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobilni-meni"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pt-28 pb-10 text-paper lg:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.06 }}
                    className="flex items-baseline gap-4 py-1.5 font-display text-[2.6rem] leading-[1.1]"
                  >
                                        {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <a href={business.phone.href} className="flex min-h-13 items-center justify-center rounded-full border border-paper/40 py-3.5 font-label text-[0.76rem] font-medium uppercase tracking-[0.2em]">
                  Pozovite
                </a>
                <a href="#upit" onClick={() => setMenuOpen(false)} className="flex min-h-13 items-center justify-center rounded-full bg-crust py-3.5 font-label text-[0.76rem] font-medium uppercase tracking-[0.2em] text-ink">
                  Obilazak
                </a>
              </div>
              <div className="flex justify-between text-sm text-paper/70">
                <a href={business.phone.href}>{business.phone.display}</a>
                <a href={business.instagram.url} target="_blank" rel="noopener noreferrer">
                  {business.instagram.handle}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

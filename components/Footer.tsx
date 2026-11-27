import { business, occasions } from "@/data/business";
import { navLinks } from "@/data/nav";
import { Logo } from "./Logo";
import { label, wrap } from "./styles";

export function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-28 text-paper/75 md:pb-12">
      <div className={`${wrap} text-center`}>
        <Logo height={96} className="mx-auto" />
        <p className={`${label} mt-6 text-crust`}>{business.tagline}</p>
        <p className="mt-3 text-[0.95rem]">{occasions.join(" · ")}</p>

        <nav aria-label="Brza navigacija" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`${label} transition-colors hover:text-crust`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="mt-10 space-y-1.5 text-[1rem] not-italic">
          <a href={business.maps} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-crust">
            {business.street}, {business.area}, {business.city}
          </a>
          <a href={business.phone.href} className="block font-display text-2xl text-paper transition-colors hover:text-crust">
            {business.phone.display}
          </a>
          <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="block text-crust transition-colors hover:text-paper">
            {business.instagram.handle}
          </a>
        </address>

        <p className="mt-14 border-t border-paper/10 pt-6 text-sm text-paper/45">
          © {new Date().getFullYear()} {business.name} · {business.slogan}
        </p>
      </div>
    </footer>
  );
}

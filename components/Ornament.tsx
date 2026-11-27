/** Diskretan zlatni ornament (linija – romb – linija), kao ukrasi uz "EXCLUSIVE" u logou. */
export function Ornament({ className = "", light = false }: { className?: string; light?: boolean }) {
  const c = light ? "bg-gold-light/70" : "bg-crust/70";
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-px w-12 ${c}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${light ? "bg-gold-light" : "bg-crust"}`} />
      <span className={`h-px w-12 ${c}`} />
    </div>
  );
}

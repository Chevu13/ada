import Image from "next/image";
import logo from "@/assets/images/logo.png";

/** Originalni zlatni logo (izvučen sa Instagram objave, providna pozadina) — radi i na tamnoj i na svetloj podlozi. */
export function Logo({ height = 44, priority = false, className = "" }: { height?: number; priority?: boolean; className?: string }) {
  const width = Math.round((height * logo.width) / logo.height);
  return (
    <Image
      src={logo}
      alt="Gold Ada Exclusive"
      width={width}
      height={height}
      priority={priority}
      style={{ width, height }}
      className={`transition-[width,height] duration-500 ${className}`}
    />
  );
}

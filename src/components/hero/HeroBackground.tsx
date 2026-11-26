import { asset } from "@/lib/base-path";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { heroBackground } from "@/data/hero.config";

/**
 * Decorative, low-opacity background image for the hero. Fades into the page via a CSS mask
 * (see `.hero-bg` in globals.css). Renders nothing if the image file is not present.
 */
export function HeroBackground() {
  const file = path.join(process.cwd(), "public", heroBackground.src.replace(/^\//, ""));
  if (!existsSync(file)) return null;

  const { desktop, tablet, mobile } = heroBackground.opacity;
  return (
    <div
      aria-hidden="true"
      className="hero-bg pointer-events-none absolute inset-y-0 -z-10 select-none"
      style={
        {
          "--bg-op-desktop": desktop,
          "--bg-op-tablet": tablet,
          "--bg-op-mobile": mobile,
        } as React.CSSProperties
      }
    >
      <Image
        src={asset(heroBackground.src)}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        draggable={false}
        className="object-contain object-[right_center]"
      />
    </div>
  );
}

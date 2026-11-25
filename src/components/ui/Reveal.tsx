"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gentle scroll reveal. Content is fully visible in the server-rendered HTML (no JS, or reduced motion,
 * means no hiding at all). After hydration, only elements that start below the fold are hidden and then
 * revealed once on scroll.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return; // already on screen

    el.classList.add("reveal-hidden");
    const raf = requestAnimationFrame(() => el.classList.add("reveal-anim"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-hidden");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.classList.remove("reveal-hidden", "reveal-anim");
    };
  }, []);

  return (
    <div ref={ref} className={className} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

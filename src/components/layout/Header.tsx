"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex min-h-11 items-center gap-3" aria-label={`${profile.name} — home`}>
          <span className="grid size-7 place-items-center border border-line transition-colors group-hover:border-muted" aria-hidden="true">
            <span className="size-2 bg-accent" />
          </span>
          <span className="font-heading text-[0.95rem] font-medium tracking-tight">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center px-3 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-fg ${
                      active ? "text-fg" : "text-muted"
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3 bottom-2 h-px bg-accent" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="grid size-11 place-items-center border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
              <ul className="divide-y divide-line border-y border-line">
                {navigation.map((item, i) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex min-h-16 items-baseline gap-4 py-4 font-heading text-3xl font-medium tracking-tight"
                    >
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

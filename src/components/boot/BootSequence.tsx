"use client";

import { useEffect } from "react";
import { BOOT_STORAGE_KEY, BOOT_TOTAL_MS } from "@/lib/boot";
import { BootEyes } from "./BootEyes";

const DEFAULT_LINES = [
  { text: "INITIALIZING NEURAL CORE...", at: "0.8s", dur: "0.55s" },
  { text: "LOADING INTELLIGENCE MODULES...", at: "1.45s", dur: "0.6s" },
  { text: "SYSTEM ONLINE.", at: "2.15s", dur: "0.35s", final: true },
];

/**
 * Cinematic boot intro: a dormant machine whose eyes power up, then the page is revealed.
 *
 * - Pure CSS/SVG animation (opacity/transform only); no timers drive the visuals.
 * - Plays once per browser tab (sessionStorage) and never on client-side navigation.
 * - Skipped immediately for `prefers-reduced-motion` (CSS + pre-paint script in <head>).
 * - Visibility is controlled by `html[data-boot]`; this component only sets that attribute.
 * - Shows no percentages or progress: the text is part of the intro, not a real loading report.
 */
export function BootSequence({ lines = DEFAULT_LINES }: { lines?: typeof DEFAULT_LINES }) {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.boot) return; // already skipped before paint

    // Keep the page behind the overlay out of the tab order and the accessibility tree while it plays.
    const behind = Array.from(document.body.children).filter((el) => !el.classList.contains("boot"));
    behind.forEach((el) => el.setAttribute("inert", ""));

    const finish = (natural = false) => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
      try {
        sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
      } catch {
        /* storage unavailable: the intro may replay on reload, which is harmless */
      }
      // "done": played to the end (hero timing already correct). "skip": cut short, so page content appears at once.
      root.dataset.boot = natural ? "done" : "skip";
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    const timer = window.setTimeout(() => finish(true), BOOT_TOTAL_MS);
    document.addEventListener("keydown", onKey);
    document.querySelector<HTMLButtonElement>(".boot-skip")?.addEventListener("click", () => finish(), { once: true });
    document.querySelector<HTMLElement>(".boot")?.addEventListener("pointerdown", () => finish(), { once: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
    };
  }, []);

  return (
    <div className="boot" role="group" aria-label="Intro animation">
      <div className="boot-stage" aria-hidden="true">
        <BootEyes className="boot-art" />
        <div className="boot-text">
          {lines.map((l) => (
            <p
              key={l.text}
              className={`boot-line${l.final ? " boot-line-final" : ""}`}
              style={{ "--at": l.at, "--dur": l.dur } as React.CSSProperties}
            >
              {l.final && <span className="boot-dot" />}
              {l.text}
            </p>
          ))}
        </div>
        <div className="boot-scan" />
      </div>
      <button type="button" className="boot-skip">
        Skip intro <span aria-hidden="true">· Esc</span>
      </button>
    </div>
  );
}

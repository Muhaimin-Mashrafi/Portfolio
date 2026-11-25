import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Editorial row: a mono label on the left, content on the right. */
export function Section({ id, label, title, children, border = true }: { id?: string; label: string; title?: string; children: ReactNode; border?: boolean }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className={border ? "border-b border-line" : undefined}>
      <Reveal>
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div>
            <h2 id={id ? `${id}-h` : undefined} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-accent align-middle" aria-hidden="true" />
              {label}
            </h2>
            {title && <p className="mt-4 font-heading text-2xl font-medium tracking-tight lg:max-w-[12rem]">{title}</p>}
          </div>
          <div>{children}</div>
        </div>
      </Reveal>
    </section>
  );
}

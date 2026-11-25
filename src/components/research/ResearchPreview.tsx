import { research } from "@/data/research";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export function ResearchPreview() {
  return (
    <section id="research" aria-labelledby="research-heading" className="border-b border-line">
      <Reveal>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Research &amp; Development
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2.5 border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg">
                <span className="size-1.5 bg-accent" aria-hidden="true" />
                {research.status}
              </p>

              <h2
                id="research-heading"
                className="mt-6 max-w-3xl font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em]"
              >
                {research.title}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{research.overview}</p>

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-muted">{research.institution}</p>
              <div className="mt-4"><TextLink href="/research">Research details</TextLink></div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Research areas</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {research.areas.map((area, i) => (
                  <li key={area} className="flex items-baseline gap-4 py-3.5">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.9375rem] text-fg/90">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

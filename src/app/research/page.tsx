import type { Metadata } from "next";
import { research as r } from "@/data/research";
import { ResearchScope } from "@/components/research/ResearchScope";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Research",
  description: `${r.title} — ongoing collaborative research at United International University.`,
  alternates: { canonical: "/research" },
};

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="max-w-2xl space-y-5 leading-relaxed text-fg/90">{items.map((p) => <p key={p}>{p}</p>)}</div>
);
const Numbered = ({ items }: { items: string[] }) => (
  <ol className="max-w-2xl divide-y divide-line border-y border-line">
    {items.map((it, i) => (
      <li key={it} className="flex items-baseline gap-4 py-3.5">
        <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
        <span className="text-fg/90">{it}</span>
      </li>
    ))}
  </ol>
);

export default function ResearchPage() {
  // Optional sections appear only when the owner has supplied the information.
  const hasPublication = r.paper || r.publicationUrl;
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 md:pb-20 md:pt-20">
          <p className="fade-up flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Research &amp; Development
          </p>
          <p className="fade-up mt-8 inline-flex items-center gap-2.5 border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em]" style={{ "--d": "0.1s" } as React.CSSProperties}>
            <span className="size-1.5 bg-accent" aria-hidden="true" />{r.status}
          </p>
          <h1 className="fade-up mt-6 max-w-5xl font-heading text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em]" style={{ "--d": "0.15s" } as React.CSSProperties}>
            {r.title}
          </h1>
          <p className="fade-up mt-6 font-mono text-xs uppercase tracking-[0.12em] text-muted" style={{ "--d": "0.25s" } as React.CSSProperties}>{r.institution}</p>
        </div>
      </header>

      <Section label="Overview"><Paragraphs items={[r.overview]} /></Section>
      <Section label="Research scope"><ResearchScope /></Section>
      <Section label="Research areas"><Numbered items={r.areas} /></Section>

      {r.abstract && <Section label="Abstract"><Paragraphs items={[r.abstract]} /></Section>}
      {r.objectives.length > 0 && <Section label="Objectives"><Numbered items={r.objectives} /></Section>}
      {r.team.length > 0 && (
        <Section label="Research team">
          <ul className="max-w-2xl divide-y divide-line border-y border-line">
            {r.team.map((m) => (
              <li key={m.name} className="flex items-baseline justify-between gap-4 py-3.5">
                <span>{m.url ? <TextLink href={m.url} external>{m.name}</TextLink> : m.name}</span>
                {m.role && <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{m.role}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {r.supervisor && (
        <Section label="Supervisor">
          <p className="font-heading text-xl">{r.supervisor.name}</p>
          {r.supervisor.affiliation && <p className="mt-1 text-muted">{r.supervisor.affiliation}</p>}
        </Section>
      )}
      {r.contribution && <Section label="My contribution"><Paragraphs items={[r.contribution]} /></Section>}
      {r.methodology.length > 0 && <Section label="Methodology"><Paragraphs items={r.methodology} /></Section>}
      {r.experimentalSetup.length > 0 && <Section label="Experimental setup"><Paragraphs items={r.experimentalSetup} /></Section>}
      {r.findings.length > 0 && <Section label="Findings"><Numbered items={r.findings} /></Section>}
      {hasPublication && (
        <Section label="Publication" border={false}>
          <div className="flex flex-wrap gap-x-8">
            {r.paper && <TextLink href={r.paper.url} external>{r.paper.title}</TextLink>}
            {r.publicationUrl && <TextLink href={r.publicationUrl} external>Publication page</TextLink>}
          </div>
        </Section>
      )}
    </>
  );
}

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { categoryLabels, statusLabels, type ResolvedProject } from "@/types/project";

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="max-w-2xl space-y-5 leading-relaxed text-fg/90">{items.map((p) => <p key={p}>{p}</p>)}</div>
);
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="max-w-2xl divide-y divide-line border-y border-line">
    {items.map((i) => (
      <li key={i} className="flex gap-4 py-3.5 leading-relaxed text-fg/90">
        <span className="mt-2.5 size-1.5 shrink-0 bg-accent" aria-hidden="true" />
        {i}
      </li>
    ))}
  </ul>
);

/** Every section is rendered only when the project data contains verified content for it. */
export function ProjectDetail({ project }: { project: ResolvedProject }) {
  const d = project.details ?? {};
  const g = project.github;
  return (
    <>
      <Section label="Overview" border>
        <div className="max-w-2xl space-y-5 leading-relaxed text-fg/90">
          <p>{d.overview ?? project.description}</p>
          {project.context && <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{project.context}</p>}
        </div>
      </Section>
      {d.problem && <Section label="Problem"><Paragraphs items={[d.problem]} /></Section>}
      {d.solution && <Section label="Solution"><Paragraphs items={[d.solution]} /></Section>}
      {d.features && d.features.length > 0 && <Section label="Key features"><Bullets items={d.features} /></Section>}
      {d.architecture && d.architecture.length > 0 && <Section label="Architecture"><Paragraphs items={d.architecture} /></Section>}
      <Section label="Technologies"><TagList items={project.technologies} label="Technologies used" /></Section>
      {d.implementation && d.implementation.length > 0 && <Section label="Implementation"><Paragraphs items={d.implementation} /></Section>}
      {d.screenshots && d.screenshots.length > 0 && (
        <Section label="Screenshots">
          <div className="grid gap-6 md:grid-cols-2">
            {d.screenshots.map((s) => (
              <figure key={s.src}>
                <Image src={s.src} alt={s.alt} width={1200} height={750} className="h-auto w-full border border-line" loading="lazy" />
                {s.caption && <figcaption className="mt-2 font-mono text-xs text-muted">{s.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </Section>
      )}
      {d.results && d.results.length > 0 && (
        <Section label="Results">
          <dl className="max-w-2xl divide-y divide-line border-y border-line">
            {d.results.map((r) => (
              <div key={r.label} className="py-4 sm:grid sm:grid-cols-[1fr_auto] sm:gap-6">
                <dt className="text-fg/90">{r.label}</dt>
                <dd className="font-mono text-sm">{r.value} <span className="text-muted">· {r.source}</span></dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
      <Section label="Links">
        <div className="flex flex-wrap gap-x-8">
          {g && !g.isPrivate && <TextLink href={g.url} external>GitHub repository</TextLink>}
          {project.demoUrl && <TextLink href={project.demoUrl} external>Live demonstration</TextLink>}
          {g?.homepage && <TextLink href={g.homepage} external>Project homepage</TextLink>}
        </div>
        {g && !g.isPrivate && (g.language || g.license || g.updatedAt || g.stars !== undefined) && (
          <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            {g.language && <div><dt className="inline">Language </dt><dd className="inline text-fg">{g.language}</dd></div>}
            {g.license && <div><dt className="inline">Licence </dt><dd className="inline text-fg">{g.license}</dd></div>}
            {g.stars !== undefined && <div><dt className="inline">Stars </dt><dd className="inline text-fg">{g.stars}</dd></div>}
            {g.updatedAt && <div><dt className="inline">Updated </dt><dd className="inline text-fg">{g.updatedAt.slice(0, 10)}</dd></div>}
          </dl>
        )}
      </Section>
      {d.futureImprovements && d.futureImprovements.length > 0 && <Section label="Future improvements"><Bullets items={d.futureImprovements} /></Section>}
    </>
  );
}

export const projectMeta = (p: ResolvedProject) =>
  [categoryLabels[p.category], p.status && statusLabels[p.status]].filter(Boolean).join(" · ");

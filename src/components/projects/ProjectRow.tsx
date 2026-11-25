import Link from "next/link";
import { TagList } from "@/components/ui/Tag";
import { TextLink } from "@/components/ui/TextLink";
import { categoryLabels, statusLabels, type ResolvedProject } from "@/types/project";

export function ProjectRow({ project, index }: { project: ResolvedProject; index: number }) {
  const meta = [categoryLabels[project.category], project.status && statusLabels[project.status]].filter(Boolean).join(" · ");
  return (
    <article className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr] md:gap-10">
      <p className="font-mono text-xs text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{meta}</p>
        <h3 className="mt-3 font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
          <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-muted">{project.name}</Link>
        </h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.description}</p>
        {project.context && <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">{project.context}</p>}
        <div className="mt-5"><TagList items={project.technologies} label={`${project.name} technologies`} /></div>
        <div className="mt-4 flex flex-wrap gap-x-6">
          <TextLink href={`/projects/${project.slug}`}>View details</TextLink>
          {project.github && !project.github.isPrivate && <TextLink href={project.github.url} external>GitHub</TextLink>}
          {project.demoUrl && <TextLink href={project.demoUrl} external>Live demo</TextLink>}
        </div>
      </div>
    </article>
  );
}

import { z } from "zod";
import { curatedProjects } from "@/data/projects";
import { portfolioConfig } from "@/data/portfolio.config";
import generatedRaw from "@/data/generated/projects.json";
import { githubMetaSchema, type Project, type ResolvedProject } from "@/types/project";

/**
 * Phase 4 writes `src/data/generated/projects.json` (GitHub API output). Until then it is an empty array.
 * Generated metadata only refreshes the `github` block of a curated project; it never overrides owner-written
 * name, description or details, and it never publishes a repository by itself.
 */
const generated = (() => {
  const parsed = z.array(githubMetaSchema).safeParse(generatedRaw);
  return parsed.success ? parsed.data : []; // a bad generated file must never break the site
})();

function resolve(): ResolvedProject[] {
  const excluded = new Set(portfolioConfig.excluded.map((r) => r.toLowerCase()));
  return curatedProjects
    .filter((p) => !(p.github && excluded.has(p.github.repo.toLowerCase())))
    .map((p): ResolvedProject => {
      const fresh = p.github && generated.find((g) => g.repo.toLowerCase() === p.github!.repo.toLowerCase());
      const github = p.github ? { ...p.github, ...(fresh ?? {}) } : undefined;
      return { ...p, github, featured: portfolioConfig.featured.includes(p.slug) };
    });
}

const all = resolve();

/** Public projects only: hidden entries are never rendered or routed. */
export function getPublicProjects(): ResolvedProject[] {
  return all.filter((p) => p.visibility === "public");
}

/** Featured projects in the order given by `portfolioConfig.featured`. */
export function getFeaturedProjects(): ResolvedProject[] {
  const publicProjects = getPublicProjects();
  return portfolioConfig.featured
    .map((slug) => publicProjects.find((p) => p.slug === slug))
    .filter((p): p is ResolvedProject => Boolean(p));
}

export function getProject(slug: string): ResolvedProject | undefined {
  return getPublicProjects().find((p) => p.slug === slug);
}

/** For the owner: projects that exist in the data but are not published, with the reason. */
export function getUnpublishedProjects(): Project[] {
  return all.filter((p) => p.visibility !== "public");
}

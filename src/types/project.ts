import { z } from "zod";

export const projectCategory = z.enum(["web-app", "ai-ml", "systems", "research", "tool", "academic"]);
export const projectStatus = z.enum(["completed", "in-development", "archived", "planned"]);

export const categoryLabels: Record<z.infer<typeof projectCategory>, string> = {
  "web-app": "Web application",
  "ai-ml": "AI / Machine learning",
  systems: "Software systems",
  research: "Research",
  tool: "Tool",
  academic: "Academic",
};
export const statusLabels: Record<z.infer<typeof projectStatus>, string> = {
  completed: "Completed",
  "in-development": "In development",
  archived: "Archived",
  planned: "Planned",
};

const image = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
  caption: z.string().optional(),
});

/** GitHub metadata. Phase 4 synchronisation fills / refreshes these fields from the GitHub API. */
export const githubMetaSchema = z.object({
  repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/, "expected owner/name"),
  url: z.url(),
  homepage: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  topics: z.array(z.string()).optional(),
  stars: z.number().int().nonnegative().optional(),
  forks: z.number().int().nonnegative().optional(),
  updatedAt: z.string().optional(),
  license: z.string().nullable().optional(),
  isPrivate: z.boolean().optional(),
  /** Repository description from GitHub (plain text). Not used to replace owner-written descriptions. */
  description: z.string().nullable().optional(),
  /** Language breakdown by share of code, largest first. */
  languages: z.array(z.object({ name: z.string(), percent: z.number().min(0).max(100) })).optional(),
  /** README converted to sanitised HTML at sync time (scripts, raw HTML, images and unsafe links removed). */
  readmeHtml: z.string().nullable().optional(),
});

/** Shape of `src/data/generated/projects.json`, written only by `pnpm sync:projects`. */
export const generatedFileSchema = z.object({
  generatedAt: z.string().nullable(),
  user: z.string().nullable(),
  topic: z.string().nullable(),
  repos: z.array(githubMetaSchema),
});
export type GeneratedFile = z.infer<typeof generatedFileSchema>;

/** Owner-authored detail sections. Every field is optional: a missing field means the section is not rendered. */
export const projectDetailsSchema = z.object({
  overview: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  features: z.array(z.string()).optional(),
  architecture: z.array(z.string()).optional(),
  implementation: z.array(z.string()).optional(),
  screenshots: z.array(image).optional(),
  /** Only verified results. Every metric must name where it was measured/reported. */
  results: z.array(z.object({ label: z.string(), value: z.string(), source: z.string() })).optional(),
  futureImprovements: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  description: z.string().min(1),
  category: projectCategory,
  technologies: z.array(z.string()).min(1),
  status: projectStatus.optional(),
  /** Short note on the context, e.g. a course project. Shown as-is. */
  context: z.string().optional(),
  thumbnail: image.optional(),
  /** "public" projects are rendered; "hidden" projects are kept in the data but never rendered or routed. */
  visibility: z.enum(["public", "hidden"]),
  /** "needs-review": the owner must confirm the facts before the project is made public. */
  reviewStatus: z.enum(["verified", "needs-review"]),
  /** Private note for the owner (never rendered). */
  reviewNote: z.string().optional(),
  demoUrl: z.url().optional(),
  github: githubMetaSchema.optional(),
  details: projectDetailsSchema.optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type GithubMeta = z.infer<typeof githubMetaSchema>;
export type ProjectDetails = z.infer<typeof projectDetailsSchema>;
/** A project after configuration is applied. */
export type ResolvedProject = Project & { featured: boolean };

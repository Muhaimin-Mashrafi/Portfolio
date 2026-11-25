import { projectSchema, type Project } from "@/types/project";
import cropverse from "./cropverse.json";

/**
 * Curated project catalogue. Add a project by creating `<slug>.json` here and listing it below.
 * Unpublished drafts live in /drafts/projects (git-ignored, so private notes never reach GitHub).
 * Every file is validated with Zod at build time; invalid data fails the build with a clear message.
 */
const raw: unknown[] = [cropverse];

export const curatedProjects: Project[] = raw.map((entry) => projectSchema.parse(entry));

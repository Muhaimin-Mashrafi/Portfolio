import { projectSchema, type Project } from "@/types/project";
import cropverse from "./cropverse.json";
import afterfall from "./afterfall.json";
import cropGuardian from "./crop-guardian.json";

/**
 * Curated project catalogue. Add a project by creating `<slug>.json` here and listing it below.
 * Every file is validated with Zod at build time; invalid data fails the build with a clear message.
 */
const raw: unknown[] = [cropverse, afterfall, cropGuardian];

export const curatedProjects: Project[] = raw.map((entry) => projectSchema.parse(entry));

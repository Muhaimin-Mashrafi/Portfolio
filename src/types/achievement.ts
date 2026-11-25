import { z } from "zod";

export const achievementCategory = z.enum([
  "certification",
  "research-milestone",
  "academic",
  "award",
  "publication",
  "professional",
]);

export const achievementCategoryLabels: Record<z.infer<typeof achievementCategory>, string> = {
  certification: "Certifications",
  "research-milestone": "Research milestones",
  academic: "Academic achievements",
  award: "Awards",
  publication: "Publications",
  "professional": "Professional milestones",
};

export const achievementSchema = z.object({
  title: z.string().min(1),
  category: achievementCategory,
  description: z.string().optional(),
  /** ISO date (YYYY-MM or YYYY-MM-DD). */
  date: z.string().regex(/^\d{4}(-\d{2}){0,2}$/).optional(),
  verificationUrl: z.url().optional(),
  /** Path under /public, e.g. /images/achievements/cert.png */
  image: z.object({ src: z.string().startsWith("/"), alt: z.string().min(1) }).optional(),
  /** Set to "hidden" to keep an entry in the file without showing it. */
  visibility: z.enum(["public", "hidden"]).default("public"),
});

export const achievementsFileSchema = z.array(achievementSchema);
export type Achievement = z.infer<typeof achievementSchema>;

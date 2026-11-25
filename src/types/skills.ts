import { z } from "zod";

export const skillCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  /** Only add skills the owner has verified. Empty categories are not rendered. */
  items: z.array(z.object({ name: z.string(), level: z.string().optional(), note: z.string().optional() })),
});
export const skillsSchema = z.array(skillCategorySchema);
export type SkillCategory = z.infer<typeof skillCategorySchema>;

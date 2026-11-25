import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string(),
  institutionShort: z.string(),
  url: z.url().optional(),
  // Each field is hidden until verified by the owner.
  degree: z.string().nullable(),
  department: z.string().nullable(),
  academicPeriod: z.string().nullable(),
  graduationYear: z.string().nullable(),
  coursework: z.array(z.string()),
  academicProjects: z.array(z.string()),
  academicAchievements: z.array(z.string()),
});
export type Education = z.infer<typeof educationSchema>;

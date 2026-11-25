import { educationSchema } from "@/types/education";

/**
 * Academic background. Only the institution is verified so far.
 * Fill the remaining fields (replace `null` / `[]`) once confirmed — they appear on the site automatically.
 */
export const education = educationSchema.parse({
  institution: "United International University",
  institutionShort: "UIU",
  degree: null,
  department: null,
  academicPeriod: null,
  graduationYear: null,
  coursework: [],
  academicProjects: [],
  academicAchievements: [],
});

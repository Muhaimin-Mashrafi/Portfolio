import { z } from "zod";

/** Every optional field is hidden until the owner supplies it. */
export const researchSchema = z.object({
  title: z.string(),
  status: z.string(),
  institution: z.string(),
  overview: z.string(),
  areas: z.array(z.string()).min(1),
  abstract: z.string().nullable(),
  objectives: z.array(z.string()),
  team: z.array(z.object({ name: z.string(), role: z.string().optional(), url: z.url().optional() })),
  supervisor: z.object({ name: z.string(), affiliation: z.string().optional(), url: z.url().optional() }).nullable(),
  contribution: z.string().nullable(),
  methodology: z.array(z.string()),
  experimentalSetup: z.array(z.string()),
  findings: z.array(z.string()),
  paper: z.object({ title: z.string(), url: z.url() }).nullable(),
  publicationUrl: z.url().nullable(),
});
export type Research = z.infer<typeof researchSchema>;

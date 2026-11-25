import { researchSchema } from "@/types/research";

/**
 * Current research. Only verified information belongs here.
 * Everything left as `null` / `[]` is hidden on the site. Fill a field in and it appears automatically.
 */
export const research = researchSchema.parse({
  title: "Data Poisoning in External Knowledge Bases of Large Language Models Through Cross-Lingual Queries",
  status: "Ongoing · Collaborative Research",
  institution: "United International University (UIU)",
  overview:
    "I am part of a research team investigating data poisoning vulnerabilities in external knowledge bases used by Large Language Models, with particular attention to cross-lingual query-based attacks.",
  areas: [
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "External Knowledge Base Security",
    "Data Poisoning",
    "Cross-Lingual Query Processing",
    "AI Security and Robustness",
  ],
  abstract: null,
  objectives: [],
  team: [],
  supervisor: null,
  contribution: null,
  methodology: [],
  experimentalSetup: [],
  findings: [],
  paper: null,
  publicationUrl: null,
});

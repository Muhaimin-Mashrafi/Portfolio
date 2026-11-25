/**
 * Current research. Only verified information belongs here.
 * Optional fields (null) are not rendered until you supply them — add them when ready:
 * abstract, objectives, team, supervisor, contribution, methodology, setup, findings, paper, publications.
 */
export type Research = {
  title: string;
  status: string;
  institution: string;
  context: string;
  areas: readonly string[];
  // Not published until supplied by the owner:
  contribution: string | null;
  abstract: string | null;
  paperUrl: string | null;
};

export const research: Research = {
  title: "Data Poisoning in External Knowledge Bases of Large Language Models Through Cross-Lingual Queries",
  status: "Ongoing · Collaborative Research",
  institution: "United International University (UIU)",
  context:
    "I am part of a research team investigating data poisoning vulnerabilities in external knowledge bases used by Large Language Models, with particular attention to cross-lingual query-based attacks.",
  areas: [
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "External Knowledge Base Security",
    "Data Poisoning",
    "Cross-Lingual Query Processing",
    "AI Security and Robustness",
  ],
  contribution: null,
  abstract: null,
  paperUrl: null,
};

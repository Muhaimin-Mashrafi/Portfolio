/**
 * Project catalogue configuration.
 * - `featured`: ordered list of project slugs shown on the homepage ("Selected Projects").
 * - `excluded`: GitHub repos ("owner/name") that must never appear, including once Phase 4 auto-discovery is on.
 * - `projectTopic` / `autoDiscover`: used by the Phase 4 GitHub synchronisation (not active yet).
 */
export const portfolioConfig = {
  githubUser: "Muhaimin-Mashrafi",
  projectTopic: "portfolio",
  autoDiscover: false,
  featured: ["cropverse"] as string[],
  excluded: [] as string[],
};

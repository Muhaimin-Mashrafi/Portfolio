/**
 * Refreshes src/data/generated/projects.json from the GitHub API.
 * Usage: pnpm sync:projects   (optional env: GITHUB_TOKEN for a higher rate limit; never printed)
 * Exit code 1 when the listing failed or any repository failed; the existing file is never overwritten with bad data.
 */
import { readFileSync, writeFileSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { generatedFileSchema, type GeneratedFile } from "../src/types/project";
import { portfolioConfig } from "../src/data/portfolio.config";
import { curatedProjects } from "../src/data/projects";
import { sameContent, syncProjects } from "../src/lib/sync/sync";

const file = resolve(__dirname, "../src/data/generated/projects.json");
const empty: GeneratedFile = { generatedAt: null, user: null, topic: null, repos: [] };

function loadPrevious(): GeneratedFile {
  try {
    const parsed = generatedFileSchema.safeParse(JSON.parse(readFileSync(file, "utf8")));
    return parsed.success ? parsed.data : empty;
  } catch {
    return empty;
  }
}

async function main() {
  const previous = loadPrevious();
  const report = await syncProjects({
    user: portfolioConfig.githubUser,
    topic: portfolioConfig.projectTopic,
    excluded: portfolioConfig.excluded,
    curatedRepos: curatedProjects.flatMap((p) => (p.github ? [p.github.repo] : [])),
    autoDiscover: portfolioConfig.autoDiscover,
    fetcher: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(20_000) }),
    token: process.env.GITHUB_TOKEN,
    previous,
    log: (m) => console.error(`[sync] ${m}`),
  });

  for (const s of report.skipped) console.log(`[sync] skipped ${s.repo}: ${s.reason}`);
  for (const r of report.synced) console.log(`[sync] synced ${r}`);
  for (const f of report.failures) console.error(`[sync] FAILED ${f.repo}: ${f.error}`);

  if (!report.preserved && !sameContent(report.data, previous)) {
    const tmp = `${file}.tmp`;
    writeFileSync(tmp, JSON.stringify(report.data, null, 2) + "\n");
    renameSync(tmp, file); // atomic replace: a crash never leaves a half-written file
    console.log("[sync] projects.json updated");
    process.exitCode = report.ok ? 0 : 1;
  } else {
    console.log("[sync] no changes");
    process.exitCode = report.failures.length ? 1 : 0;
  }
}

main().catch((e) => {
  console.error(`[sync] unexpected error: ${e instanceof Error ? e.message : "unknown"}`);
  process.exitCode = 1;
});

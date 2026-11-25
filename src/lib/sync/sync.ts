import { generatedFileSchema, githubMetaSchema, type GeneratedFile, type GithubMeta } from "../../types/project";
import { createClient, type Fetcher, type RawRepo } from "./github";
import { sanitizeReadme } from "./sanitize";

export interface SyncOptions {
  user: string;
  topic: string;
  /** "owner/name" entries that must never be synced. */
  excluded: string[];
  /** Repositories that are part of the curated catalogue; their metadata is refreshed even if the topic is missing. */
  curatedRepos: string[];
  /** Whether repos that are not curated should be synced when they carry the topic. */
  autoDiscover: boolean;
  fetcher: Fetcher;
  token?: string;
  previous: GeneratedFile;
  now?: () => Date;
  log?: (msg: string) => void;
}

export interface SyncReport {
  ok: boolean;
  data: GeneratedFile;
  /** True when `data` is the unchanged previous file (nothing was written). */
  preserved: boolean;
  synced: string[];
  skipped: { repo: string; reason: string }[];
  failures: { repo: string; error: string }[];
}

/** Why a repository must not be published automatically (null = eligible). */
export function ineligibleReason(r: RawRepo, user: string, excluded: Set<string>): string | null {
  if (r.private) return "private";
  if (excluded.has(r.full_name.toLowerCase())) return "excluded in configuration";
  if (r.fork) return "fork (authorship must be verified manually)";
  if (r.name.toLowerCase() === user.toLowerCase()) return "profile README repository";
  if (r.size === 0) return "empty repository";
  return null;
}

function toMeta(r: RawRepo, languages: Record<string, number>, readmeHtml: string | null): GithubMeta {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  const langs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({ name, percent: total ? Math.round((bytes / total) * 1000) / 10 : 0 }));
  return githubMetaSchema.parse({
    repo: r.full_name,
    url: r.html_url,
    homepage: r.homepage || null,
    language: r.language,
    topics: r.topics,
    stars: r.stargazers_count,
    forks: r.forks_count,
    updatedAt: r.pushed_at ?? r.updated_at,
    license: r.license?.spdx_id && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : null,
    isPrivate: false,
    description: r.description,
    languages: langs,
    readmeHtml,
  });
}

/**
 * Pure orchestration (no file or network access except through `fetcher`).
 * Guarantees: the returned data always validates; on a listing failure the previous data is returned untouched;
 * on a per-repository failure that repository's previous entry is kept.
 */
export async function syncProjects(o: SyncOptions): Promise<SyncReport> {
  const log = o.log ?? (() => {});
  const client = createClient(o.fetcher, o.token);
  const excluded = new Set(o.excluded.map((e) => e.toLowerCase()));
  const curated = new Set(o.curatedRepos.map((e) => e.toLowerCase()));
  const report: SyncReport = { ok: false, data: o.previous, preserved: true, synced: [], skipped: [], failures: [] };

  let repos: RawRepo[];
  try {
    repos = await client.listPublicRepos(o.user);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    log(`Repository listing failed: ${msg}. Keeping last good data.`);
    report.failures.push({ repo: "*", error: msg });
    return report;
  }

  const next: GithubMeta[] = [];
  for (const r of repos) {
    const hasTopic = r.topics.includes(o.topic);
    const isCurated = curated.has(r.full_name.toLowerCase());
    if (!hasTopic && !isCurated) continue;
    const reason = ineligibleReason(r, o.user, excluded);
    if (reason) {
      report.skipped.push({ repo: r.full_name, reason });
      continue;
    }
    if (!isCurated && !o.autoDiscover) {
      report.skipped.push({ repo: r.full_name, reason: "discovered but autoDiscover is off; add it to the curated catalogue to publish" });
      continue;
    }
    try {
      const [languages, readme] = await Promise.all([client.languages(r.full_name), client.readme(r.full_name)]);
      const readmeHtml = readme ? await sanitizeReadme(readme) : null;
      next.push(toMeta(r, languages, readmeHtml));
      report.synced.push(r.full_name);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown error";
      report.failures.push({ repo: r.full_name, error: msg });
      const old = o.previous.repos.find((p) => p.repo.toLowerCase() === r.full_name.toLowerCase());
      if (old) next.push(old);
      log(`Failed to sync ${r.full_name}: ${msg}${old ? " (kept previous entry)" : ""}`);
    }
  }

  next.sort((a, b) => a.repo.localeCompare(b.repo));
  const candidate = { generatedAt: (o.now ?? (() => new Date()))().toISOString(), user: o.user, topic: o.topic, repos: next };
  const parsed = generatedFileSchema.safeParse(candidate);
  if (!parsed.success) {
    log("Generated data failed validation. Keeping last good data.");
    report.failures.push({ repo: "*", error: "validation failed" });
    return report;
  }
  report.ok = report.failures.every((f) => f.repo !== "*");
  report.data = parsed.data;
  report.preserved = false;
  return report;
}

/** Compare two files ignoring the timestamp, so a no-op run produces no commit. */
export function sameContent(a: GeneratedFile, b: GeneratedFile): boolean {
  return JSON.stringify({ ...a, generatedAt: null }) === JSON.stringify({ ...b, generatedAt: null });
}

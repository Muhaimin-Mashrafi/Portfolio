import { z } from "zod";

/** Minimal slice of `fetch`, so tests can inject a mock. */
export type Fetcher = (url: string, init?: { headers?: Record<string, string> }) => Promise<{
  ok: boolean;
  status: number;
  headers: { get(name: string): string | null };
  json(): Promise<unknown>;
  text(): Promise<string>;
}>;

export class GithubApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "GithubApiError";
  }
}

const repoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  homepage: z.string().nullable().optional(),
  language: z.string().nullable(),
  topics: z.array(z.string()).default([]),
  stargazers_count: z.number().int(),
  forks_count: z.number().int(),
  pushed_at: z.string().nullable().optional(),
  updated_at: z.string(),
  private: z.boolean(),
  fork: z.boolean(),
  archived: z.boolean(),
  size: z.number().int(),
  license: z.object({ spdx_id: z.string().nullable() }).nullable().optional(),
});
export type RawRepo = z.infer<typeof repoSchema>;

export function createClient(fetcher: Fetcher, token?: string) {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "portfolio-sync" };
  // The token is only ever sent as a header to api.github.com; it is never logged or written to disk.
  if (token) headers.Authorization = `Bearer ${token}`;
  const base = "https://api.github.com";

  async function get(path: string) {
    const res = await fetcher(`${base}${path}`, { headers });
    if (!res.ok) {
      const limited = res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0";
      throw new GithubApiError(limited ? "GitHub API rate limit reached" : `GitHub API ${res.status} for ${path}`, res.status);
    }
    return res;
  }

  return {
    /** Public repositories of a user. Uses the public listing, so private repositories can never be returned. */
    async listPublicRepos(user: string): Promise<RawRepo[]> {
      const out: RawRepo[] = [];
      for (let page = 1; page <= 5; page++) {
        const res = await get(`/users/${encodeURIComponent(user)}/repos?type=owner&per_page=100&page=${page}`);
        const items = z.array(repoSchema).parse(await res.json());
        out.push(...items);
        if (items.length < 100) break;
      }
      return out;
    },
    async languages(fullName: string): Promise<Record<string, number>> {
      const res = await get(`/repos/${fullName}/languages`);
      return z.record(z.string(), z.number()).parse(await res.json());
    },
    /** Raw README markdown, or null when the repository has none. */
    async readme(fullName: string): Promise<string | null> {
      try {
        const res = await fetcher(`${base}/repos/${fullName}/readme`, { headers: { ...headers, Accept: "application/vnd.github.raw+json" } });
        if (res.status === 404) return null;
        if (!res.ok) throw new GithubApiError(`GitHub API ${res.status} for README`, res.status);
        return await res.text();
      } catch (e) {
        if (e instanceof GithubApiError) throw e;
        throw new GithubApiError("README request failed", 0);
      }
    },
  };
}

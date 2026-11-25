import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeReadme } from "../src/lib/sync/sanitize";
import { syncProjects, sameContent } from "../src/lib/sync/sync";
import { generatedFileSchema, type GeneratedFile } from "../src/types/project";
import type { Fetcher } from "../src/lib/sync/github";

const repo = (o: Record<string, unknown>) => ({
  name: "Corpverse", full_name: "Muhaimin-Mashrafi/Corpverse", html_url: "https://github.com/Muhaimin-Mashrafi/Corpverse",
  description: "d", homepage: "", language: "JavaScript", topics: ["portfolio"], stargazers_count: 1, forks_count: 0,
  pushed_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z", private: false, fork: false, archived: false, size: 10,
  license: null, ...o,
});
const res = (status: number, body: unknown, headers: Record<string, string> = {}) => ({
  ok: status < 400, status, headers: { get: (n: string) => headers[n.toLowerCase()] ?? null },
  json: async () => body, text: async () => String(body),
});
const makeFetch = (repos: unknown[], opts: { readme?: string; failLang?: boolean } = {}): Fetcher => async (url) => {
  if (url.includes("/users/")) return res(200, repos);
  if (url.endsWith("/languages")) return opts.failLang ? res(500, {}) : res(200, { JavaScript: 750, CSS: 250 });
  if (url.endsWith("/readme")) return res(200, opts.readme ?? "# Hi\n\nText");
  return res(404, {});
};
const empty: GeneratedFile = { generatedAt: null, user: null, topic: null, repos: [] };
const base = { user: "Muhaimin-Mashrafi", topic: "portfolio", excluded: [] as string[], curatedRepos: ["Muhaimin-Mashrafi/Corpverse"], autoDiscover: false, previous: empty };

test("sanitizer removes scripts, raw HTML, handlers, images and javascript: links", async () => {
  const html = await sanitizeReadme(
    '# T\n\n<script>alert(1)</script>\n<img src=x onerror="alert(1)">\n<iframe src="https://evil"></iframe>\n\n[x](javascript:alert(1)) [ok](https://example.com)\n\n![i](a.png)',
  );
  for (const bad of ["<script", "onerror", "<iframe", "javascript:", "<img", "alert(1)<"]) assert.ok(!html.includes(bad), `found ${bad}`);
  assert.ok(html.includes('href="https://example.com"'));
  assert.ok(html.includes("noopener"));
});

test("sync produces schema-valid data with language percentages", async () => {
  const r = await syncProjects({ ...base, fetcher: makeFetch([repo({})]) });
  assert.equal(r.ok, true);
  assert.equal(generatedFileSchema.safeParse(r.data).success, true);
  assert.deepEqual(r.data.repos[0].languages, [{ name: "JavaScript", percent: 75 }, { name: "CSS", percent: 25 }]);
});

test("private, fork, empty, profile and excluded repos are never synced", async () => {
  const repos = [
    repo({ name: "AfterFall", full_name: "Muhaimin-Mashrafi/AfterFall", private: true }),
    repo({ name: "crop-guardian", full_name: "Muhaimin-Mashrafi/crop-guardian", fork: true }),
    repo({ name: "Python-Programing", full_name: "Muhaimin-Mashrafi/Python-Programing", size: 0 }),
    repo({ name: "Muhaimin-Mashrafi", full_name: "Muhaimin-Mashrafi/Muhaimin-Mashrafi" }),
    repo({ name: "x", full_name: "Muhaimin-Mashrafi/x" }),
  ];
  const r = await syncProjects({ ...base, curatedRepos: [], autoDiscover: true, excluded: ["Muhaimin-Mashrafi/x"], fetcher: makeFetch(repos) });
  assert.deepEqual(r.synced, []);
  assert.equal(r.skipped.length, 5);
});

test("discovered but non-curated repos are not published while autoDiscover is off", async () => {
  const r = await syncProjects({ ...base, curatedRepos: [], fetcher: makeFetch([repo({})]) });
  assert.deepEqual(r.synced, []);
  const on = await syncProjects({ ...base, curatedRepos: [], autoDiscover: true, fetcher: makeFetch([repo({})]) });
  assert.deepEqual(on.synced, ["Muhaimin-Mashrafi/Corpverse"]);
});

test("API failure preserves last good data and reports it", async () => {
  const good = await syncProjects({ ...base, fetcher: makeFetch([repo({})]) });
  const failing: Fetcher = async () => res(500, {});
  const r = await syncProjects({ ...base, previous: good.data, fetcher: failing });
  assert.equal(r.ok, false);
  assert.equal(r.preserved, true);
  assert.deepEqual(r.data, good.data);
  assert.match(r.failures[0].error, /500/);
});

test("rate limiting is reported clearly and keeps previous data", async () => {
  const limited: Fetcher = async () => res(403, {}, { "x-ratelimit-remaining": "0" });
  const r = await syncProjects({ ...base, fetcher: limited });
  assert.match(r.failures[0].error, /rate limit/);
  assert.equal(r.preserved, true);
});

test("per-repository failure keeps that repository's previous entry", async () => {
  const good = await syncProjects({ ...base, fetcher: makeFetch([repo({ stargazers_count: 7 })]) });
  const r = await syncProjects({ ...base, previous: good.data, fetcher: makeFetch([repo({ stargazers_count: 9 })], { failLang: true }) });
  assert.equal(r.failures.length, 1);
  assert.equal(r.data.repos[0].stars, 7);
});

test("malformed API payload does not overwrite previous data", async () => {
  const bad: Fetcher = async () => res(200, [{ nonsense: true }]);
  const r = await syncProjects({ ...base, fetcher: bad });
  assert.equal(r.preserved, true);
  assert.equal(r.ok, false);
});

test("sameContent ignores the timestamp only", async () => {
  const a = await syncProjects({ ...base, fetcher: makeFetch([repo({})]), now: () => new Date(0) });
  const b = await syncProjects({ ...base, fetcher: makeFetch([repo({})]), now: () => new Date(1e12) });
  assert.equal(sameContent(a.data, b.data), true);
  const c = await syncProjects({ ...base, fetcher: makeFetch([repo({ stargazers_count: 5 })]) });
  assert.equal(sameContent(a.data, c.data), false);
});

test("token is only sent as an Authorization header to api.github.com", async () => {
  const seen: { url: string; auth?: string }[] = [];
  const f: Fetcher = async (url, init) => {
    seen.push({ url, auth: init?.headers?.Authorization });
    return makeFetch([repo({})])(url, init);
  };
  await syncProjects({ ...base, token: "SECRET", fetcher: f });
  assert.ok(seen.length > 0 && seen.every((s) => s.url.startsWith("https://api.github.com/") && s.auth === "Bearer SECRET"));
});

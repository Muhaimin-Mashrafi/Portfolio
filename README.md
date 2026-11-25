# Abdullah Al Muhaimin — Portfolio

Next.js 16 (App Router, static generation), React 19, TypeScript, Tailwind CSS 4, Zod. Hosted on Vercel.

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

Requires Node 22 and pnpm 10 (see `.nvmrc`, `packageManager`).

## Where content lives

| What | File |
| --- | --- |
| Name, headline, links, email, CV path, about text | `src/data/profile.ts` |
| Research | `src/data/research.ts` |
| Skills / education | `src/data/skills.ts`, `src/data/education.ts` |
| Achievements | `src/data/achievements.json` |
| Projects | `src/data/projects/*.json` + `src/data/projects/index.ts` |
| Featured projects, exclusions, auto-discovery | `src/data/portfolio.config.ts` |
| Hero background image | `src/data/hero.config.ts` (no image is shipped) |
| Boot animation | `src/components/boot/*`, `src/lib/boot.ts`, `.boot-*` in `globals.css` |

Optional fields that are empty are simply not rendered. Nothing is invented: add a fact to the data file and it appears.

## Common tasks

**Add an email address** — set `email` in `src/data/profile.ts`. The Contact page and footer show it automatically.

**Add or replace the CV** — put the PDF at `public/cv/Abdullah-Al-Muhaimin-CV.pdf` and push. The CV is detected at build time, and a push triggers a fresh Vercel build, so the "Download" and "Open" buttons appear after that deploy. (Locally, run `rm -rf .next` before `pnpm build` if you add the file after a previous build.)

**Add an achievement** — add an object to `src/data/achievements.json` (see `src/types/achievement.ts` for fields: title, category, issuer, date, optional url). Push; Vercel rebuilds. Achievements are never inferred from commits or stars.

**Add a project** — create `src/data/projects/<slug>.json` (schema: `src/types/project.ts`), register it in `src/data/projects/index.ts`, add its slug to `featured` in `portfolio.config.ts` if it should be on the homepage. Put screenshots in `public/images/projects/` and list them under `details.screenshots` with alt text. Use `visibility: "hidden"` while a project is not ready. Keep private notes in `drafts/` (git-ignored).

**Exclude a repository** — add `"owner/name"` to `excluded` in `portfolio.config.ts`.

**Custom thumbnail / overrides** — a curated project's JSON is the override: set `thumbnail`, `name`, `description` or `details` there. GitHub data only refreshes the `github` block (stars, languages, topics, README) and never replaces your text.

## GitHub synchronisation

`pnpm sync:projects` reads the public repositories of `portfolioConfig.githubUser`, and for every repository that is in the curated catalogue (or carries the `portfolio` topic when `autoDiscover` is on) fetches metadata, languages and README into `src/data/generated/projects.json`.

Safety rules built in (and covered by `tests/sync.test.ts`):

- Only the public listing endpoint is used, so private repositories can never be returned.
- Forks, empty repositories, the profile README repository and anything in `excluded` are skipped.
- Topic-discovered repositories are **not** published unless `autoDiscover` is `true` *and* the repository passes the rules above. Default is `false`.
- READMEs are converted to HTML at sync time with an allow-list sanitiser: scripts, raw HTML, images, event handlers and `javascript:` links are removed.
- Output is validated with Zod. On any API failure, rate limit or invalid payload the existing file is left untouched, the failure is logged and the command exits non-zero. A failed single repository keeps its previous entry.
- The token is only sent to `api.github.com` as a header and is never printed or written.

### Workflows

- `.github/workflows/sync-projects.yml` — every 6 hours and on manual **Run workflow**. Commits `projects.json` only if it changed, then calls a deploy hook.
- `.github/workflows/ci.yml` — typecheck, lint, tests and build on pushes to `main` and on pull requests.

Commits made with the default `GITHUB_TOKEN` do not start other workflows, so the sync workflow requests a rebuild explicitly through a **deploy hook**. Without the hook the data is committed but the site is not rebuilt until the next push.

## Deployment (Vercel)

1. Push this repository to GitHub (a new repository dedicated to the portfolio).
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: Next.js (auto). Build command and output are the defaults.
3. Environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` — the final public URL, e.g. `https://your-domain.com` (used for canonical links, sitemap and Open Graph). Optional on `*.vercel.app`; the production URL is picked up automatically.
4. Rebuild hook: Project → Settings → Git → **Deploy Hooks** → create one for the `main` branch, copy the URL.
5. In GitHub: Settings → Secrets and variables → Actions → New repository secret → `DEPLOY_HOOK_URL` = that URL.
6. Run **Actions → Sync GitHub projects → Run workflow** once to confirm it succeeds.

Pushes to `main` deploy through Vercel's Git integration, so edits to achievements, the CV or any data file go live automatically.

## Privacy and ownership rules applied

- Private repositories are never linked or described publicly. `AfterFall` stays out of the catalogue.
- Forks are not claimed as personal work (`crop-guardian` is a fork of another author's repository and is excluded until verified personal contributions and attribution are added).
- Repository access is not treated as authorship.

## Testing

`pnpm test` runs the Node test runner (sync, sanitiser, API-failure and data-validation tests). Browser checks (routes, layouts, accessibility with axe-core, keyboard, reduced motion, boot animation) are described in `docs/TESTING.md`.

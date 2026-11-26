# Abdullah Al Muhaimin — Portfolio

Next.js 16 (App Router, static generation), React 19, TypeScript, Tailwind CSS 4, Zod. Hosted free on GitHub Pages (Vercel also works).

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

**Add an achievement** — add an object to `src/data/achievements.json` (fields in `src/types/achievement.ts`: `title`, `category`, optional `description`, `date`, `verificationUrl`, `image`, `visibility`). Push; Vercel rebuilds. Achievements are never inferred from commits or stars.

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

- `.github/workflows/sync-projects.yml` — every 6 hours and on manual **Run workflow**. Commits `projects.json` only if it changed, then starts the deploy workflow.
- `.github/workflows/ci.yml` — typecheck, lint, tests and build on pushes to `main` and on pull requests.

Commits made with the default `GITHUB_TOKEN` do not start other workflows, so the sync workflow starts the deploy workflow explicitly (`gh workflow run`).

## Deployment

### GitHub Pages (current)

1. Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions** (one-time).
2. Every push to `main` runs `.github/workflows/deploy-pages.yml` (typecheck, lint, tests, static build, publish). The site is at `https://<owner>.github.io/<repo>/`.
3. The workflow sets `BASE_PATH` and `NEXT_PUBLIC_SITE_URL` itself. A repository named `<owner>.github.io` is served from the root instead of a sub-path.
4. Static-export mode is `STATIC_EXPORT=1 BASE_PATH=/<repo> pnpm build` (output in `out/`). GitHub Pages cannot send custom HTTP headers, so the security/cache headers in `next.config.ts` apply only to the normal (Vercel) build.
5. Custom domain: Settings → Pages → Custom domain, then remove `BASE_PATH` handling by setting the workflow's `BASE_PATH` to empty and `NEXT_PUBLIC_SITE_URL` to the domain.

### Vercel (alternative)

Import the repository in Vercel, leave the defaults, and optionally set `NEXT_PUBLIC_SITE_URL`. Do not set `STATIC_EXPORT` there.

## Privacy and ownership rules applied

- Private repositories are never linked or described publicly and stay out of the catalogue.
- Forks are not claimed as personal work (`crop-guardian` is a fork of another author's repository and is excluded until verified personal contributions and attribution are added).
- Repository access is not treated as authorship.

## Testing

`pnpm test` runs the Node test runner (sync, sanitiser, API-failure and data-validation tests). Browser checks (routes, layouts, accessibility with axe-core, keyboard, reduced motion, boot animation) are described in `docs/TESTING.md`.

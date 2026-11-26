import { asset } from "@/lib/base-path";
import { profile } from "@/data/profile";
import { Button, DisabledButton } from "@/components/ui/Button";
import { ArrowIcon, DownloadIcon, ExternalIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { HeroBackground } from "./HeroBackground";

const social =
  "inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-fg";

export function Hero({ cvAvailable }: { cvAvailable: boolean }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-line">
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <HeroBackground />

      <div className="mx-auto flex max-w-7xl flex-col justify-center px-5 pb-16 pt-14 sm:px-8 md:pt-20 lg:min-h-[640px] lg:pb-24 lg:pt-24">
        <div>
          <h1
            id="hero-title"
            className="fade-in font-heading text-[clamp(3.25rem,10.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.035em]"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            {profile.nameLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>

          <p className="fade-up mt-8 flex items-center gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-fg" style={{ "--d": "0.8s" } as React.CSSProperties}>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {profile.headline}
          </p>

          <p className="fade-up mt-3 font-mono text-sm text-muted" style={{ "--d": "0.9s" } as React.CSSProperties}>
            {profile.affiliation}
          </p>

          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-fg/90" style={{ "--d": "1.0s" } as React.CSSProperties}>
            {profile.tagline}
            <span className="caret" aria-hidden="true" />
          </p>

          <div className="fade-up mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ "--d": "1.1s" } as React.CSSProperties}>
            <Button href="/projects" variant="primary">
              View Projects <ArrowIcon className="size-4" />
            </Button>
            <Button href="/#research">Explore Research</Button>
            {cvAvailable ? (
              <span className="inline-flex">
                <Button href={profile.cv.publicPath} download={profile.cv.fileName} prefetch={false} className="flex-1 border-r-0">
                  <DownloadIcon className="size-4" /> Download CV
                </Button>
                <a
                  href={asset(profile.cv.publicPath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open CV in a new tab"
                  title="Open in browser"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-muted transition-colors hover:border-muted hover:bg-surface hover:text-fg"
                >
                  <ExternalIcon className="size-4" />
                </a>
              </span>
            ) : (
              <DisabledButton reason="The CV has not been uploaded yet">
                <DownloadIcon className="size-4" /> CV coming soon
              </DisabledButton>
            )}
          </div>

          <ul className="fade-up mt-6 flex gap-6" style={{ "--d": "1.25s" } as React.CSSProperties}>
            <li>
              <a className={social} href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="size-[18px]" /> GitHub
              </a>
            </li>
            <li>
              <a className={social} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="size-[18px]" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-line">
        <ul className="mx-auto grid max-w-7xl divide-y divide-line px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          {profile.pillars.map((p, i) => (
            <li key={p.key} className="py-5 md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-line">/</span>
                {p.key}
              </p>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

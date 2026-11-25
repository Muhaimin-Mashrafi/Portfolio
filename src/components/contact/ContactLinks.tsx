import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, ExternalIcon } from "@/components/ui/icons";

const row = "group flex min-h-16 items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:text-muted";

export function ContactLinks() {
  return (
    <ul className="max-w-xl border-t border-line">
      <li>
        <a className={row} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-4"><LinkedInIcon /><span className="font-heading text-xl">LinkedIn</span></span>
          <ExternalIcon className="size-4 text-muted" />
        </a>
      </li>
      <li>
        <a className={row} href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-4"><GitHubIcon /><span className="font-heading text-xl">GitHub</span></span>
          <ExternalIcon className="size-4 text-muted" />
        </a>
      </li>
      <li>
        {profile.email ? (
          <a className={row} href={`mailto:${profile.email}`}>
            <span className="font-heading text-xl">{profile.email}</span>
          </a>
        ) : (
          <div className="flex min-h-16 items-center justify-between gap-4 border-b border-dashed border-line py-4 text-muted">
            <span className="font-heading text-xl">Professional email</span>
            <span className="font-mono text-xs uppercase tracking-[0.1em]">Not yet available</span>
          </div>
        )}
      </li>
    </ul>
  );
}

export function CollaborationCta() {
  return (
    <p className="max-w-xl text-lg leading-relaxed text-fg/90">
      I&apos;m open to conversations about AI and machine learning projects, AI security research and collaboration. The quickest way to reach me is LinkedIn.
    </p>
  );
}

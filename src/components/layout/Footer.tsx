import { asset } from "@/lib/base-path";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";

const link = "inline-flex min-h-11 items-center text-muted transition-colors hover:text-fg";

export function Footer({ cvAvailable }: { cvAvailable: boolean }) {
  return (
    <footer className="border-t border-line">
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 font-mono text-xs uppercase tracking-[0.08em] sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li><a className={link} href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className={link} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            {profile.email && <li><a className={link} href={`mailto:${profile.email}`}>Email</a></li>}
            <li>
              {cvAvailable ? (
                <a className={link} href={asset(profile.cv.publicPath)} download={profile.cv.fileName}>CV</a>
              ) : (
                <span className="inline-flex min-h-11 items-center text-muted" title="CV coming soon">CV · soon</span>
              )}
            </li>
          </ul>
        </div>
      </Reveal>
    </footer>
  );
}

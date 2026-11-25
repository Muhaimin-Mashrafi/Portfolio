import Link from "next/link";
import { ArrowIcon, ExternalIcon } from "./icons";

const cls = "group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-fg transition-colors hover:text-muted";

export function TextLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children} <ExternalIcon className="size-3.5" />
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children} <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

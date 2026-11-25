export function PageHeader({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 md:pb-16 md:pt-20">
        <p className="fade-up flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {label}
        </p>
        <h1 className="fade-up mt-6 max-w-4xl font-heading text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]" style={{ "--d": "0.1s" } as React.CSSProperties}>
          {title}
        </h1>
        {lead && (
          <p className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ "--d": "0.2s" } as React.CSSProperties}>
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}

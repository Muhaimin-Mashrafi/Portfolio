export function PlaceholderPage({ title, label }: { title: string; label: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-xl text-muted">This page is under construction and will be built in the next phase.</p>
    </section>
  );
}

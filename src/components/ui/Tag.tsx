export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block border border-line px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">{children}</span>;
}
export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t}><Tag>{t}</Tag></li>
      ))}
    </ul>
  );
}

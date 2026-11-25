import { skills } from "@/data/skills";

/** Renders only categories that contain verified items. No percentages or bars by design. */
export function SkillGroups({ compact = false }: { compact?: boolean }) {
  const groups = skills.filter((g) => g.items.length > 0);
  if (groups.length === 0) return null;
  return (
    <div className={compact ? "grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-x-16 gap-y-12 md:grid-cols-2"}>
      {groups.map((g) => (
        <section key={g.id} aria-labelledby={`skill-${g.id}`}>
          <h2 id={`skill-${g.id}`} className="border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {g.title}
          </h2>
          <ul className="mt-2 divide-y divide-line">
            {g.items.map((i) => (
              <li key={i.name} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-fg/90">{i.name}</span>
                {i.level && <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{i.level}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function hasSkills() {
  return skills.some((g) => g.items.length > 0);
}

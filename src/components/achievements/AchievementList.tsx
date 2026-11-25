import Image from "next/image";
import { achievementCategoryLabels, achievementCategory, type Achievement } from "@/types/achievement";
import { TextLink } from "@/components/ui/TextLink";

const fmt = (d?: string) => (d ? new Date(d.length === 4 ? `${d}-01-01` : d.length === 7 ? `${d}-01` : d).toLocaleDateString("en-GB", { year: "numeric", ...(d.length > 4 && { month: "short" }) }) : null);

/** Groups by category and skips categories with no entries. */
export function AchievementList({ items }: { items: Achievement[] }) {
  const groups = achievementCategory.options
    .map((c) => ({ c, list: items.filter((a) => a.category === c) }))
    .filter((g) => g.list.length > 0);
  return (
    <div className="space-y-14">
      {groups.map(({ c, list }) => (
        <section key={c} aria-labelledby={`ach-${c}`}>
          <h3 id={`ach-${c}`} className="border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">{achievementCategoryLabels[c]}</h3>
          <ul className="divide-y divide-line">
            {list.map((a) => (
              <li key={`${a.title}-${a.date ?? ""}`} className="grid gap-4 py-6 sm:grid-cols-[7rem_1fr]">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{fmt(a.date)}</p>
                <div>
                  <p className="font-heading text-xl font-medium">{a.title}</p>
                  {a.description && <p className="mt-2 max-w-2xl leading-relaxed text-muted">{a.description}</p>}
                  {a.image && <Image src={a.image.src} alt={a.image.alt} width={640} height={440} className="mt-4 h-auto max-w-sm border border-line" loading="lazy" />}
                  {a.verificationUrl && <div className="mt-2"><TextLink href={a.verificationUrl} external>Verify</TextLink></div>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

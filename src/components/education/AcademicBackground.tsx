import { education } from "@/data/education";

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-line py-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-6">
    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
    <dd className="mt-1 text-fg/90 sm:mt-0">{value}</dd>
  </div>
);
const List = ({ label, items }: { label: string; items: string[] }) => (
  <div className="border-t border-line py-4 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-6">
    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
    <dd className="mt-1 sm:mt-0">
      <ul className="space-y-1.5 text-fg/90">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </dd>
  </div>
);

/** Shows the institution always; every other field only once it has been filled in `data/education.ts`. */
export function AcademicBackground() {
  const e = education;
  return (
    <div>
      <p className="font-heading text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium leading-tight tracking-[-0.02em]">
        {e.institution} <span className="text-muted">({e.institutionShort})</span>
      </p>
      <dl className="mt-8 max-w-2xl">
        {e.degree && <Field label="Degree" value={e.degree} />}
        {e.department && <Field label="Department" value={e.department} />}
        {e.academicPeriod && <Field label="Period" value={e.academicPeriod} />}
        {e.graduationYear && <Field label="Graduation" value={e.graduationYear} />}
        {e.coursework.length > 0 && <List label="Coursework" items={e.coursework} />}
        {e.academicProjects.length > 0 && <List label="Academic projects" items={e.academicProjects} />}
        {e.academicAchievements.length > 0 && <List label="Achievements" items={e.academicAchievements} />}
      </dl>
    </div>
  );
}

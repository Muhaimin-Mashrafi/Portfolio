import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { TextLink } from "@/components/ui/TextLink";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software and AI/ML projects by Abdullah Al Muhaimin.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getPublicProjects();
  return (
    <>
      <PageHeader label="Projects" title="Things I've built." lead="A curated selection. Each project is described from its repository and documentation." />
      <section aria-label="Project list" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        {projects.length > 0 ? (
          projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} headingLevel="h2" />)
        ) : (
          <p className="text-muted">No projects are published yet.</p>
        )}
        <div className="mt-12 border-t border-line pt-6">
          <TextLink href={profile.links.github} external>More on GitHub</TextLink>
        </div>
      </section>
    </>
  );
}

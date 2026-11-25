import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getPublicProjects } from "@/lib/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectDetail, projectMeta } from "@/components/projects/ProjectDetail";
import { TextLink } from "@/components/ui/TextLink";

type Params = { slug: string };


export function generateStaticParams(): Params[] {
  return getPublicProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.description, alternates: { canonical: `/projects/${project.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8"><TextLink href="/projects">All projects</TextLink></div>
      <PageHeader label={projectMeta(project)} title={project.name} lead={project.description} />
      <ProjectDetail project={project} />
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, FileText } from "lucide-react";
import { projects } from "@/content/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Mahek Patel`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="section-container pt-24 pb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-fg-muted hover:text-accent text-sm font-bold uppercase tracking-widest transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 ${
              project.type === "ds-ml"
                ? "border-accent text-accent"
                : "border-fg text-fg"
            }`}
          >
            {project.type === "ds-ml" ? "Data Science / ML" : "Software Engineering"}
          </span>
          <span className="px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-fg-subtle text-fg-subtle">
            {project.source === "professional" ? "Professional" : "Academic"}
          </span>
        </div>

        <h1 className="heading-1 text-fg mb-4">{project.title}</h1>
        <p className="text-xl text-fg-muted max-w-3xl">
          {project.longDescription || project.description}
        </p>

        <div className="flex gap-3 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              <Github size={18} />
              View Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-accent bg-accent text-white text-sm font-bold uppercase tracking-widest hover:bg-accent-dark transition-colors"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {project.paper && (
            <a
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              <FileText size={18} />
              Read Paper
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-fg text-fg"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      <article className="section-container pb-24">
        <div className="border-t-4 border-fg pt-8 max-w-3xl">
          <p className="text-fg-muted">
            Detailed case study content coming soon. This page will include:
          </p>
          <ul className="text-fg-muted mt-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Problem and context
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Approach and methodology
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Technical implementation details
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Results and impact
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Lessons learned
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}

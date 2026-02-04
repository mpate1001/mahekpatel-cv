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
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="section-container pt-24 pb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-accent-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-sm font-mono rounded ${
              project.type === "ds-ml"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {project.type === "ds-ml" ? "Data Science / ML" : "Software Engineering"}
          </span>
          <span className="px-3 py-1 text-sm font-mono bg-dark-800 text-dark-400 rounded">
            {project.source === "professional" ? "Professional" : "Academic"}
          </span>
        </div>

        <h1 className="heading-1 text-dark-50 mb-4">{project.title}</h1>
        <p className="text-xl text-dark-300 max-w-3xl">
          {project.longDescription || project.description}
        </p>

        {/* Links */}
        <div className="flex gap-4 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-200 rounded-lg transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-200 rounded-lg transition-colors"
            >
              <FileText size={18} />
              Read Paper
            </a>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm font-mono text-dark-300 bg-dark-800 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Content placeholder - will be replaced with MDX content */}
      <article className="section-container pb-24">
        <div className="prose prose-invert max-w-3xl">
          <p className="text-dark-400">
            Detailed case study content coming soon. This page will include:
          </p>
          <ul className="text-dark-400">
            <li>Problem and context</li>
            <li>Approach and methodology</li>
            <li>Technical implementation details</li>
            <li>Results and impact</li>
            <li>Lessons learned</li>
          </ul>
        </div>
      </article>
    </main>
  );
}

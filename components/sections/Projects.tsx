"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects, type Project } from "@/content/data/projects";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, FileText } from "lucide-react";

// Placeholder data until real data is added
const placeholderProjects: Project[] = [
  {
    id: "1",
    slug: "ml-project",
    title: "ML Pipeline System",
    description: "End-to-end machine learning pipeline for production deployment",
    type: "ds-ml",
    source: "professional",
    featured: true,
    technologies: ["Python", "TensorFlow", "Kubernetes", "Airflow"],
    github: "https://github.com",
  },
  {
    id: "2",
    slug: "web-app",
    title: "Real-time Analytics Dashboard",
    description: "Full-stack web application with live data visualization",
    type: "software",
    source: "professional",
    featured: true,
    technologies: ["React", "Node.js", "PostgreSQL", "D3.js"],
    demo: "https://example.com",
  },
  {
    id: "3",
    slug: "nlp-research",
    title: "NLP Research Project",
    description: "Academic research on transformer architectures",
    type: "ds-ml",
    source: "academic",
    featured: false,
    technologies: ["Python", "PyTorch", "HuggingFace"],
    paper: "https://arxiv.org",
  },
];

type FilterType = "all" | "ds-ml" | "software";
type FilterSource = "all" | "professional" | "academic";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [sourceFilter, setSourceFilter] = useState<FilterSource>("all");

  const data = projects.length > 0 ? projects : placeholderProjects;

  const filteredProjects = data.filter((project) => {
    const typeMatch = typeFilter === "all" || project.type === typeFilter;
    const sourceMatch = sourceFilter === "all" || project.source === sourceFilter;
    return typeMatch && sourceMatch;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-dark-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-8">
            <span className="text-accent-400 font-mono text-xl mr-2">03.</span>
            Projects
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex gap-2">
              {(["all", "ds-ml", "software"] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTypeFilter(filter)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    typeFilter === filter
                      ? "bg-accent-600 text-white"
                      : "bg-dark-800 text-dark-300 hover:text-accent-400"
                  )}
                >
                  {filter === "all"
                    ? "All"
                    : filter === "ds-ml"
                    ? "Data Science"
                    : "Software"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(["all", "professional", "academic"] as FilterSource[]).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSourceFilter(filter)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      sourceFilter === filter
                        ? "bg-accent-600 text-white"
                        : "bg-dark-800 text-dark-300 hover:text-accent-400"
                    )}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="space-y-8 mb-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group relative bg-dark-800/50 rounded-xl p-6 border border-dark-700 hover:border-accent-500/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="heading-3 text-dark-50 group-hover:text-accent-400 transition-colors">
                          {project.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-mono rounded",
                            project.type === "ds-ml"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-blue-500/20 text-blue-400"
                          )}
                        >
                          {project.type === "ds-ml" ? "DS/ML" : "SWE"}
                        </span>
                      </div>
                      <p className="text-dark-300">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono text-dark-400 bg-dark-700 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.paper && (
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                          aria-label="Paper"
                        >
                          <FileText size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group bg-dark-800/30 rounded-lg p-5 border border-dark-700 hover:border-accent-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-mono rounded",
                        project.type === "ds-ml"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-blue-500/20 text-blue-400"
                      )}
                    >
                      {project.type === "ds-ml" ? "DS/ML" : "SWE"}
                    </span>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-500 hover:text-accent-400 transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-500 hover:text-accent-400 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-dark-100 group-hover:text-accent-400 transition-colors mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm text-dark-400 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-dark-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

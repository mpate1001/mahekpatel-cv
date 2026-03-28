"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/content/data/projects";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, FileText } from "lucide-react";

type FilterType = "all" | "ds-ml" | "software";
type FilterSource = "all" | "professional" | "academic";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [sourceFilter, setSourceFilter] = useState<FilterSource>("all");

  const filteredProjects = projects.filter((project) => {
    const typeMatch = typeFilter === "all" || project.type === typeFilter;
    const sourceMatch = sourceFilter === "all" || project.source === sourceFilter;
    return typeMatch && sourceMatch;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-bg-alt">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="border-l-4 border-fg pl-6">
            <h2 className="heading-2 text-fg mb-8">
              <span className="text-fg font-mono text-base mr-2 font-bold">02 —</span>
              Projects
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex gap-2">
              {(["all", "ds-ml", "software"] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTypeFilter(filter)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-colors",
                    typeFilter === filter
                      ? "bg-fg text-bg border-fg"
                      : "bg-transparent text-fg border-fg hover:bg-fg hover:text-bg"
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
                      "px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-colors",
                      sourceFilter === filter
                        ? "bg-accent text-white border-accent"
                        : "bg-transparent text-fg border-fg hover:border-accent hover:text-accent"
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
            <div className="space-y-4 mb-12">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border-2 border-fg p-6 hover:border-accent transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="heading-3 text-fg">
                          {project.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-mono font-bold uppercase border-2",
                            project.type === "ds-ml"
                              ? "border-accent text-accent"
                              : "border-fg text-fg"
                          )}
                        >
                          {project.type === "ds-ml" ? "DS/ML" : "SWE"}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold uppercase border-2 border-fg-subtle text-fg-subtle">
                          {project.source === "professional" ? "Professional" : "Academic"}
                        </span>
                      </div>
                      <p className="text-fg-muted">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono font-bold uppercase border-2 border-fg text-fg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border-2 border-fg text-fg hover:border-accent hover:text-accent transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border-2 border-fg text-fg hover:border-accent hover:text-accent transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.paper && (
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border-2 border-fg text-fg hover:border-accent hover:text-accent transition-colors"
                          aria-label="Paper"
                        >
                          <FileText size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="border-2 border-fg p-5 hover:border-accent transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-mono font-bold uppercase border-2",
                        project.type === "ds-ml"
                          ? "border-accent text-accent"
                          : "border-fg text-fg"
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
                          className="text-fg hover:text-accent transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fg hover:text-accent transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="font-bold text-fg mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm text-fg-muted mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-bold text-fg-subtle uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

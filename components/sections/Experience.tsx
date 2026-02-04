"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experiences, type Experience } from "@/content/data/experience";
import { cn } from "@/lib/utils";

// Placeholder data until real data is added
const placeholderExperiences: Experience[] = [
  {
    id: "1",
    company: "Company Name",
    title: "Senior Software Engineer",
    startDate: "2021",
    endDate: null,
    description: [
      "Led development of key features",
      "Mentored junior engineers",
      "Improved system performance",
    ],
    technologies: ["Python", "React", "AWS"],
  },
  {
    id: "2",
    company: "Previous Company",
    title: "Software Engineer",
    startDate: "2018",
    endDate: "2021",
    description: [
      "Built scalable backend services",
      "Implemented CI/CD pipelines",
      "Collaborated with cross-functional teams",
    ],
    technologies: ["Java", "Kubernetes", "PostgreSQL"],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const data =
    experiences.length > 0 ? experiences : placeholderExperiences;

  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-12">
            <span className="text-accent-400 font-mono text-xl mr-2">02.</span>
            Experience
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-dark-700 -translate-x-1/2" />

            {/* Timeline entries */}
            <div className="space-y-12">
              {data.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={cn(
                    "relative grid md:grid-cols-2 gap-8",
                    index % 2 === 0 ? "md:text-right" : ""
                  )}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      "space-y-3",
                      index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                    )}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-accent-500 rounded-full -translate-x-1/2 mt-2" />

                    <div className="ml-6 md:ml-0">
                      <h3 className="heading-3 text-dark-50">{exp.title}</h3>
                      <p className="text-accent-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-dark-500 font-mono">
                        {exp.startDate} — {exp.endDate ?? "Present"}
                      </p>

                      {/* Description */}
                      <ul
                        className={cn(
                          "mt-4 space-y-2 text-dark-300",
                          index % 2 === 0 ? "md:text-right" : ""
                        )}
                      >
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              className={cn(
                                "text-accent-400 mt-1.5",
                                index % 2 === 0 ? "md:order-2" : ""
                              )}
                            >
                              ▹
                            </span>
                            <span className={index % 2 === 0 ? "md:order-1" : ""}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div
                        className={cn(
                          "flex flex-wrap gap-2 mt-4",
                          index % 2 === 0 ? "md:justify-end" : ""
                        )}
                      >
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono text-accent-400 bg-accent-500/10 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

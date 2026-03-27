"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/content/data/experience";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="border-l-4 border-accent pl-6">
            <h2 className="heading-2 text-fg mb-12">
              <span className="text-accent font-mono text-base mr-2 font-bold">01 —</span>
              Experience
            </h2>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="border-2 border-fg p-6 hover:border-accent transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <h3 className="heading-3 text-fg">{exp.title}</h3>
                  <span className="text-sm font-mono text-fg-subtle">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </span>
                </div>
                <p className="text-accent font-bold mb-4">{exp.company}</p>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-fg-muted">
                      <span className="text-accent mt-0.5 font-bold">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono font-bold uppercase border-2 border-fg text-fg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

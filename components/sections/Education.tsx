"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "@/content/data/education";
import { cn } from "@/lib/utils";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding bg-bg-alt">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="border-l-4 border-fg pl-6">
            <h2 className="heading-2 text-fg mb-12">
              <span className="text-fg font-mono text-base mr-2 font-bold">04 —</span>
              Education
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className={cn(
                  "border-2 p-6",
                  edu.inProgress
                    ? "border-accent"
                    : "border-fg hover:border-accent transition-colors"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="heading-3 text-fg">{edu.institution}</h3>
                  <div className="flex items-center gap-3">
                    {edu.inProgress && (
                      <span className="px-2 py-0.5 text-xs font-mono font-bold uppercase border-2 border-accent text-accent">
                        In Progress
                      </span>
                    )}
                    <span className="text-sm font-mono text-fg-subtle">
                      {edu.startDate} — {edu.endDate ?? "Present"}
                    </span>
                  </div>
                </div>

                <p className="text-accent font-bold mb-4">
                  {edu.degree} in {edu.field}
                </p>

                {edu.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 text-xs font-mono font-bold uppercase border-2 border-fg text-fg"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

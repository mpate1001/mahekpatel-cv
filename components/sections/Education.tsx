"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { education, type Education } from "@/content/data/education";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

// Placeholder data until real data is added
const placeholderEducation: Education[] = [
  {
    id: "unc",
    institution: "UNC Chapel Hill",
    degree: "Master of Science",
    field: "Data Science",
    startDate: "2024",
    endDate: "2026",
    inProgress: true,
    highlights: [
      "Machine Learning",
      "Statistical Analysis",
      "Data Engineering",
    ],
  },
  {
    id: "undergrad",
    institution: "University Name",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2013",
    endDate: "2017",
    inProgress: false,
    highlights: ["Software Engineering", "Algorithms", "Database Systems"],
  },
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const data = education.length > 0 ? education : placeholderEducation;

  return (
    <section id="education" className="section-padding bg-dark-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-12">
            <span className="text-accent-400 font-mono text-xl mr-2">05.</span>
            Education
          </h2>

          {/* Education Cards */}
          <div className="space-y-6">
            {data.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={cn(
                  "relative bg-dark-800/50 rounded-xl p-6 border transition-colors",
                  edu.inProgress
                    ? "border-accent-500/50"
                    : "border-dark-700 hover:border-dark-600"
                )}
              >
                {/* In Progress Badge */}
                {edu.inProgress && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-500/20 text-accent-400 text-xs font-medium rounded-full">
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
                      In Progress
                    </span>
                  </div>
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-accent-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="heading-3 text-dark-50">{edu.institution}</h3>
                    <p className="text-accent-400 font-medium">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-dark-500 font-mono mt-1">
                      {edu.startDate} — {edu.endDate ?? "Present"}
                    </p>

                    {/* Highlights */}
                    {edu.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {edu.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-2 py-1 text-xs font-mono text-dark-400 bg-dark-700 rounded"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

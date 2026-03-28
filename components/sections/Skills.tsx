"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { skills, type Skill } from "@/content/data/skills";
import { cn } from "@/lib/utils";

const categoryLabels = {
  languages: "Languages",
  "ml-ds": "ML & Data Science",
  engineering: "Engineering",
  tools: "Tools & Databases",
};

const categoryBorders = {
  languages: "border-fg",
  "ml-ds": "border-accent",
  engineering: "border-fg",
  tools: "border-fg-muted",
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="border-l-4 border-accent pl-6">
            <h2 className="heading-2 text-fg mb-12">
              <span className="text-accent font-mono text-base mr-2 font-bold">03 —</span>
              Skills
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map(
              (category) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-fg">
                    {categoryLabels[category]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {groupedSkills[category]?.map((skill) => (
                      <span
                        key={skill.id}
                        className={cn(
                          "px-3 py-1.5 text-sm font-mono font-bold uppercase border-2",
                          categoryBorders[category],
                          categoryBorders[category] === "border-accent"
                            ? "text-accent"
                            : categoryBorders[category] === "border-fg-muted"
                            ? "text-fg-muted"
                            : "text-fg"
                        )}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

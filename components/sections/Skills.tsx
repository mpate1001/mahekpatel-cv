"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { skills, type Skill } from "@/content/data/skills";
import { cn } from "@/lib/utils";

const SkillConstellation = dynamic(
  () =>
    import("@/components/visualizations/SkillConstellation").then(
      (mod) => mod.SkillConstellation
    ),
  { ssr: false, loading: () => <div className="h-96 bg-dark-800/30 rounded-xl animate-pulse" /> }
);

// Placeholder data until real data is added
const placeholderSkills: Skill[] = [
  { id: "python", name: "Python", category: "languages", proficiency: 5, related: ["tensorflow", "pytorch"] },
  { id: "typescript", name: "TypeScript", category: "languages", proficiency: 5, related: ["react", "nodejs"] },
  { id: "sql", name: "SQL", category: "languages", proficiency: 4, related: ["postgresql"] },
  { id: "java", name: "Java", category: "languages", proficiency: 4, related: [] },
  { id: "tensorflow", name: "TensorFlow", category: "ml-ds", proficiency: 4, related: ["python"] },
  { id: "pytorch", name: "PyTorch", category: "ml-ds", proficiency: 4, related: ["python"] },
  { id: "pandas", name: "Pandas", category: "ml-ds", proficiency: 5, related: ["python"] },
  { id: "sklearn", name: "scikit-learn", category: "ml-ds", proficiency: 5, related: ["python"] },
  { id: "react", name: "React", category: "engineering", proficiency: 5, related: ["typescript"] },
  { id: "nodejs", name: "Node.js", category: "engineering", proficiency: 4, related: ["typescript"] },
  { id: "aws", name: "AWS", category: "engineering", proficiency: 4, related: [] },
  { id: "kubernetes", name: "Kubernetes", category: "engineering", proficiency: 3, related: ["docker"] },
  { id: "git", name: "Git", category: "tools", proficiency: 5, related: [] },
  { id: "docker", name: "Docker", category: "tools", proficiency: 4, related: ["kubernetes"] },
  { id: "postgresql", name: "PostgreSQL", category: "tools", proficiency: 4, related: ["sql"] },
];

const categoryLabels = {
  languages: "Languages",
  "ml-ds": "ML & Data Science",
  engineering: "Engineering",
  tools: "Tools & Databases",
};

const categoryColors = {
  languages: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "ml-ds": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  engineering: "bg-green-500/20 text-green-400 border-green-500/30",
  tools: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const data = skills.length > 0 ? skills : placeholderSkills;

  const groupedSkills = data.reduce((acc, skill) => {
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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-12">
            <span className="text-accent-400 font-mono text-xl mr-2">04.</span>
            Skills
          </h2>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map(
              (category, categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-dark-200">
                    {categoryLabels[category]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {groupedSkills[category]?.map((skill, skillIndex) => (
                      <motion.span
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.03,
                        }}
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium rounded-lg border",
                          categoryColors[category]
                        )}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* Skill Constellation */}
          <div className="mt-12 p-4 bg-dark-800/30 rounded-xl border border-dark-700">
            <SkillConstellation width={800} height={500} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { skills as skillsData, type Skill } from "@/content/data/skills";

// Placeholder skills if none defined
const placeholderSkills: Skill[] = [
  { id: "python", name: "Python", category: "languages", proficiency: 5, related: ["tensorflow", "pytorch", "pandas"] },
  { id: "typescript", name: "TypeScript", category: "languages", proficiency: 5, related: ["react", "nodejs"] },
  { id: "sql", name: "SQL", category: "languages", proficiency: 4, related: ["postgresql"] },
  { id: "tensorflow", name: "TensorFlow", category: "ml-ds", proficiency: 4, related: ["python"] },
  { id: "pytorch", name: "PyTorch", category: "ml-ds", proficiency: 4, related: ["python"] },
  { id: "pandas", name: "Pandas", category: "ml-ds", proficiency: 5, related: ["python"] },
  { id: "sklearn", name: "scikit-learn", category: "ml-ds", proficiency: 5, related: ["python"] },
  { id: "react", name: "React", category: "engineering", proficiency: 5, related: ["typescript"] },
  { id: "nodejs", name: "Node.js", category: "engineering", proficiency: 4, related: ["typescript"] },
  { id: "aws", name: "AWS", category: "engineering", proficiency: 4, related: [] },
  { id: "git", name: "Git", category: "tools", proficiency: 5, related: [] },
  { id: "docker", name: "Docker", category: "tools", proficiency: 4, related: [] },
  { id: "postgresql", name: "PostgreSQL", category: "tools", proficiency: 4, related: ["sql"] },
];

const categoryColors: Record<string, string> = {
  languages: "#3b82f6",
  "ml-ds": "#a855f7",
  engineering: "#22c55e",
  tools: "#f97316",
};

interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  related: string[];
}

interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
  source: string | SkillNode;
  target: string | SkillNode;
}

interface Props {
  width?: number;
  height?: number;
}

export function SkillConstellation({ width = 600, height = 400 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = skillsData.length > 0 ? skillsData : placeholderSkills;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Deep clone skills for D3 simulation
    const nodesCopy: SkillNode[] = skills.map(s => ({ ...s }));

    // Create links from related skills
    const links: SkillLink[] = [];
    skills.forEach((skill) => {
      skill.related.forEach((relatedId) => {
        if (skills.find((s) => s.id === relatedId)) {
          // Avoid duplicates
          const exists = links.some(
            l => (l.source === skill.id && l.target === relatedId) ||
                 (l.source === relatedId && l.target === skill.id)
          );
          if (!exists) {
            links.push({ source: skill.id, target: relatedId });
          }
        }
      });
    });

    const linksCopy: SkillLink[] = links.map(l => ({ ...l }));

    const simulation = d3
      .forceSimulation(nodesCopy)
      .force(
        "link",
        d3
          .forceLink<SkillNode, SkillLink>(linksCopy)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(linksCopy)
      .join("line")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1);

    // Nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodesCopy)
      .join("g")
      .attr("cursor", "pointer")
      .on("mouseenter", (_, d) => setHoveredSkill(d.id))
      .on("mouseleave", () => setHoveredSkill(null));

    node
      .append("circle")
      .attr("r", (d) => 15 + d.proficiency * 3)
      .attr("fill", (d) => categoryColors[d.category])
      .attr("fill-opacity", 0.2)
      .attr("stroke", (d) => categoryColors[d.category])
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-200");

    node
      .append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "11px")
      .attr("fill", "#e2e8f0")
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as SkillNode).x ?? 0)
        .attr("y1", (d) => (d.source as SkillNode).y ?? 0)
        .attr("x2", (d) => (d.target as SkillNode).x ?? 0)
        .attr("y2", (d) => (d.target as SkillNode).y ?? 0);

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [skills, width, height]);

  // Highlight related skills on hover
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    if (hoveredSkill) {
      const skill = skills.find((s) => s.id === hoveredSkill);
      const relatedIds = skill ? [skill.id, ...skill.related] : [];

      svg.selectAll("circle").attr("fill-opacity", (d: unknown) =>
        relatedIds.includes((d as SkillNode).id) ? 0.5 : 0.1
      );
      svg.selectAll("line").attr("stroke-opacity", (d: unknown) => {
        const link = d as SkillLink;
        const sourceId = typeof link.source === 'string' ? link.source : (link.source as SkillNode).id;
        const targetId = typeof link.target === 'string' ? link.target : (link.target as SkillNode).id;
        return relatedIds.includes(sourceId) && relatedIds.includes(targetId) ? 0.8 : 0.1;
      });
    } else {
      svg.selectAll("circle").attr("fill-opacity", 0.2);
      svg.selectAll("line").attr("stroke-opacity", 0.4);
    }
  }, [hoveredSkill, skills]);

  return (
    <svg ref={svgRef} width={width} height={height} className="w-full h-auto" />
  );
}

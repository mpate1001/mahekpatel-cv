"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: "engineering" | "data-science" | "shared";
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

const nodes: Node[] = [
  { id: "Python", group: "shared" },
  { id: "React", group: "engineering" },
  { id: "ML", group: "data-science" },
  { id: "APIs", group: "engineering" },
  { id: "Statistics", group: "data-science" },
  { id: "Cloud", group: "engineering" },
  { id: "Deep Learning", group: "data-science" },
  { id: "TypeScript", group: "engineering" },
  { id: "Data Viz", group: "shared" },
];

const links: Link[] = [
  { source: "Python", target: "ML" },
  { source: "Python", target: "Statistics" },
  { source: "Python", target: "Deep Learning" },
  { source: "Python", target: "APIs" },
  { source: "React", target: "TypeScript" },
  { source: "React", target: "Data Viz" },
  { source: "ML", target: "Deep Learning" },
  { source: "ML", target: "Statistics" },
  { source: "APIs", target: "Cloud" },
  { source: "Data Viz", target: "Statistics" },
];

const groupColors: Record<string, string> = {
  engineering: "#3b82f6",
  "data-science": "#a855f7",
  shared: "#14b8a6",
};

export function HeroVisualization() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll("*").remove();

    // Deep clone nodes and links to avoid mutation issues
    const nodesCopy: Node[] = nodes.map(d => ({ ...d }));
    const linksCopy: Link[] = links.map(d => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodesCopy)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(linksCopy)
          .id((d) => d.id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    // Links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(linksCopy)
      .join("line")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

    // Nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodesCopy)
      .join("g")
      .attr("cursor", "pointer");

    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => groupColors[d.group])
      .attr("fill-opacity", 0.2)
      .attr("stroke", (d) => groupColors[d.group])
      .attr("stroke-width", 2);

    node
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "10px")
      .attr("fill", "#94a3b8")
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
}

# Brutalist Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from dark navy theme to brutalist light-background aesthetic with heavy typography, raw borders, and high contrast — optimized for engineering hiring managers.

**Architecture:** Restyle all existing components in-place. Delete D3 visualizations. Replace Tailwind v4 `@theme` tokens with brutalist palette. No new pages or data changes — purely visual.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (`@theme` directive), Framer Motion (reduced), Lucide React icons, JetBrains Mono (mono elements only).

**Spec:** `docs/superpowers/specs/2026-03-27-brutalist-portfolio-redesign.md`

---

### Task 1: Replace Global Theme & Layout Foundation

**Files:**
- Modify: `app/globals.css` (full rewrite)
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite `app/globals.css`**

Replace the entire file with the brutalist theme:

```css
@import "tailwindcss";

/* Brutalist theme */
@theme {
  /* Background */
  --color-bg: #f5f0e8;
  --color-bg-alt: #e8e3db;

  /* Foreground */
  --color-fg: #111111;
  --color-fg-muted: #666666;
  --color-fg-subtle: #999999;

  /* Accent - Red */
  --color-accent: #C1121F;
  --color-accent-dark: #780000;

  /* Fonts */
  --font-sans: Arial, Helvetica, sans-serif;
  --font-mono: var(--font-jetbrains), 'Courier New', monospace;
}

/* Base styles */
:root {
  --background: #f5f0e8;
  --foreground: #111111;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: rgba(193, 18, 31, 0.3);
  color: #111;
}

/* Utility classes */
@layer utilities {
  .section-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 72rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 640px) {
    .section-container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .section-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  .section-padding {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  @media (min-width: 640px) {
    .section-padding {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
  }

  @media (min-width: 1024px) {
    .section-padding {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  .heading-1 {
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.95;
  }

  @media (min-width: 640px) {
    .heading-1 {
      font-size: 4.5rem;
    }
  }

  @media (min-width: 1024px) {
    .heading-1 {
      font-size: 6rem;
    }
  }

  .heading-2 {
    font-size: 1.875rem;
    font-weight: 900;
    letter-spacing: -0.025em;
    text-transform: uppercase;
  }

  @media (min-width: 640px) {
    .heading-2 {
      font-size: 2.25rem;
    }
  }

  .heading-3 {
    font-size: 1.25rem;
    font-weight: 700;
  }

  @media (min-width: 640px) {
    .heading-3 {
      font-size: 1.5rem;
    }
  }
}
```

- [ ] **Step 2: Update `app/layout.tsx`**

Remove Inter font import. Keep JetBrains Mono. Remove `dark` class from `<html>`:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Mahek Patel | Software Engineer & Data Scientist",
  description:
    "Personal portfolio showcasing experience, projects, and skills in software engineering and data science.",
  keywords: [
    "Mahek Patel",
    "Software Engineer",
    "Data Scientist",
    "Machine Learning",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: Build succeeds. Site will look broken (components still reference old tokens) — that's fine.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: replace dark theme with brutalist light palette"
```

---

### Task 2: Delete D3 Visualizations

**Files:**
- Delete: `components/visualizations/HeroVisualization.tsx`
- Delete: `components/visualizations/SkillConstellation.tsx`
- Delete: `components/visualizations/` (directory)

- [ ] **Step 1: Delete visualization files and directory**

```bash
rm components/visualizations/HeroVisualization.tsx
rm components/visualizations/SkillConstellation.tsx
rmdir components/visualizations
```

- [ ] **Step 2: Verify no other files import from this directory**

Run: `grep -r "visualizations" --include="*.tsx" --include="*.ts" .`
Expected: Only hits in `components/sections/Hero.tsx` and `components/sections/Skills.tsx` — these will be fixed in later tasks.

- [ ] **Step 3: Commit**

```bash
git add -A components/visualizations
git commit -m "chore: remove D3 visualization components"
```

---

### Task 3: Restyle Navbar

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Rewrite `components/layout/Navbar.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-bg transition-all duration-200",
        isScrolled ? "border-b-2 border-fg" : ""
      )}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="text-2xl font-black text-fg hover:text-accent transition-colors"
          >
            MP.
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent",
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-fg"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden p-2 text-fg hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t-2 border-fg"
            >
              <ul className="py-4 space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "block text-lg font-bold uppercase tracking-widest transition-colors hover:text-accent",
                        activeSection === item.href.slice(1)
                          ? "text-accent"
                          : "text-fg"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds (other components may still warn but Navbar is self-contained).

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: restyle navbar for brutalist theme"
```

---

### Task 4: Restyle Hero

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Rewrite `components/sections/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-bg"
    >
      <div className="section-container w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="heading-1 text-fg mb-6">
            MAHEK<br />PATEL.
          </h1>

          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-8">
            Software Engineer · 7+ years building data platforms at scale
          </p>

          <div className="border-t-4 border-fg pt-8 flex flex-wrap gap-4">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:bg-fg hover:text-bg transition-colors"
            >
              View My Work
              <ArrowDown size={16} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
            >
              Download Resume
              <Download size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: restyle hero for brutalist theme — massive type, bordered CTAs"
```

---

### Task 5: Restyle About Section

**Files:**
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: Rewrite `components/sections/About.tsx`**

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Check } from "lucide-react";
import Image from "next/image";

const EMAIL = "MPPATEL12@gmail.com";

const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Currently", value: "MADS @ UNC" },
  { label: "Focus", value: "Data Platforms" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/mpate1001", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mahek-patel/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="about" className="section-padding bg-bg-alt">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="heading-2 text-fg mb-12">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative w-64 h-64 mx-auto border-2 border-fg">
                <Image
                  src="/images/headshot.jpg"
                  alt="Mahek Patel"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-fg-muted leading-relaxed">
                Software Engineer specializing in event-driven data platforms.
                I build end-to-end data pipelines ingesting from enterprise apps,
                normalizing, and publishing to Kafka for real-time consumption.
              </p>
              <p className="text-fg-muted leading-relaxed">
                Currently pursuing my Master&apos;s in Data Science at UNC Chapel Hill
                while working at Duke Energy. With 6+ years across software and data
                engineering, I ship production-grade services with full-stack
                observability, optimized for reliability and throughput.
              </p>
              <p className="text-fg-muted leading-relaxed">
                My background spans Java, Python, AWS, SQL, and CI/CD. I focus on
                building systems that don&apos;t just work in development, but scale
                and perform in production with p99 latency in mind.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 border-t-2 border-fg">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-black text-accent">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-fg-subtle">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 relative">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={link.label === "Email" ? handleEmailClick : undefined}
                    {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="p-3 border-2 border-fg text-fg hover:border-accent hover:text-accent transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
                <AnimatePresence>
                  {emailCopied && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-12 left-0 flex items-center gap-2 px-4 py-2 border-2 border-accent bg-bg text-accent text-sm font-bold"
                    >
                      <Check size={14} />
                      COPIED
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: restyle about section for brutalist theme"
```

---

### Task 6: Restyle Experience Section

**Files:**
- Modify: `components/sections/Experience.tsx`

- [ ] **Step 1: Rewrite `components/sections/Experience.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Experience.tsx
git commit -m "feat: restyle experience section — bordered cards, no timeline"
```

---

### Task 7: Restyle Projects Section

**Files:**
- Modify: `components/sections/Projects.tsx`

- [ ] **Step 1: Rewrite `components/sections/Projects.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: restyle projects section — bordered blocks, stark filters"
```

---

### Task 8: Restyle Skills Section

**Files:**
- Modify: `components/sections/Skills.tsx`

- [ ] **Step 1: Rewrite `components/sections/Skills.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: restyle skills section — bordered tags, no constellation"
```

---

### Task 9: Restyle Education Section

**Files:**
- Modify: `components/sections/Education.tsx`

- [ ] **Step 1: Rewrite `components/sections/Education.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Education.tsx
git commit -m "feat: restyle education section — bordered cards, no pulse"
```

---

### Task 10: Restyle Contact Section

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Rewrite `components/sections/Contact.tsx`**

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = "MPPATEL12@gmail.com";

const socialLinks = [
  { icon: Github, href: "https://github.com/mpate1001", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mahek-patel/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch("https://formspree.io/f/xykprnjq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="border-l-4 border-accent pl-6 mb-4">
            <h2 className="heading-2 text-fg">
              <span className="text-accent font-mono text-base mr-2 font-bold">05 —</span>
              Get In Touch
            </h2>
          </div>
          <p className="text-fg-muted mb-8">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just chatting about data science and software
            engineering.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mb-12 relative">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.label === "Email" ? handleEmailClick : undefined}
                {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="p-4 border-2 border-fg text-fg hover:border-accent hover:text-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
            <AnimatePresence>
              {emailCopied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-12 left-0 flex items-center gap-2 px-4 py-2 border-2 border-accent bg-bg text-accent text-sm font-bold"
                >
                  <Check size={16} />
                  EMAIL COPIED
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Form */}
          {submitted ? (
            <div className="p-8 border-2 border-accent">
              <p className="text-accent font-bold uppercase tracking-widest">
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            </div>
          ) : submitError ? (
            <div className="p-8 border-2 border-accent">
              <p className="text-accent font-bold mb-4">
                Something went wrong. Please try again or email me directly.
              </p>
              <button
                onClick={() => setSubmitError(false)}
                className="px-4 py-2 border-2 border-fg text-fg font-bold uppercase text-sm hover:bg-fg hover:text-bg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono font-bold uppercase tracking-widest text-fg mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-bg border-2 border-fg text-fg placeholder-fg-subtle focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono font-bold uppercase tracking-widest text-fg mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-bg border-2 border-fg text-fg placeholder-fg-subtle focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono font-bold uppercase tracking-widest text-fg mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-bg border-2 border-fg text-fg placeholder-fg-subtle focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 transition-colors",
                  isSubmitting
                    ? "border-fg-subtle text-fg-subtle cursor-not-allowed"
                    : "border-accent bg-accent text-white hover:bg-accent-dark"
                )}
              >
                {isSubmitting ? (
                  "SENDING..."
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: restyle contact section — thick borders, mono labels"
```

---

### Task 11: Restyle Footer

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Rewrite `components/layout/Footer.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Check } from "lucide-react";

const EMAIL = "MPPATEL12@gmail.com";

const socialLinks = [
  { icon: Github, href: "https://github.com/mpate1001", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mahek-patel/",
    label: "LinkedIn",
  },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

export function Footer() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer className="border-t-3 border-fg bg-bg">
      <div className="section-container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 relative">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.label === "Email" ? handleEmailClick : undefined}
                {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="p-2 border-2 border-fg text-fg hover:border-accent hover:text-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
            <AnimatePresence>
              {emailCopied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-0 flex items-center gap-2 px-3 py-1.5 border-2 border-accent bg-bg text-accent text-xs font-bold"
                >
                  <Check size={12} />
                  COPIED
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 border-2 border-accent text-accent text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
          >
            Download Resume
          </a>

          <p className="text-sm font-bold text-fg-subtle uppercase tracking-widest">
            © {new Date().getFullYear()} Mahek Patel
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: restyle footer for brutalist theme"
```

---

### Task 12: Restyle Utility Pages & MDX Components

**Files:**
- Modify: `app/loading.tsx`
- Modify: `app/not-found.tsx`
- Modify: `mdx-components.tsx`

- [ ] **Step 1: Rewrite `app/loading.tsx`**

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-3 border-fg border-t-transparent rounded-full animate-spin" />
        <p className="text-fg-muted text-xs font-bold uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-black text-accent mb-4">404</h1>
        <p className="text-xl text-fg-muted font-bold uppercase tracking-widest mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:bg-fg hover:text-bg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `mdx-components.tsx`**

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="heading-1 text-fg mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="heading-2 text-fg mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="heading-3 text-fg mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-fg-muted leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-fg-muted mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-fg-muted mb-4 space-y-2">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-bg-alt text-accent font-mono text-sm border border-fg-subtle">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 bg-fg text-bg font-mono text-sm overflow-x-auto mb-4 border-2 border-fg">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent font-bold hover:text-accent-dark underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ...components,
  };
}
```

- [ ] **Step 4: Commit**

```bash
git add app/loading.tsx app/not-found.tsx mdx-components.tsx
git commit -m "feat: restyle loading, 404, and MDX components for brutalist theme"
```

---

### Task 13: Restyle Project Detail Page

**Files:**
- Modify: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Rewrite `app/projects/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, FileText } from "lucide-react";
import { projects } from "@/content/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Mahek Patel`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="section-container pt-24 pb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-fg-muted hover:text-accent text-sm font-bold uppercase tracking-widest transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 ${
              project.type === "ds-ml"
                ? "border-accent text-accent"
                : "border-fg text-fg"
            }`}
          >
            {project.type === "ds-ml" ? "Data Science / ML" : "Software Engineering"}
          </span>
          <span className="px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-fg-subtle text-fg-subtle">
            {project.source === "professional" ? "Professional" : "Academic"}
          </span>
        </div>

        <h1 className="heading-1 text-fg mb-4">{project.title}</h1>
        <p className="text-xl text-fg-muted max-w-3xl">
          {project.longDescription || project.description}
        </p>

        <div className="flex gap-3 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              <Github size={18} />
              View Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-accent bg-accent text-white text-sm font-bold uppercase tracking-widest hover:bg-accent-dark transition-colors"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {project.paper && (
            <a
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              <FileText size={18} />
              Read Paper
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-fg text-fg"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      <article className="section-container pb-24">
        <div className="border-t-4 border-fg pt-8 max-w-3xl">
          <p className="text-fg-muted">
            Detailed case study content coming soon. This page will include:
          </p>
          <ul className="text-fg-muted mt-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Problem and context
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Approach and methodology
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Technical implementation details
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Results and impact
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">▹</span>
              Lessons learned
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/projects/\[slug\]/page.tsx
git commit -m "feat: restyle project detail page for brutalist theme"
```

---

### Task 14: Remove "About" from Nav & Page, Clean Up D3 Dependency

The About section content is valuable but it's redundant with the Hero stat line for a recruiter-optimized design. However, the spec kept About as section 01, so we keep it. Instead, this task removes the `d3` dependency from `package.json` since all visualizations are deleted, and removes the unused `@types/d3` types.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Uninstall d3 packages**

```bash
npm uninstall d3 @types/d3
```

- [ ] **Step 2: Verify build succeeds end-to-end**

Run: `npm run build`
Expected: Build succeeds with no errors. All pages render.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: No errors (warnings are acceptable).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove d3 dependency — visualizations deleted"
```

---

### Task 15: Final Visual Verification

- [ ] **Step 1: Start dev server and visually verify**

Run: `npm run dev`

Open http://localhost:3000 and verify:
- Light off-white background (`#f5f0e8`) everywhere
- Heavy black type in hero (`MAHEK PATEL.`)
- Red accent on stat line, section borders, hover states
- Bordered cards in Experience, Projects, Education
- Bordered tags for skills and technologies
- Contact form with thick borders
- Navbar shows `MP.` logo, uppercase links, bottom border on scroll
- Footer with bordered social icons
- 404 page at `/nonexistent` shows brutalist styling
- Project detail page at `/projects/wedding-rsvp-analytics` shows brutalist styling
- Mobile responsive: hamburger nav, single column, scaled heading

- [ ] **Step 2: Commit any final tweaks if needed**

```bash
git add -A
git commit -m "fix: final visual polish for brutalist redesign"
```

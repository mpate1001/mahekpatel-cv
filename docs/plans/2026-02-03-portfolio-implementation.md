# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a personal portfolio website with bold/modern design, data-driven visualizations, and interactive elements showcasing Mahek Patel's experience as a Software Engineer and Data Scientist.

**Architecture:** Next.js 14 App Router with static site generation. Single-page main site with smooth scroll navigation, plus dynamic routes for project case studies. D3.js visualizations wrapped in React components, lazy-loaded for performance.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, D3.js, MDX

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.mjs`

**Step 1: Create Next.js app with TypeScript and Tailwind**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Select options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: No
- App Router: Yes
- Import alias: @/*

**Step 2: Verify installation**

```bash
npm run dev
```

Expected: Dev server starts at http://localhost:3000, default Next.js page renders.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 14 with TypeScript and Tailwind"
```

---

### Task 2: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install animation and visualization libraries**

```bash
npm install framer-motion d3 @types/d3
```

**Step 2: Install MDX support**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
```

**Step 3: Install utility libraries**

```bash
npm install clsx tailwind-merge lucide-react
```

**Step 4: Verify all installed**

```bash
npm list --depth=0
```

Expected: All packages listed without errors.

**Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add framer-motion, d3, mdx, and utility dependencies"
```

---

### Task 3: Configure Tailwind Theme

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Update Tailwind config with custom theme**

Replace contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary accent - electric teal
        accent: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        // Dark background shades
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Verify config is valid**

```bash
npm run dev
```

Expected: No Tailwind config errors, dev server runs.

**Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure Tailwind theme with accent colors and animations"
```

---

### Task 4: Set Up Global Styles and Fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Update global CSS**

Replace contents of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 2 6% 3%;
    --foreground: 210 40% 98%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-dark-950 text-dark-100 antialiased;
  }

  ::selection {
    @apply bg-accent-500/30 text-accent-100;
  }
}

@layer components {
  .section-container {
    @apply mx-auto max-w-6xl px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 sm:py-20 lg:py-24;
  }

  .heading-1 {
    @apply text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight;
  }

  .heading-2 {
    @apply text-3xl sm:text-4xl font-bold tracking-tight;
  }

  .heading-3 {
    @apply text-xl sm:text-2xl font-semibold;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent;
  }
}

@layer utilities {
  .animate-delay-100 {
    animation-delay: 100ms;
  }
  .animate-delay-200 {
    animation-delay: 200ms;
  }
  .animate-delay-300 {
    animation-delay: 300ms;
  }
}
```

**Step 2: Update layout with fonts**

Replace contents of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify styles apply**

```bash
npm run dev
```

Expected: Page has dark background, custom fonts loaded.

**Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add global styles, fonts, and utility classes"
```

---

### Task 5: Create Utility Functions

**Files:**
- Create: `lib/utils.ts`

**Step 1: Create utils file**

Create `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Commit**

```bash
git add lib/utils.ts
git commit -m "feat: add cn utility for className merging"
```

---

### Task 6: Create Directory Structure

**Files:**
- Create: multiple directories

**Step 1: Create all directories**

```bash
mkdir -p components/layout components/sections components/visualizations components/ui
mkdir -p content/data content/projects
mkdir -p public/images
```

**Step 2: Create placeholder files**

Create `content/data/experience.ts`:

```typescript
export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  // TODO: Add your experience entries
];
```

Create `content/data/skills.ts`:

```typescript
export interface Skill {
  id: string;
  name: string;
  category: "languages" | "ml-ds" | "engineering" | "tools";
  proficiency: number; // 1-5
  related: string[]; // IDs of related skills
}

export const skills: Skill[] = [
  // TODO: Add your skills
];
```

Create `content/data/education.ts`:

```typescript
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  inProgress: boolean;
  highlights: string[];
  logo?: string;
}

export const education: Education[] = [
  // TODO: Add your education entries
];
```

Create `content/data/projects.ts`:

```typescript
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: "ds-ml" | "software";
  source: "professional" | "academic";
  featured: boolean;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  paper?: string;
}

export const projects: Project[] = [
  // TODO: Add your projects
];
```

**Step 3: Commit**

```bash
git add components content lib public
git commit -m "feat: create directory structure and data type definitions"
```

---

## Phase 2: Layout Components

### Task 7: Create Navbar Component

**Files:**
- Create: `components/layout/Navbar.tsx`

**Step 1: Create Navbar**

Create `components/layout/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
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

      // Find active section
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-dark-950/80 backdrop-blur-lg border-b border-dark-800"
          : "bg-transparent"
      )}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold text-accent-400 hover:text-accent-300 transition-colors"
          >
            MP
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent-400",
                    activeSection === item.href.slice(1)
                      ? "text-accent-400"
                      : "text-dark-300"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-dark-300 hover:text-accent-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="py-4 space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "block text-lg font-medium transition-colors hover:text-accent-400",
                        activeSection === item.href.slice(1)
                          ? "text-accent-400"
                          : "text-dark-300"
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

**Step 2: Verify component renders**

Add to `app/page.tsx` temporarily:

```tsx
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="h-screen flex items-center justify-center">
          <h1 className="heading-1">Test</h1>
        </div>
      </main>
    </>
  );
}
```

```bash
npm run dev
```

Expected: Navbar appears, scroll behavior works, mobile menu toggles.

**Step 3: Commit**

```bash
git add components/layout/Navbar.tsx app/page.tsx
git commit -m "feat: add responsive Navbar with scroll detection"
```

---

### Task 8: Create Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`

**Step 1: Create Footer**

Create `components/layout/Footer.tsx`:

```tsx
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:your@email.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-dark-800 bg-dark-950">
      <div className="section-container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Resume Download */}
          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Download Resume
          </a>

          {/* Copyright */}
          <p className="text-sm text-dark-500">
            © {new Date().getFullYear()} Mahek Patel
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer with social links and resume download"
```

---

## Phase 3: Section Components

### Task 9: Create Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

**Step 1: Create Hero component**

Create `components/sections/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const roles = [
  "Software Engineer",
  "Data Scientist",
  "ML Engineer",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-600/10 rounded-full blur-3xl animate-float animate-delay-200" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent-400 font-mono text-lg mb-4"
          >
            Hi, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-1 text-dark-50 mb-4"
          >
            Mahek Patel
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="heading-2 text-dark-400 mb-6"
          >
            I build things with{" "}
            <span className="text-gradient">data & code</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-dark-300 max-w-xl mb-8"
          >
            Software Engineer with 7+ years of experience, currently pursuing a
            Master's in Data Science at UNC Chapel Hill. Passionate about
            building ML systems that ship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white font-medium rounded-lg transition-colors"
            >
              View My Work
              <ArrowDown size={18} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent-600 text-accent-400 hover:bg-accent-600/10 font-medium rounded-lg transition-colors"
            >
              Download Resume
              <Download size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-dark-500 hover:text-accent-400 transition-colors"
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with animations"
```

---

### Task 10: Create About Section

**Files:**
- Create: `components/sections/About.tsx`

**Step 1: Create About component**

Create `components/sections/About.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Currently", value: "MADS @ UNC" },
  { label: "Focus", value: "ML Systems" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:your@email.com", label: "Email" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-dark-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-12">
            <span className="text-accent-400 font-mono text-xl mr-2">01.</span>
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="relative w-64 h-64 mx-auto">
                {/* Placeholder for photo - replace with actual image */}
                <div className="w-full h-full rounded-lg bg-dark-800 border-2 border-accent-500/20 flex items-center justify-center">
                  <span className="text-dark-500">Photo</span>
                </div>
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-accent-500 rounded-lg translate-x-4 translate-y-4 -z-10" />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <p className="text-dark-300 leading-relaxed">
                I'm a Software Engineer with over 7 years of experience building
                production systems, currently expanding into Data Science and
                Machine Learning through my Master's program at UNC Chapel Hill.
              </p>
              <p className="text-dark-300 leading-relaxed">
                My background in software engineering gives me a unique
                perspective on ML—I focus on building systems that don't just
                perform well in notebooks, but actually ship and scale in
                production.
              </p>
              <p className="text-dark-300 leading-relaxed">
                When I'm not coding, you can find me exploring new datasets,
                reading about the latest in ML research, or contributing to
                open-source projects.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-accent-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-dark-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with stats and social links"
```

---

### Task 11: Create Experience Section

**Files:**
- Create: `components/sections/Experience.tsx`

**Step 1: Create Experience component**

Create `components/sections/Experience.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
```

**Step 2: Commit**

```bash
git add components/sections/Experience.tsx
git commit -m "feat: add Experience section with timeline layout"
```

---

### Task 12: Create Projects Section

**Files:**
- Create: `components/sections/Projects.tsx`

**Step 1: Create Projects component**

Create `components/sections/Projects.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects, type Project } from "@/content/data/projects";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, FileText } from "lucide-react";

// Placeholder data until real data is added
const placeholderProjects: Project[] = [
  {
    id: "1",
    slug: "ml-project",
    title: "ML Pipeline System",
    description: "End-to-end machine learning pipeline for production deployment",
    type: "ds-ml",
    source: "professional",
    featured: true,
    technologies: ["Python", "TensorFlow", "Kubernetes", "Airflow"],
    github: "https://github.com",
  },
  {
    id: "2",
    slug: "web-app",
    title: "Real-time Analytics Dashboard",
    description: "Full-stack web application with live data visualization",
    type: "software",
    source: "professional",
    featured: true,
    technologies: ["React", "Node.js", "PostgreSQL", "D3.js"],
    demo: "https://example.com",
  },
  {
    id: "3",
    slug: "nlp-research",
    title: "NLP Research Project",
    description: "Academic research on transformer architectures",
    type: "ds-ml",
    source: "academic",
    featured: false,
    technologies: ["Python", "PyTorch", "HuggingFace"],
    paper: "https://arxiv.org",
  },
];

type FilterType = "all" | "ds-ml" | "software";
type FilterSource = "all" | "professional" | "academic";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [sourceFilter, setSourceFilter] = useState<FilterSource>("all");

  const data = projects.length > 0 ? projects : placeholderProjects;

  const filteredProjects = data.filter((project) => {
    const typeMatch = typeFilter === "all" || project.type === typeFilter;
    const sourceMatch = sourceFilter === "all" || project.source === sourceFilter;
    return typeMatch && sourceMatch;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-dark-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-8">
            <span className="text-accent-400 font-mono text-xl mr-2">03.</span>
            Projects
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex gap-2">
              {(["all", "ds-ml", "software"] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTypeFilter(filter)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    typeFilter === filter
                      ? "bg-accent-600 text-white"
                      : "bg-dark-800 text-dark-300 hover:text-accent-400"
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
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      sourceFilter === filter
                        ? "bg-accent-600 text-white"
                        : "bg-dark-800 text-dark-300 hover:text-accent-400"
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
            <div className="space-y-8 mb-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group relative bg-dark-800/50 rounded-xl p-6 border border-dark-700 hover:border-accent-500/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="heading-3 text-dark-50 group-hover:text-accent-400 transition-colors">
                          {project.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-mono rounded",
                            project.type === "ds-ml"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-blue-500/20 text-blue-400"
                          )}
                        >
                          {project.type === "ds-ml" ? "DS/ML" : "SWE"}
                        </span>
                      </div>
                      <p className="text-dark-300">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono text-dark-400 bg-dark-700 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.paper && (
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                          aria-label="Paper"
                        >
                          <FileText size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group bg-dark-800/30 rounded-lg p-5 border border-dark-700 hover:border-accent-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-mono rounded",
                        project.type === "ds-ml"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-blue-500/20 text-blue-400"
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
                          className="text-dark-500 hover:text-accent-400 transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dark-500 hover:text-accent-400 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-dark-100 group-hover:text-accent-400 transition-colors mb-2">
                    {project.title}
                  </h4>
                  <p className="text-sm text-dark-400 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-dark-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: add Projects section with filtering"
```

---

### Task 13: Create Skills Section

**Files:**
- Create: `components/sections/Skills.tsx`

**Step 1: Create Skills component (list fallback, D3 visualization in later task)**

Create `components/sections/Skills.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { skills, type Skill } from "@/content/data/skills";
import { cn } from "@/lib/utils";

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

          {/* Placeholder for D3 visualization */}
          <div className="mt-12 p-8 bg-dark-800/30 rounded-xl border border-dark-700 text-center">
            <p className="text-dark-500 text-sm">
              Interactive skill constellation visualization coming soon
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: add Skills section with categorized list"
```

---

### Task 14: Create Education Section

**Files:**
- Create: `components/sections/Education.tsx`

**Step 1: Create Education component**

Create `components/sections/Education.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { education, type Education } from "@/content/data/education";
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
```

**Step 2: Fix import - use lib/utils cn instead of local**

Update the import at top and remove local cn function:

```tsx
import { cn } from "@/lib/utils";
```

Remove the local `cn` function at the bottom.

**Step 3: Commit**

```bash
git add components/sections/Education.tsx
git commit -m "feat: add Education section with cards"
```

---

### Task 15: Create Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

**Step 1: Create Contact component**

Create `components/sections/Contact.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:your@email.com", label: "Email" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integrate with Formspree or serverless function
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Section Header */}
          <h2 className="heading-2 text-dark-50 mb-4">
            <span className="text-accent-400 font-mono text-xl mr-2">06.</span>
            Get In Touch
          </h2>
          <p className="text-dark-300 mb-8">
            I'm always open to discussing new opportunities, interesting
            projects, or just chatting about data science and software
            engineering.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-accent-400 rounded-lg transition-colors"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-dark-800/50 rounded-xl border border-accent-500/50"
            >
              <p className="text-accent-400 font-medium">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-dark-300 mb-2"
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
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-dark-300 mb-2"
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
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-dark-300 mb-2"
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
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-accent-500 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors",
                  isSubmitting
                    ? "bg-dark-700 text-dark-500 cursor-not-allowed"
                    : "bg-accent-600 hover:bg-accent-500 text-white"
                )}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
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

**Step 2: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add Contact section with form"
```

---

## Phase 4: Assemble Main Page

### Task 16: Assemble All Sections

**Files:**
- Modify: `app/page.tsx`

**Step 1: Update page.tsx with all sections**

Replace contents of `app/page.tsx`:

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Verify full page renders**

```bash
npm run dev
```

Expected: All sections render, smooth scroll works, animations trigger on scroll.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble main page with all sections"
```

---

## Phase 5: D3 Visualizations (Optional Enhancement)

### Task 17: Create Hero Visualization

**Files:**
- Create: `components/visualizations/HeroVisualization.tsx`

**Step 1: Create animated particle/node visualization**

Create `components/visualizations/HeroVisualization.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Node {
  id: string;
  group: "engineering" | "data-science" | "shared";
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface Link {
  source: string;
  target: string;
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

const groupColors = {
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

    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    // Links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

    // Nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
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
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
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
```

**Step 2: Integrate into Hero section**

Update `components/sections/Hero.tsx` to optionally use the visualization:

Add import at top:
```tsx
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(
  () =>
    import("@/components/visualizations/HeroVisualization").then(
      (mod) => mod.HeroVisualization
    ),
  { ssr: false }
);
```

Add visualization container in the Hero JSX (after the CTA buttons div, inside section-container):

```tsx
{/* Visualization */}
<div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[500px] opacity-60">
  <HeroVisualization />
</div>
```

**Step 3: Commit**

```bash
git add components/visualizations/HeroVisualization.tsx components/sections/Hero.tsx
git commit -m "feat: add D3 force-directed graph to Hero section"
```

---

### Task 18: Create Skill Constellation Visualization

**Files:**
- Create: `components/visualizations/SkillConstellation.tsx`

**Step 1: Create constellation component**

Create `components/visualizations/SkillConstellation.tsx`:

```tsx
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

const categoryColors = {
  languages: "#3b82f6",
  "ml-ds": "#a855f7",
  engineering: "#22c55e",
  tools: "#f97316",
};

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

    // Create links from related skills
    const links: { source: string; target: string }[] = [];
    skills.forEach((skill) => {
      skill.related.forEach((relatedId) => {
        if (skills.find((s) => s.id === relatedId)) {
          links.push({ source: skill.id, target: relatedId });
        }
      });
    });

    // Remove duplicates
    const uniqueLinks = links.filter(
      (link, index, self) =>
        index ===
        self.findIndex(
          (l) =>
            (l.source === link.source && l.target === link.target) ||
            (l.source === link.target && l.target === link.source)
        )
    );

    const simulation = d3
      .forceSimulation(skills as any)
      .force(
        "link",
        d3
          .forceLink(uniqueLinks)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(uniqueLinks)
      .join("line")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1);

    // Nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(skills)
      .join("g")
      .attr("cursor", "pointer")
      .on("mouseenter", (event, d) => setHoveredSkill(d.id))
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
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
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

      svg.selectAll("circle").attr("fill-opacity", (d: any) =>
        relatedIds.includes(d.id) ? 0.5 : 0.1
      );
      svg.selectAll("line").attr("stroke-opacity", (d: any) =>
        relatedIds.includes(d.source.id) && relatedIds.includes(d.target.id)
          ? 0.8
          : 0.1
      );
    } else {
      svg.selectAll("circle").attr("fill-opacity", 0.2);
      svg.selectAll("line").attr("stroke-opacity", 0.4);
    }
  }, [hoveredSkill, skills]);

  return (
    <svg ref={svgRef} width={width} height={height} className="w-full h-auto" />
  );
}
```

**Step 2: Integrate into Skills section**

Update `components/sections/Skills.tsx` - replace the placeholder div with:

```tsx
import dynamic from "next/dynamic";

const SkillConstellation = dynamic(
  () =>
    import("@/components/visualizations/SkillConstellation").then(
      (mod) => mod.SkillConstellation
    ),
  { ssr: false, loading: () => <div className="h-96 bg-dark-800/30 rounded-xl animate-pulse" /> }
);
```

Replace the placeholder div at the bottom with:

```tsx
{/* Skill Constellation */}
<div className="mt-12 p-4 bg-dark-800/30 rounded-xl border border-dark-700">
  <SkillConstellation width={800} height={500} />
</div>
```

**Step 3: Commit**

```bash
git add components/visualizations/SkillConstellation.tsx components/sections/Skills.tsx
git commit -m "feat: add interactive D3 skill constellation"
```

---

## Phase 6: Project Detail Pages

### Task 19: Set Up MDX Support

**Files:**
- Modify: `next.config.mjs`
- Create: `mdx-components.tsx`

**Step 1: Update next.config.mjs**

Replace contents of `next.config.mjs`:

```javascript
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**Step 2: Create mdx-components.tsx in root**

Create `mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="heading-1 text-dark-50 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="heading-2 text-dark-50 mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="heading-3 text-dark-100 mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-dark-300 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-dark-300 mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-dark-300 mb-4 space-y-2">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-dark-800 text-accent-400 rounded font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 bg-dark-800 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent-400 hover:text-accent-300 underline"
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

**Step 3: Commit**

```bash
git add next.config.mjs mdx-components.tsx
git commit -m "feat: configure MDX support for project pages"
```

---

### Task 20: Create Project Detail Page

**Files:**
- Create: `app/projects/[slug]/page.tsx`

**Step 1: Create dynamic project page**

Create directories and file `app/projects/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, FileText } from "lucide-react";
import { projects } from "@/content/data/projects";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Mahek Patel`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="section-container pt-24 pb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-accent-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 text-sm font-mono rounded ${
              project.type === "ds-ml"
                ? "bg-purple-500/20 text-purple-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {project.type === "ds-ml" ? "Data Science / ML" : "Software Engineering"}
          </span>
          <span className="px-3 py-1 text-sm font-mono bg-dark-800 text-dark-400 rounded">
            {project.source === "professional" ? "Professional" : "Academic"}
          </span>
        </div>

        <h1 className="heading-1 text-dark-50 mb-4">{project.title}</h1>
        <p className="text-xl text-dark-300 max-w-3xl">
          {project.longDescription || project.description}
        </p>

        {/* Links */}
        <div className="flex gap-4 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-200 rounded-lg transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white rounded-lg transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-200 rounded-lg transition-colors"
            >
              <FileText size={18} />
              Read Paper
            </a>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm font-mono text-dark-300 bg-dark-800 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Content placeholder - will be replaced with MDX content */}
      <article className="section-container pb-24">
        <div className="prose prose-invert max-w-3xl">
          <p className="text-dark-400">
            Detailed case study content coming soon. This page will include:
          </p>
          <ul className="text-dark-400">
            <li>Problem and context</li>
            <li>Approach and methodology</li>
            <li>Technical implementation details</li>
            <li>Results and impact</li>
            <li>Lessons learned</li>
          </ul>
        </div>
      </article>
    </main>
  );
}
```

**Step 2: Commit**

```bash
mkdir -p app/projects/\[slug\]
git add app/projects/
git commit -m "feat: add project detail page with dynamic routing"
```

---

## Phase 7: Final Polish

### Task 21: Add Loading and Error States

**Files:**
- Create: `app/loading.tsx`
- Create: `app/not-found.tsx`

**Step 1: Create loading state**

Create `app/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-dark-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
```

**Step 2: Create not found page**

Create `app/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent-400 mb-4">404</h1>
        <p className="text-xl text-dark-300 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white font-medium rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add app/loading.tsx app/not-found.tsx
git commit -m "feat: add loading and 404 pages"
```

---

### Task 22: Create Placeholder Resume

**Files:**
- Create: `public/resume.pdf`

**Step 1: Add placeholder or real resume**

For now, create a placeholder text file (replace with actual PDF later):

```bash
echo "Replace this file with your actual resume PDF" > public/resume.txt
```

Note: You'll need to add your actual resume.pdf file manually.

**Step 2: Commit**

```bash
git add public/
git commit -m "chore: add resume placeholder"
```

---

### Task 23: Final Build Verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes without errors.

**Step 2: Run production server**

```bash
npm run start
```

Expected: Site runs at localhost:3000, all pages load correctly.

**Step 3: Run linter**

```bash
npm run lint
```

Expected: No linting errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: verify production build"
```

---

## Summary

**Total Tasks:** 23

**Phases:**
1. Project Setup (Tasks 1-6)
2. Layout Components (Tasks 7-8)
3. Section Components (Tasks 9-15)
4. Assemble Main Page (Task 16)
5. D3 Visualizations (Tasks 17-18)
6. Project Detail Pages (Tasks 19-20)
7. Final Polish (Tasks 21-23)

**After completing all tasks, you will have:**
- Fully functional portfolio website
- All 7 sections (Hero, About, Experience, Projects, Skills, Education, Contact)
- Interactive D3 visualizations
- Responsive design with dark theme
- Project detail pages with MDX support
- Type-safe data management
- Production-ready build

**Next steps after implementation:**
1. Add your actual content to `content/data/*.ts` files
2. Add your photo to `public/images/`
3. Add your resume PDF to `public/`
4. Create MDX case studies in `content/projects/`
5. Update social links in components
6. Deploy to Vercel

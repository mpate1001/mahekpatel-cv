"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import dynamic from "next/dynamic";

const HeroVisualization = dynamic(
  () =>
    import("@/components/visualizations/HeroVisualization").then(
      (mod) => mod.HeroVisualization
    ),
  { ssr: false }
);

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
            Software Engineer specializing in event-driven data platforms
            at Duke Energy. Currently pursuing a Master&apos;s in Data Science at
            UNC Chapel Hill. I build production-grade pipelines that scale.
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

        {/* Visualization */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[500px] opacity-60">
          <HeroVisualization />
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

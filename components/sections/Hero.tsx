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

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

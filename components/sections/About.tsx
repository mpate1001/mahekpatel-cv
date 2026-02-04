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
  { label: "Focus", value: "Data Science" },
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
                <Image
                  src="/images/headshot.jpg"
                  alt="Mahek Patel"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  unoptimized
                />
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-accent-500 rounded-lg translate-x-4 translate-y-4 -z-10" />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <p className="text-dark-300 leading-relaxed">
                Software Engineer specializing in event-driven data platforms.
                I build end-to-end data pipelines ingesting from enterprise apps,
                normalizing, and publishing to Kafka for real-time consumption.
              </p>
              <p className="text-dark-300 leading-relaxed">
                Currently pursuing my Master&apos;s in Data Science at UNC Chapel Hill
                while working at Duke Energy. With 6+ years across software and data
                engineering, I ship production-grade services with full-stack
                observability, optimized for reliability and throughput.
              </p>
              <p className="text-dark-300 leading-relaxed">
                My background spans Java, Python, AWS, SQL, and CI/CD. I focus on
                building systems that don&apos;t just work in development, but scale
                and perform in production with p99 latency in mind.
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
              <div className="flex gap-4 pt-4 relative">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={link.label === "Email" ? handleEmailClick : undefined}
                    {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={24} />
                  </a>
                ))}
                <AnimatePresence>
                  {emailCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -bottom-10 left-0 flex items-center gap-2 px-3 py-1.5 bg-accent-600 text-white text-sm font-medium rounded-lg whitespace-nowrap"
                    >
                      <Check size={14} />
                      Copied!
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

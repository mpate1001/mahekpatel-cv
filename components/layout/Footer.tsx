"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <footer className="border-t border-dark-800 bg-dark-950">
      <div className="section-container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4 relative">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.label === "Email" ? handleEmailClick : undefined}
                {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="p-2 text-dark-400 hover:text-accent-400 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
            <AnimatePresence>
              {emailCopied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-accent-600 text-white text-sm font-medium rounded-lg whitespace-nowrap"
                >
                  <Check size={14} />
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
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

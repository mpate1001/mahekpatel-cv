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

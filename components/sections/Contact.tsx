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

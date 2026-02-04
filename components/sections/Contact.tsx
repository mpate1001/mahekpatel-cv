"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, Check, Copy } from "lucide-react";
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
      // Fallback: try mailto if clipboard fails
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
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just chatting about data science and software
            engineering.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12 relative">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.label === "Email" ? handleEmailClick : undefined}
                {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="p-4 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-accent-400 rounded-lg transition-colors relative"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
            {/* Email copied toast */}
            <AnimatePresence>
              {emailCopied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-accent-600 text-white text-sm font-medium rounded-lg whitespace-nowrap"
                >
                  <Check size={16} />
                  Email copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-dark-800/50 rounded-xl border border-accent-500/50"
            >
              <p className="text-accent-400 font-medium">
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : submitError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-dark-800/50 rounded-xl border border-red-500/50"
            >
              <p className="text-red-400 font-medium mb-4">
                Something went wrong. Please try again or email me directly.
              </p>
              <button
                onClick={() => setSubmitError(false)}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white font-medium rounded-lg transition-colors"
              >
                Try Again
              </button>
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

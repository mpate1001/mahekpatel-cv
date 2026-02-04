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

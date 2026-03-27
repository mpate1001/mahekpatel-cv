import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="heading-1 text-fg mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="heading-2 text-fg mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="heading-3 text-fg mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-fg-muted leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-fg-muted mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-fg-muted mb-4 space-y-2">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-bg-alt text-accent font-mono text-sm border border-fg-subtle">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="p-4 bg-fg text-bg font-mono text-sm overflow-x-auto mb-4 border-2 border-fg">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent font-bold hover:text-accent-dark underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ...components,
  };
}

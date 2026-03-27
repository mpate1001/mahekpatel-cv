import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-black text-accent mb-4">404</h1>
        <p className="text-xl text-fg-muted font-bold uppercase tracking-widest mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-fg text-fg text-sm font-bold uppercase tracking-widest hover:bg-fg hover:text-bg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

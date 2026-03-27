export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-3 border-fg border-t-transparent rounded-full animate-spin" />
        <p className="text-fg-muted text-xs font-bold uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}

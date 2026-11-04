export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border-2 border-ink bg-background px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-foreground transition duration-200 hover:-translate-y-0.5 hover:bg-sage">
      {children}
    </span>
  );
}

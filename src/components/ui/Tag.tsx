export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-signal/25 bg-background/60 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-muted transition duration-200 hover:-translate-y-0.5 hover:border-signal/60 hover:text-foreground">
      {children}
    </span>
  );
}

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center border-2 border-ink bg-background px-2.5 py-1 font-mono text-[11px] font-semibold whitespace-nowrap tracking-wide text-foreground transition duration-200 hover:-translate-y-0.5 hover:bg-sage${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </span>
  );
}

export function DownloadButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      download
      className={`inline-flex items-center gap-2 border-2 border-ink bg-accent px-5 py-2.5 text-sm text-accent-fg shadow-[4px_4px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none${
        className ? ` ${className}` : ""
      }`}
    >
      {children} <span aria-hidden>↓</span>
    </a>
  );
}

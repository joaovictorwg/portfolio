import { getTechIcon } from "@/lib/tech-icons";

export function TechIcon({
  name,
  className = "size-3",
}: {
  name: string;
  className?: string;
}) {
  const icon = getTechIcon(name);

  if (!icon) return null;

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 ${className}`}
    >
      <path d={icon.path} />
    </svg>
  );
}

import Image from "next/image";
import { localize } from "@/lib/localize";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { InteractiveTilt } from "./ui/InteractiveTilt";
import { Tag } from "./ui/Tag";

export function ProjectCard({
  project,
  locale,
  detailsLabel,
}: {
  project: Project;
  locale: string;
  detailsLabel: string;
}) {
  const cover = project.images[0];

  return (
    <InteractiveTilt className="group flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface/90 p-5 transition duration-300 hover:border-accent/60">
      {cover ? (
        <Link
          href={`/projects/${project.slug}`}
          className="relative -mx-5 -mt-5 mb-1 block aspect-[16/9] overflow-hidden border-b border-border bg-background"
          aria-label={localize(project.title, locale)}
        >
          <Image
            src={cover.src}
            alt={localize(cover.alt, locale)}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {localize(project.title, locale)}
          </Link>
        </h3>
        {project.badge ? (
          <span className="inline-flex shrink-0 items-center rounded-full bg-signal px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-signal-fg">
            {localize(project.badge, locale)}
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-muted">
        {localize(project.summary, locale)}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-fg transition duration-300 hover:brightness-110"
      >
        <span
          aria-hidden="true"
          className="inline-block -translate-x-1.5 rotate-[-24deg] text-accent-fg/70 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100"
        >
          <svg viewBox="0 0 28 28" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M4 24 C 4 14, 10 5, 23 3 C 25 14, 19 23, 4 24 Z" />
          </svg>
        </span>
        {detailsLabel}{" "}
        <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </Link>
    </InteractiveTilt>
  );
}

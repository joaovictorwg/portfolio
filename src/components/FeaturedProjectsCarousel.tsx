"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjectsCarousel({
  projects,
  locale,
  title,
  allLabel,
  previousLabel,
  nextLabel,
  detailsLabel,
}: {
  projects: Project[];
  locale: string;
  title: string;
  allLabel: string;
  previousLabel: string;
  nextLabel: string;
  detailsLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeProject = projects[activeIndex];

  const move = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (reduceMotion || projects.length < 2) return;

    const timer = window.setInterval(() => move(1), 6500);
    return () => window.clearInterval(timer);
  }, [activeIndex, move, reduceMotion, projects.length]);

  if (!activeProject) return null;

  return (
    <div className="modular-projects">
      <div className="flex w-full max-w-lg flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-display text-3xl font-bold tracking-tight text-foreground uppercase md:text-4xl">
            {title}
          </p>
          <Link
            href="/projects"
            className="mt-3 inline-flex border-2 border-ink bg-background px-4 py-2 font-mono text-xs font-semibold uppercase shadow-[3px_3px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sage hover:shadow-none"
          >
            {allLabel} <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label={previousLabel}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-terracotta text-lg font-bold text-ink shadow-[3px_3px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-terracotta text-lg font-bold text-ink shadow-[3px_3px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-6 w-full max-w-lg" aria-live="polite">
        <ProjectCard
          project={activeProject}
          locale={locale}
          detailsLabel={detailsLabel}
        />
      </div>

      <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
        {projects.map((project, index) => (
          <span
            key={project.id}
            className={`h-2.5 w-2.5 border border-ink ${
              index === activeIndex ? "bg-accent" : "bg-background"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

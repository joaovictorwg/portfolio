"use client";

import { useLocale, useTranslations } from "next-intl";
import { concepts } from "@/content/concepts";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { localize } from "@/lib/localize";
import { Tag } from "@/components/ui/Tag";
import { WORLD_MAP, type InteractableTarget } from "./map";

export function FallbackMap() {
  const t = useTranslations("World");
  const locale = useLocale();

  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      <ZoneCard title={t(WORLD_MAP.projects.labelKey)} accent={WORLD_MAP.projects.color}>
        {projects.map((project) => (
          <details key={project.id} className="border-t border-border py-2">
            <summary className="cursor-pointer text-sm">
              {localize(project.title, locale)}
            </summary>
            <Panel
              title={localize(project.title, locale)}
              body={localize(project.summary, locale)}
              tags={[...project.technologies.slice(0, 6), ...project.architecture]}
            />
          </details>
        ))}
      </ZoneCard>
      <ZoneCard
        title={t(WORLD_MAP.experience.labelKey)}
        accent={WORLD_MAP.experience.color}
      >
        {experience.map((job) => (
          <details key={job.id} className="border-t border-border py-2">
            <summary className="cursor-pointer text-sm">
              {localize(job.company, locale)}
            </summary>
            <Panel
              title={`${localize(job.role, locale)} · ${localize(job.company, locale)}`}
              body={localize(job.summary, locale)}
              tags={job.technologies}
            />
          </details>
        ))}
      </ZoneCard>
      <ZoneCard title={t(WORLD_MAP.concepts.labelKey)} accent={WORLD_MAP.concepts.color}>
        {concepts.map((concept) => (
          <details key={concept.id} className="border-t border-border py-2">
            <summary className="cursor-pointer text-sm">
              {concept.id === "queue" ? t("conceptQueue") : t("conceptStack")}
            </summary>
            <p className="mt-2 text-sm text-muted">{t("comingSoon")}</p>
            <p className="mt-2 font-mono text-xs">{concept.complexity}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {concept.operations.map((op) => (
                <Tag key={op}>{op}</Tag>
              ))}
            </div>
          </details>
        ))}
      </ZoneCard>
      <ZoneCard title={t(WORLD_MAP.start.labelKey)} accent={WORLD_MAP.start.color}>
        <p className="text-sm text-muted">{t("intro")}</p>
      </ZoneCard>
    </div>
  );
}

function ZoneCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="flex items-center gap-2 text-lg">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Panel({
  title,
  body,
  tags,
}: {
  title: string;
  body: string;
  tags: string[];
}) {
  return (
    <div className="mt-2">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

export function InteractionPanel({
  target,
  onClose,
}: {
  target: InteractableTarget;
  onClose: () => void;
}) {
  const t = useTranslations("World");
  const locale = useLocale();

  let title = t("zoneStart");
  let body = t("intro");
  let tags: string[] = [];
  let extra: React.ReactNode = null;

  if (target.kind === "project") {
    const project = projects.find((item) => item.id === target.id);
    if (project) {
      title = localize(project.title, locale);
      body = `${localize(project.problem, locale)}\n\n${localize(project.summary, locale)}`;
      tags = [...project.architecture, ...project.technologies.slice(0, 8)];
    }
  }

  if (target.kind === "experience") {
    const job = experience.find((item) => item.id === target.id);
    if (job) {
      title = `${localize(job.role, locale)} · ${localize(job.company, locale)}`;
      body = localize(job.summary, locale);
      tags = job.technologies;
    }
  }

  if (target.kind === "concept") {
    const concept = concepts.find((item) => item.id === target.id);
    title = target.id === "queue" ? t("conceptQueue") : t("conceptStack");
    body = t("comingSoon");
    extra = concept ? (
      <p className="mt-3 font-mono text-xs">{concept.complexity}</p>
    ) : null;
    tags = concept?.operations ?? [];
  }

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="world-panel-title"
      className="absolute right-4 bottom-4 top-20 z-20 w-[min(100%-2rem,24rem)] overflow-auto rounded-2xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id="world-panel-title" className="text-lg tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          className="text-sm text-muted hover:text-foreground"
          onClick={onClose}
        >
          {t("close")}
        </button>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
        {body}
      </p>
      {extra}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </aside>
  );
}

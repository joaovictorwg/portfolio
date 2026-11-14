import type { Experience } from "@/content/types";
import { localize } from "@/lib/localize";
import { TechTag } from "./ui/TechTag";
import { VineRail } from "./ui/VineRail";

export function ExperienceTimeline({
  items,
  locale,
  resultsLabel,
  compact = false,
}: {
  items: Experience[];
  locale: string;
  resultsLabel: string;
  compact?: boolean;
}) {
  const chronologicalItems = [...items].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  return (
    <VineRail>
      <ol className="relative">
        {chronologicalItems.map((job, index) => {
          const localizedResults = localize(job.results, locale);
          const summary =
            compact && job.home?.summary ? job.home.summary : job.summary;
          const results = compact
            ? job.home?.impact
              ? [localize(job.home.impact, locale)]
              : localizedResults.slice(0, 1)
            : localizedResults.slice(0, index === 0 ? 3 : 2);

          return (
            <li key={job.id} data-vine-item className="relative pb-10 last:pb-0">
              <article className="border-b border-border/70 pb-8 last:border-0">
                <p className="font-mono text-xs tracking-wide text-signal">
                  {localize(job.period, locale)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {localize(job.role, locale)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {localize(job.company, locale)} · {localize(job.location, locale)}
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed">
                  {localize(summary, locale)}
                </p>
                <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  {resultsLabel}
                </p>
                <ul className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-muted">
                  {results.map((result) => (
                    <li key={result} className="flex gap-3">
                      <span aria-hidden="true" className="text-signal">↳</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.technologies.slice(0, 5).map((technology) => (
                    <TechTag key={technology} name={technology} />
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </VineRail>
  );
}

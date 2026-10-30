import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { buildAlternates } from "@/i18n/metadata";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localize } from "@/lib/localize";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }
  return {
    title: localize(project.title, locale),
    description: localize(project.summary, locale),
    alternates: buildAlternates(locale, `/projects/${project.slug}`),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const t = await getTranslations("Projects");

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <Link href="/projects" className="text-sm text-muted hover:text-foreground">
          ← {t("back")}
        </Link>
        {project.badge ? (
          <span className="mt-6 inline-flex items-center rounded-full bg-signal px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-signal-fg">
            {localize(project.badge, locale)}
          </span>
        ) : null}
        <h1
          className={`max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl ${
            project.badge ? "mt-3" : "mt-6"
          }`}
        >
          {localize(project.title, locale)}
        </h1>
        <p className="mt-3 text-lg text-muted">{localize(project.summary, locale)}</p>
      </Reveal>

      {(project.links.demo || project.links.github || project.links.monograph) && (
        <Reveal>
          <nav aria-label={t("resources")} className="mt-7 flex flex-wrap gap-3">
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-accent-fg transition hover:brightness-110"
            >
              {t("demo")} <span aria-hidden>↗</span>
            </a>
          ) : null}
          {project.links.monograph ? (
            <a
              href={project.links.monograph}
              download
              className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-sm text-signal-fg transition hover:brightness-110"
            >
              {t("monograph")} <span aria-hidden>↓</span>
            </a>
          ) : null}
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
            >
              {t("github")} <span aria-hidden>↗</span>
            </a>
          ) : null}
        </nav>
        </Reveal>
      )}

      {project.images.length > 0 ? (
        <Reveal>
          <section className="mt-12" aria-label={t("screenshots")}>
            <h2 className="font-display text-3xl font-semibold">{t("screenshots")}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {project.images.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-xl border border-border bg-surface">
                  <div className="relative aspect-[16/10] bg-background">
                    <Image
                      src={image.src}
                      alt={localize(image.alt, locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-muted">
                    {localize(image.alt, locale)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal>
        <section className="mt-10">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            {t("problem")}
          </h2>
          <p className="mt-2 leading-relaxed">{localize(project.problem, locale)}</p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            {t("description")}
          </h2>
          <p className="mt-2 leading-relaxed">
            {localize(project.description, locale)}
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            {t("decisions")}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {localize(project.decisions, locale).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            {t("architecture")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.architecture.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            {t("technologies")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </section>
      </Reveal>

    </article>
  );
}

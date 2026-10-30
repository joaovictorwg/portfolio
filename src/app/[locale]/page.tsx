import { getTranslations, setRequestLocale } from "next-intl/server";
import { profile } from "@/content/profile";
import { getFeaturedProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectCard } from "@/components/ProjectCard";
import { Tag } from "@/components/ui/Tag";
import { ForestSpotlight } from "@/components/ui/ForestSpotlight";
import { PageTree } from "@/components/ui/PageTree";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { buildAlternates } from "@/i18n/metadata";
import { localize } from "@/lib/localize";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return { alternates: buildAlternates(locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const featured = getFeaturedProjects();
  const resume = localize(profile.resume, locale);

  return (
    <div className="relative isolate mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-12 pt-3 md:gap-32 md:px-6 md:pb-20 md:pt-6">
      <PageTree />
      <section
        id="top"
        className="scroll-target relative z-10 max-w-4xl border-l border-signal/60 py-3 pl-5 md:pl-8"
      >
        <Reveal delay={0.05}>
          <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">
            <span aria-hidden className="mr-2 sparkle">
              ✳
            </span>
            {t("kicker")}
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-xs tracking-[0.16em] text-signal uppercase">
            {localize(profile.title, locale)} <span aria-hidden>·</span>{" "}
            {localize(profile.location, locale)}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed md:text-xl">
            {localize(profile.headline, locale)}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {localize(profile.bio, locale)}
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm text-accent-fg transition hover:brightness-110"
              >
                {t("ctaProjects")}
              </a>
            </Magnetic>
            <Magnetic strength={0.18} max={6}>
              <a
                href="#about"
                className="group inline-flex items-center gap-1.5 px-2 py-2 text-sm text-muted transition-colors hover:text-signal"
              >
                {t("ctaAbout")}{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </Magnetic>
          </div>
          <div className="mt-6 flex gap-5 font-mono text-xs text-muted">
            <a
              href={profile.links.github}
              className="transition-colors hover:text-signal"
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
            <a
              href={profile.links.linkedin}
              className="transition-colors hover:text-signal"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </section>

      <ForestSpotlight>
        <section id="projects" className="scroll-target">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
                  {t("projectsLabel")}
                </p>
                <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  {t("featuredTitle")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="group font-mono text-xs text-muted transition-colors hover:text-signal"
              >
                {t("featuredAll")}{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </Link>
            </div>
          </Reveal>
          <RevealGroup className="mt-7 grid gap-4 md:grid-cols-2">
            {featured.map((project) => (
              <RevealItem key={project.id}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  detailsLabel={t("openCaseStudy")}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </ForestSpotlight>

      <section id="experience" className="scroll-target">
        <Reveal className="mb-9 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
            {t("timelineLabel")}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {t("timelineTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("timelineIntro")}</p>
        </Reveal>
        <ExperienceTimeline
          items={experience}
          locale={locale}
          resultsLabel={t("timelineResults")}
        />
        <Reveal delay={0.1}>
          <Link
            href="/experience"
            className="mt-8 inline-flex font-mono text-xs text-signal transition-colors hover:text-accent"
          >
            {t("fullExperience")} ↗
          </Link>
        </Reveal>
      </section>

      <section
        id="about"
        className="scroll-target grid gap-12 border-y border-border py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-14"
      >
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
            {t("aboutLabel")}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {t("aboutTitle")}
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {localize(profile.about, locale)
              .slice(0, 2)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
          <div className="mt-9">
            <h3 className="font-display text-2xl font-semibold">
              {t("educationTitle")}
            </h3>
            {profile.education.map((item) => (
              <div key={localize(item.program, locale)} className="mt-3">
                <p className="font-medium">{localize(item.program, locale)}</p>
                <p className="text-sm text-muted">
                  {localize(item.institution, locale)} ·{" "}
                  {localize(item.period, locale)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="space-y-9">
          <div>
            <h3 className="font-display text-2xl font-semibold">
              {t("stackTitle")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.technologies.map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold">
              {t("interestsTitle")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {localize(profile.interests, locale).map((interest, index) => (
                <li key={interest} className="flex gap-3">
                  <span
                    aria-hidden
                    className="sparkle text-signal"
                    style={{ animationDelay: `${-index * 1.6}s` }}
                  >
                    ✳
                  </span>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section
          id="contact"
          className="scroll-target rounded-3xl border border-accent/30 bg-surface/80 px-6 py-8 md:px-10 md:py-12"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
            {t("contactLabel")}
          </p>
          <div className="mt-3 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                {t("contactTitle")}
              </h2>
              <p className="mt-3 text-muted">{t("contactIntro")}</p>
              <a
                href={profile.links.email}
                className="mt-5 inline-block text-lg text-signal transition-colors hover:text-accent"
              >
                {profile.links.email.replace(/^mailto:/, "")} ↗
              </a>
            </div>
            {resume ? (
              <Magnetic className="shrink-0">
                <a
                  href={resume}
                  download
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 text-sm text-signal-fg transition hover:brightness-110"
                >
                  {t("resumeLink")}{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </a>
              </Magnetic>
            ) : null}
          </div>
        </section>
      </Reveal>
    </div>
  );
}

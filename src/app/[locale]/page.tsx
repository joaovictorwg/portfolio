import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import personalPhoto from "../../../imgs/foto_pessoal/WELV9662 (1).jpg";
import { profile } from "@/content/profile";
import { getFeaturedProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FeaturedProjectsCarousel } from "@/components/FeaturedProjectsCarousel";
import { HomeRightColumn } from "@/components/HomeRightColumn";
import { Tag } from "@/components/ui/Tag";
import { PageTree } from "@/components/ui/PageTree";
import { SystemNetwork } from "@/components/ui/SystemNetwork";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
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
    <div className="relative isolate flex w-full flex-col gap-24 px-8 pb-12 pt-0 md:gap-32 md:px-12 md:pb-20 md:pt-0 lg:px-16 xl:px-20">
      <section
        id="top"
        className="scroll-target relative z-10 grid min-h-[calc(100svh-4rem)] w-full items-center gap-10 border-l border-signal/60 py-8 pl-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:pl-8 lg:gap-16"
      >
        <div className="relative z-10 max-w-3xl">
        <Reveal delay={0.05}>
          <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">
            <span aria-hidden className="mr-2 sparkle">
              ✳
            </span>
            {t("kicker")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
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
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex border-2 border-ink bg-accent px-5 py-2.5 text-sm text-accent-fg shadow-[4px_4px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
              >
                {t("ctaProjects")}
              </a>
            </Magnetic>
            <Magnetic strength={0.18} max={6}>
              <a
                href={resume ?? "#contact"}
                download={resume ? true : undefined}
                className="inline-flex items-center gap-2 border-2 border-ink bg-background px-5 py-2.5 text-sm text-foreground shadow-[4px_4px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sage hover:shadow-none"
              >
                {t("resumeLink")} <span aria-hidden>↓</span>
              </a>
            </Magnetic>
          </div>
          <div className="mt-8">
            <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-signal uppercase">
              {t("contactHeading")}
            </p>
            <div className="mt-3 flex gap-2">
              <a
                href={profile.links.github}
                aria-label="GitHub"
                title="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-background text-foreground shadow-[3px_3px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sage hover:shadow-none"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
                  <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.68c-2.65.58-3.21-1.12-3.21-1.12-.44-1.1-1.07-1.39-1.07-1.39-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.98a9.1 9.1 0 0 1 4.78 0c1.82-1.24 2.62-.98 2.62-.98.51 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.67-2.23 4.48-4.36 4.71.35.3.65.87.65 1.76v2.61c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
                </svg>
              </a>
              <a
                href={profile.links.linkedin}
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-background text-foreground shadow-[3px_3px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sage hover:shadow-none"
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
                  <path d="M5.2 8.1H2.7V21h2.5V8.1ZM3.95 3A1.47 1.47 0 1 0 3.95 5.94 1.47 1.47 0 0 0 3.95 3ZM21.3 13.6c0-3.88-2.07-5.69-4.83-5.69-2.23 0-3.23 1.23-3.79 2.09V8.1h-2.5V21h2.5v-6.39c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.91 2.08 3.41V21h2.5v-7.4Z" />
                </svg>
              </a>
              <a
                href={profile.links.email}
                aria-label="E-mail"
                title="E-mail"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-background text-foreground shadow-[3px_3px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-sage hover:shadow-none"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="0.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
        </div>
        <div className="hero-visual relative hidden min-h-[520px] lg:block">
          <div className="hero-visual__backdrop absolute inset-8 bg-sage" />
          <figure className="hero-visual__photo absolute inset-y-0 right-0 w-[78%] overflow-hidden border-2 border-ink bg-surface">
            <Image
              src={personalPhoto}
              alt="João Victor Walcacer Giani"
              fill
              priority
              sizes="(max-width: 1280px) 42vw, 560px"
              className="object-cover"
            />
          </figure>
          <div className="hero-visual__network absolute inset-0">
            <SystemNetwork />
          </div>
          <span className="absolute bottom-5 left-4 border-2 border-ink bg-olive px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
            Software engineer · Brazil
          </span>
        </div>
      </section>

      <PageTree />

      <section className="modular-skills grid border-2 border-ink bg-sage md:grid-cols-[10rem_1fr]">
        <div className="flex items-center border-b-2 border-ink bg-olive px-5 py-5 font-display text-2xl font-bold uppercase md:border-b-0 md:border-r-2">
          Stack
        </div>
        <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-ink sm:grid-cols-4 md:grid-cols-7 md:divide-y-0">
          {profile.technologies.slice(0, 7).map((technology) => (
            <div key={technology} className="flex min-h-20 items-center justify-center px-3 py-4 text-center font-mono text-xs font-medium uppercase">
              {technology}
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[42%_50%] lg:items-start lg:justify-between lg:gap-0">
      <section id="projects" className="scroll-target min-w-0 lg:hidden">
          <FeaturedProjectsCarousel
            projects={featured}
            locale={locale}
            title={t("featuredTitle")}
            allLabel={t("featuredAll")}
            previousLabel={t("carouselPrevious")}
            nextLabel={t("carouselNext")}
            detailsLabel={t("openCaseStudy")}
          />
        </section>

      <section id="experience" className="scroll-target lg:col-start-1 lg:row-start-1">
        <Reveal className="mb-6 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight uppercase md:text-4xl">
            {t("timelineTitle")}
          </h2>
          <p className="mt-3 text-muted">{t("timelineIntro")}</p>
        </Reveal>
        <ExperienceTimeline
          items={experience}
          locale={locale}
          resultsLabel={t("timelineResults")}
          compact
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
        className="scroll-target grid gap-8 border-y border-border py-10 md:grid-cols-1 md:gap-10 lg:hidden"
      >
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
            {t("aboutLabel")}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {t("aboutTitle")}
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            {localize(profile.bio, locale)}
          </p>
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
      <HomeRightColumn
        projects={featured}
        locale={locale}
        profile={profile}
        projectsTitle={t("featuredTitle")}
        allProjects={t("featuredAll")}
        previousProject={t("carouselPrevious")}
        nextProject={t("carouselNext")}
        caseStudy={t("openCaseStudy")}
        aboutLabel={t("aboutLabel")}
        aboutTitle={t("aboutTitle")}
        educationTitle={t("educationTitle")}
        stackTitle={t("stackTitle")}
        interestsTitle={t("interestsTitle")}
      />
      </div>

      <Reveal>
        <section
          id="contact"
          className="scroll-target border-2 border-ink bg-accent px-6 py-8 text-accent-fg md:px-10 md:py-12"
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
                className="mt-5 inline-block text-lg text-sage transition-colors hover:text-background"
              >
                {profile.links.email.replace(/^mailto:/, "")} ↗
              </a>
            </div>
            {resume ? (
              <Magnetic className="shrink-0">
                <a
                  href={resume}
                  download
                  className="group inline-flex items-center justify-center gap-2 border-2 border-ink bg-sage px-5 py-3 text-sm text-ink shadow-[4px_4px_0_var(--foreground)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
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

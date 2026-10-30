import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/i18n/metadata";
import { experience } from "@/content/experience";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { VineRail } from "@/components/ui/VineRail";
import { localize } from "@/lib/localize";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Experience" });
  return {
    title: t("title"),
    alternates: buildAlternates(locale, "/experience"),
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Experience");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("intro")}</p>
      </Reveal>
      <VineRail className="mt-12">
        <ol className="space-y-12">
          {experience.map((job) => (
            <li key={job.id} data-vine-item className="border-t border-border pt-8">
            <p className="font-mono text-xs text-signal">
              {localize(job.period, locale)}
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              {localize(job.role, locale)}
            </h2>
            <p className="text-muted">
              {localize(job.company, locale)} · {localize(job.location, locale)}
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              {localize(job.summary, locale)}
            </p>
            <h3 className="mt-6 text-xs tracking-wide text-muted uppercase">
              {t("responsibilities")}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {localize(job.responsibilities, locale).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-xs tracking-wide text-muted uppercase">
              {t("results")}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {localize(job.results, locale).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </li>
        ))}
        </ol>
      </VineRail>
    </div>
  );
}

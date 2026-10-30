import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/i18n/metadata";
import { profile } from "@/content/profile";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { localize } from "@/lib/localize";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title"), alternates: buildAlternates(locale, "/about") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("intro")}</p>
        <div className="mt-10 space-y-4 text-base leading-relaxed">
          {localize(profile.about, locale).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14">
        <section>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            {t("education")}
          </h2>
          <ul className="mt-4 space-y-6">
            {profile.education.map((item) => (
              <li key={localize(item.program, locale)}>
                <p className="font-medium">{localize(item.program, locale)}</p>
                <p className="text-sm text-muted">
                  {localize(item.institution, locale)} · {localize(item.period, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {localize(item.coursework, locale).map((course) => (
                    <Tag key={course}>{course}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="mt-14" delay={0.08}>
        <section>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            {t("interests")}
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
            {localize(profile.interests, locale).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="mt-14" delay={0.12}>
        <section>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            {t("stack")}
          </h2>
          <ul className="mt-4 space-y-5">
            {profile.skillGroups.map((group) => (
              <li key={group.category.en}>
                <p className="text-sm text-muted">{localize(group.category, locale)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}

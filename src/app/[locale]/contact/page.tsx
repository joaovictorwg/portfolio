import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/i18n/metadata";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title"), alternates: buildAlternates(locale, "/contact") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const resume =
    locale === "en" ? profile.resume.en : profile.resume.pt;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("intro")}</p>
        <ul className="mt-10 space-y-4">
          <li>
            <Magnetic strength={0.2} max={7}>
              <a
                href={profile.links.github}
                className="inline-block text-lg transition-colors hover:text-signal"
                target="_blank"
                rel="noreferrer"
              >
                {t("github")} <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic strength={0.2} max={7}>
              <a
                href={profile.links.linkedin}
                className="inline-block text-lg transition-colors hover:text-signal"
                target="_blank"
                rel="noreferrer"
              >
                {t("linkedin")} <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </li>
          <li>
            <Magnetic strength={0.2} max={7}>
              <a href={profile.links.email} className="inline-block text-lg transition-colors hover:text-signal">
                {t("email")} <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </li>
          <li>
            {resume ? (
              <Magnetic strength={0.2} max={7}>
                <a href={resume} className="inline-block text-lg transition-colors hover:text-signal" download>
                  {t("resume")} <span aria-hidden>↓</span>
                </a>
              </Magnetic>
            ) : (
              <p className="text-sm text-muted">{t("resumeMissing")}</p>
            )}
          </li>
        </ul>
      </Reveal>
    </div>
  );
}

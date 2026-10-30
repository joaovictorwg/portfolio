import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/i18n/metadata";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  return { title: t("title"), alternates: buildAlternates(locale, "/projects") };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Projects");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      </Reveal>
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <RevealItem key={project.id}>
            <ProjectCard
              project={project}
              locale={locale}
              detailsLabel={t("openCaseStudy")}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

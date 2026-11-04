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
    <div className="w-full px-6 py-16 md:px-10 md:py-24 lg:px-16">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">{t("title")}</h1>
        <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      </Reveal>
      <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
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

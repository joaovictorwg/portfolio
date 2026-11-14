import type { Project } from "@/content/types";
import type { Profile } from "@/content/types";
import { FeaturedProjectsCarousel } from "./FeaturedProjectsCarousel";
import { Reveal } from "./ui/Reveal";
import { TechGroups } from "./TechGroups";
import { DownloadButton } from "./ui/DownloadButton";
import { localize } from "@/lib/localize";

export function HomeRightColumn({
  projects,
  locale,
  profile,
  projectsTitle,
  allProjects,
  previousProject,
  nextProject,
  caseStudy,
  aboutLabel,
  aboutTitle,
  educationTitle,
  diplomaLink,
  stackTitle,
  interestsTitle,
}: {
  projects: Project[];
  locale: string;
  profile: Profile;
  projectsTitle: string;
  allProjects: string;
  previousProject: string;
  nextProject: string;
  caseStudy: string;
  aboutLabel: string;
  aboutTitle: string;
  educationTitle: string;
  diplomaLink: string;
  stackTitle: string;
  interestsTitle: string;
}) {
  return (
    <div className="hidden min-w-0 flex-col gap-10 lg:col-start-2 lg:row-start-1 lg:flex">
      <FeaturedProjectsCarousel
        projects={projects}
        locale={locale}
        title={projectsTitle}
        allLabel={allProjects}
        previousLabel={previousProject}
        nextLabel={nextProject}
        detailsLabel={caseStudy}
      />

      <section id="about" className="border-y-2 border-ink py-8">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal uppercase">
            {aboutLabel}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
            {aboutTitle}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            {localize(profile.bio, locale)}
          </p>
          <div className="mt-7">
            <h3 className="font-display text-xl font-bold uppercase">{educationTitle}</h3>
            {profile.education.map((item) => (
              <div key={localize(item.program, locale)} className="mt-2 text-sm">
                <p className="font-semibold">{localize(item.program, locale)}</p>
                <p className="text-muted">
                  {localize(item.institution, locale)} · {localize(item.period, locale)}
                </p>
                {item.diploma ? (
                  <DownloadButton href={item.diploma} className="mt-2">
                    {diplomaLink}
                  </DownloadButton>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-7 space-y-7">
          <div>
            <h3 className="font-display text-xl font-bold uppercase">{stackTitle}</h3>
            <TechGroups
              groups={profile.skillGroups}
              locale={locale}
              compact
              className="mt-3"
            />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold uppercase">{interestsTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {localize(profile.interests, locale).map((interest) => (
                <li key={interest} className="flex gap-3">
                  <span aria-hidden className="text-signal">✳</span>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

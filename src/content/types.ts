import type { AppLocale } from "@/i18n/routing";

export type Localized<T> = Record<AppLocale, T>;

export type WorldZone = "start" | "projects" | "experience" | "concepts";

export type Project = {
  id: string;
  slug: string;
  featured: boolean;
  /** Selo curto exibido no card e no case study (ex.: MVP). */
  badge?: Localized<string> | null;
  title: Localized<string>;
  summary: Localized<string>;
  problem: Localized<string>;
  description: Localized<string>;
  technologies: string[];
  architecture: string[];
  decisions: Localized<string[]>;
  images: { src: string; alt: Localized<string> }[];
  links: {
    demo: string | null;
    github: string | null;
    monograph: string | null;
  };
  world: {
    zone: WorldZone;
    interactable: boolean;
  };
};

export type Experience = {
  id: string;
  /** ISO month used to keep chronology independent from localized period text. */
  startDate: string;
  company: Localized<string>;
  role: Localized<string>;
  period: Localized<string>;
  location: Localized<string>;
  summary: Localized<string>;
  responsibilities: Localized<string[]>;
  results: Localized<string[]>;
  technologies: string[];
  world: {
    zone: Extract<WorldZone, "experience">;
    interactable: boolean;
  };
};

export type Education = {
  program: Localized<string>;
  institution: Localized<string>;
  period: Localized<string>;
  coursework: Localized<string[]>;
};

export type SkillGroup = {
  category: Localized<string>;
  items: string[];
};

export type Profile = {
  name: string;
  /** Nome curto para o logo e títulos de página. */
  shortName: string;
  title: Localized<string>;
  location: Localized<string>;
  headline: Localized<string>;
  bio: Localized<string>;
  about: Localized<string[]>;
  education: Education[];
  interests: Localized<string[]>;
  /** Seleção curta exibida na home. */
  technologies: string[];
  /** Inventário completo por área, exibido em Sobre. */
  skillGroups: SkillGroup[];
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  resume: {
    pt: string | null;
    en: string | null;
  };
};

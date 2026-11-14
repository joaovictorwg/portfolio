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
  /** Oculta a galeria de telas na página de detalhe; a imagem continua como capa do card. */
  hideScreenshots?: boolean;
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
  /** Conteúdo enxuto exibido na home; a página /experience usa os campos completos. */
  home?: {
    /** Resumo curto; cai em summary quando ausente. */
    summary?: Localized<string>;
    /** Frase de impacto; cai no primeiro resultado quando ausente. */
    impact?: Localized<string>;
  };
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
  /** Caminho público do PDF do diploma; exibe o botão de download quando presente. */
  diploma?: string;
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

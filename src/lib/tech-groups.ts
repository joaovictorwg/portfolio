import { profile } from "@/content/profile";
import type { SkillGroup } from "@/content/types";

/**
 * Grafias dos projetos que agrupamos junto de outra entrada do perfil.
 * A grafia original continua sendo exibida no chip.
 */
const GROUP_ALIASES: Record<string, string> = {
  Swagger: "Swagger / OpenAPI",
  "Swagger/OpenAPI": "Swagger / OpenAPI",
  OpenAPI: "Swagger / OpenAPI",
  "Multi-tenant": "Multi-tenancy",
};

/** Ferramentas que aparecem nos projetos e não estão na grade do perfil. */
const EXTRA_CATEGORIES: Record<string, string> = {
  JavaScript: "Frontend",
  Axios: "Frontend",
  "Styled Components": "Frontend",
  Flutter: "Frontend",
  Dart: "Frontend",
  "d3-geo": "Frontend",
  TopoJSON: "Frontend",
  JWT: "Backend & APIs",
  OAuth: "Backend & APIs",
  Webhooks: "Backend & APIs",
  WebSockets: "Backend & APIs",
  SSE: "Backend & APIs",
  "WhatsApp Cloud API": "Backend & APIs",
  "Django REST Framework": "Backend & APIs",
  Celery: "Backend & APIs",
  BullMQ: "Backend & APIs",
  JupyterLab: "Data & Artificial Intelligence",
  Matplotlib: "Data & Artificial Intelligence",
  Seaborn: "Data & Artificial Intelligence",
  Keras: "Data & Artificial Intelligence",
  PyPDF2: "Data & Artificial Intelligence",
  Gemini: "Data & Artificial Intelligence",
  Selenium: "Data & Artificial Intelligence",
  Joblib: "Data & Artificial Intelligence",
  "Computer Vision": "Data & Artificial Intelligence",
  Firebase: "Cloud, DevOps & Tools",
  "Azure OCR": "Cloud, DevOps & Tools",
  "Web Automation": "Other tools",
  Figma: "Other tools",
  Trello: "Other tools",
};

const OTHER_CATEGORY = { pt: "Outros", en: "Other tools" };

const categoryByTechnology = new Map<string, string>();

for (const group of profile.skillGroups) {
  for (const item of group.items) {
    categoryByTechnology.set(item, group.category.en);
  }
}

for (const [technology, category] of Object.entries(EXTRA_CATEGORIES)) {
  categoryByTechnology.set(technology, category);
}

/**
 * Agrupa uma lista de tecnologias pelas áreas do perfil, mantendo a ordem das
 * áreas e a ordem original dos itens dentro de cada grupo. O que não pertence a
 * nenhuma área cai em "Outros".
 */
export function groupTechnologies(technologies: string[]): SkillGroup[] {
  const groups: SkillGroup[] = [];

  const categories = [
    ...profile.skillGroups.map((group) => group.category),
    OTHER_CATEGORY,
  ];

  for (const category of categories) {
    const items = technologies.filter(
      (technology) =>
        (categoryByTechnology.get(GROUP_ALIASES[technology] ?? technology) ??
          OTHER_CATEGORY.en) === category.en,
    );

    if (items.length > 0) {
      groups.push({ category, items });
    }
  }

  return groups;
}

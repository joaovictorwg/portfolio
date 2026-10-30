export type InteractableKind = "start" | "project" | "experience" | "concept";

export type InteractableTarget = {
  id: string;
  kind: InteractableKind;
};

export const WORLD_MAP = {
  start: { position: [0, 0, 10] as const, color: "#d4a84b", labelKey: "zoneStart" },
  projects: {
    position: [-12, 0, 0] as const,
    color: "#5e8f7b",
    labelKey: "zoneProjects",
  },
  experience: {
    position: [12, 0, 0] as const,
    color: "#6b7fd7",
    labelKey: "zoneExperience",
  },
  concepts: {
    position: [0, 0, -12] as const,
    color: "#c56b6b",
    labelKey: "zoneConcepts",
  },
};

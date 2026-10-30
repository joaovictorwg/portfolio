import type { Project } from "../types";
import { amamentaPalmas } from "./amamenta-palmas";
import { chatbotRag } from "./chatbot-rag";
import { dyto } from "./dyto";
import { predicaoDoencas } from "./predicao-doencas";

export const projects: Project[] = [
  amamentaPalmas,
  dyto,
  chatbotRag,
  predicaoDoencas,
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

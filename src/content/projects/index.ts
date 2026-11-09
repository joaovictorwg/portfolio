import type { Project } from "../types";
import { amamentaPalmas } from "./amamenta-palmas";
import { chatbotRag } from "./chatbot-rag";
import { dyto } from "./dyto";
import { holmesDocumentos } from "./holmes-documentos";
import { predicaoDoencas } from "./predicao-doencas";
import { projetoDeSistemas } from "./projeto-de-sistemas";
import { satelliteCnn } from "./satellite-cnn";
import { votoAberto } from "./voto-aberto";

export const projects: Project[] = [
  amamentaPalmas,
  dyto,
  votoAberto,
  chatbotRag,
  predicaoDoencas,
  holmesDocumentos,
  projetoDeSistemas,
  satelliteCnn,
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

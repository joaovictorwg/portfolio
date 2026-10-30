import type { Project } from "../types";
import overviewImg from "../../../imgs/amamenta_palmas/overview.png";
import loginImg from "../../../imgs/amamenta_palmas/login.png";
import visitsImg from "../../../imgs/amamenta_palmas/visits.png";
import donatorFormImg from "../../../imgs/amamenta_palmas/donator_form.png";
import donatorsOverviewImg from "../../../imgs/amamenta_palmas/donators_overview.png";
import donationsStockImg from "../../../imgs/amamenta_palmas/donations_stock.png";

export const amamentaPalmas: Project = {
  id: "amamenta-palmas",
  slug: "amamenta-palmas",
  featured: true,
  badge: {
    pt: "MVP",
    en: "MVP",
  },
  title: {
    pt: "Amamenta Palmas",
    en: "Amamenta Palmas",
  },
  summary: {
    pt: "MVP de um sistema de gestão para banco de leite humano hospitalar, desenvolvido em parceria com a universidade e o hospital. Atuei como Tech Lead.",
    en: "MVP of a management system for a hospital human milk bank, built in partnership with the university and the hospital. I acted as Tech Lead.",
  },
  problem: {
    pt: "O banco de leite operava com controles fragmentados e precisava rastrear cada frasco com segurança sanitária: cadastro de doadoras, agendamento de visitas, coleta, pasteurização, estoque e distribuição. Perder histórico clínico ou logístico não era uma opção.",
    en: "The milk bank ran on fragmented controls and needed to trace every bottle with sanitary safety: donor registration, visit scheduling, collection, pasteurization, inventory, and distribution. Losing clinical or logistics history was not an option.",
  },
  description: {
    pt: "Entregue como MVP (produto viável mínimo) em parceria com a universidade e o hospital, para digitalizar o processo operacional do banco de leite. Atuei como Tech Lead, responsável pela direção técnica e pela evolução do produto, projetando a arquitetura e coordenando o desenvolvimento. O sistema cobre o fluxo ponta a ponta — doadora, coleta, pasteurização, estoque e distribuição — em que cada etapa é um módulo com regras próprias, conectado por um núcleo de domínio compartilhado.",
    en: "Delivered as an MVP (minimum viable product) in partnership with the university and the hospital, to digitize the milk bank's operational process. I acted as Tech Lead, responsible for technical direction and product evolution, designing the architecture and coordinating development. The system covers the end-to-end flow — donor, collection, pasteurization, inventory, and distribution — where each stage is a module with its own rules, connected by a shared domain core.",
  },
  technologies: [
    "TypeScript",
    "Node.js",
    "Fastify",
    "PostgreSQL",
    "React",
    "React Query",
    "Drizzle ORM",
    "Zod",
    "JWT",
    "Swagger",
    "Vite",
    "Storybook",
  ],
  architecture: ["Clean Architecture", "DDD", "Modular Monolith"],
  decisions: {
    pt: [
      "Modular monolith em vez de microsserviços: o domínio é um só, os limites são de módulo, não de rede — e o sistema foi estruturado para permitir extrair módulos depois, se precisar.",
      "Clean Architecture separando regras de negócio de infraestrutura, para o núcleo de domínio não depender de Fastify nem de Drizzle.",
      "Contratos e validações com Zod na borda HTTP, com OpenAPI/Swagger gerado a partir desses contratos, e autenticação com JWT.",
      "Frontend em React + Vite com React Query para sincronização previsível entre etapas do fluxo (coleta → pasteurização → estoque), e Storybook documentando a biblioteca de componentes.",
    ],
    en: [
      "Modular monolith instead of microservices: one domain, module boundaries rather than network boundaries — and the system was structured so modules can be extracted later if needed.",
      "Clean Architecture separating business rules from infrastructure, so the domain core depends on neither Fastify nor Drizzle.",
      "Zod contracts and validation at the HTTP edge, with OpenAPI/Swagger generated from those contracts, and JWT authentication.",
      "React + Vite frontend with React Query for predictable synchronization across flow steps (collection → pasteurization → inventory), and Storybook documenting the component library.",
    ],
  },
  images: [
    {
      src: overviewImg.src,
      alt: {
        pt: "Painel de visão geral do Amamenta Palmas",
        en: "Amamenta Palmas overview dashboard",
      },
    },
    {
      src: loginImg.src,
      alt: {
        pt: "Tela de login do sistema",
        en: "System login screen",
      },
    },
    {
      src: visitsImg.src,
      alt: {
        pt: "Agendamento de visitas das doadoras",
        en: "Donor visit scheduling",
      },
    },
    {
      src: donatorFormImg.src,
      alt: {
        pt: "Formulário de cadastro de doadora",
        en: "Donor registration form",
      },
    },
    {
      src: donatorsOverviewImg.src,
      alt: {
        pt: "Lista de doadoras cadastradas",
        en: "Registered donors list",
      },
    },
    {
      src: donationsStockImg.src,
      alt: {
        pt: "Estoque de doações de leite humano",
        en: "Human milk donation stock",
      },
    },
  ],
  links: {
    demo: null,
    github: null,
    monograph: null,
  },
  world: {
    zone: "projects",
    interactable: true,
  },
};

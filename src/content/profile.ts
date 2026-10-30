import type { Profile } from "./types";

export const profile: Profile = {
  name: "João Victor Walcacer Giani",
  shortName: "João Victor",
  title: {
    pt: "Engenheiro de Software",
    en: "Software Engineer",
  },
  location: {
    pt: "Palmas - TO, Brasil",
    en: "Palmas - TO, Brazil",
  },
  headline: {
    pt: "Engenheiro de software full stack. Transformo dados complexos e regras de negócio em APIs bem estruturadas, soluções com IA e interfaces rápidas e intuitivas.",
    en: "Full stack software engineer. I turn complex domains into typed APIs and fast interfaces — with measured performance, not estimated.",
  },
  bio: {
    pt: "Tenho mais de 3 anos de experiência prática em desenvolvimento de software, construindo aplicações web de ponta a ponta, APIs e soluções de automação e análise de dados para empresas e clientes diretos. Minha stack principal é React e Node.js com TypeScript, além de Python com FastAPI para desenvolvimento backend, processamento de dados, automação e aplicações com IA. Ao longo dessa trajetória, trabalhei em projetos na Vetta Digital, Brain Analytics e projetos independentes, buscando sempre aliar qualidade arquitetural, performance e uma boa experiência para o usuário.",
    en: "I work with TypeScript across frontend and backend, and with Python when the problem is data or AI. At Vetta Digital I cut frontend server CPU and memory usage by 40% by extracting a dedicated API service, and reduced the load time of a screen with 90,000+ records by 80%. I like well-bounded modular monoliths, explicit contracts with Zod and OpenAPI, and measuring before and after optimizing.",
  },
  about: {
    pt: [
      "Meu foco é engenharia de produto com consequência mensurável. Quase tudo que escrevo no currículo tem número porque eu meço: o consumo de CPU caiu 40%, a tela de 90 mil registros passou de 5s para 1s, operações O(n²) viraram O(n). Otimizar sem medir é opinião.",
      "Gosto de modular monoliths com limites de módulo claros, contratos explícitos (Zod, OpenAPI) e um frontend que consome a API sem inventar um segundo domínio. Já liderei a definição técnica de um sistema hospitalar de ponta a ponta e já integrei serviços externos que falham no meio do caminho — os dois ensinam a mesma coisa: o domínio tem que sobreviver à infraestrutura.",
      "Hoje atuo como engenheiro de software júnior na Vetta Digital e estou construindo o Dyto, um produto de atendimento no WhatsApp, com dois sócios. Neste portfólio, prefiro mostrar o trabalho de perto: contexto, decisões, telas e o que aprendi construindo cada projeto.",
    ],
    en: [
      "I focus on product engineering with measurable consequence. Almost everything on my resume carries a number because I measure it: CPU usage dropped 40%, the 90,000-record screen went from 5s to 1s, O(n²) operations became O(n). Optimizing without measuring is opinion.",
      "I like modular monoliths with clear module boundaries, explicit contracts (Zod, OpenAPI), and a frontend that consumes the API without inventing a second domain. I have led the technical direction of a hospital system end to end and integrated external services that fail mid-flight — both teach the same thing: the domain has to outlive the infrastructure.",
      "Today I work as a junior software engineer at Vetta Digital and I am building Dyto, a WhatsApp customer service product, with two partners. In this portfolio, I prefer to show the work up close: context, decisions, screens, and what I learned while building each project.",
    ],
  },
  education: [
    {
      program: {
        pt: "Bacharelado em Ciência da Computação",
        en: "Bachelor's Degree in Computer Science",
      },
      institution: {
        pt: "Universidade Federal do Tocantins",
        en: "Federal University of Tocantins",
      },
      period: {
        pt: "Março 2022 – Agosto 2026",
        en: "March 2022 – August 2026",
      },
      coursework: {
        pt: [
          "Aprendizado de Máquina",
          "Engenharia de Software",
          "Inteligência Artificial",
          "Computação em Nuvem",
          "Sistemas Distribuídos",
          "Algoritmos e Estruturas de Dados",
          "Bancos de Dados",
          "Sistemas Operacionais",
          "Compiladores",
          "Teoria dos Grafos",
          "Estatística",
        ],
        en: [
          "Machine Learning",
          "Software Engineering",
          "Artificial Intelligence",
          "Cloud Computing",
          "Distributed Systems",
          "Algorithms and Data Structures",
          "Databases",
          "Operating Systems",
          "Compilers",
          "Graph Theory",
          "Statistics",
        ],
      },
    },
  ],
  interests: {
    pt: [
      "Arquitetura de software e DDD",
      "Performance e otimização de consultas",
      "Sistemas de messaging e integrações",
      "RAG, LLMs e busca semântica",
      "Saúde digital e impacto social",
    ],
    en: [
      "Software architecture and DDD",
      "Performance and query optimization",
      "Messaging systems and integrations",
      "RAG, LLMs, and semantic search",
      "Digital health and social impact",
    ],
  },
  technologies: [
    "TypeScript",
    "React",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "Fastify",
    "React Query",
    "Zod",
    "Python",
    "FastAPI",
    "Redis",
    "Docker",
  ],
  skillGroups: [
    {
      category: { pt: "Frontend", en: "Frontend" },
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "React Query",
        "Vite",
        "Axios",
        "Styled Components",
        "Storybook",
      ],
    },
    {
      category: {
        pt: "Backend e APIs",
        en: "Backend & APIs",
      },
      items: [
        "Node.js",
        "Fastify",
        "Python",
        "FastAPI",
        "Django",
        "Django REST Framework",
        "REST APIs",
        "WebSockets",
        "Webhooks",
        "Drizzle ORM",
        "Zod",
        "JWT",
      ],
    },
    {
      category: {
        pt: "Dados e IA",
        en: "Data & AI",
      },
      items: [
        "PostgreSQL",
        "SQL",
        "Redis",
        "Pandas",
        "Scikit-learn",
        "LLMs",
        "RAG",
        "LangChain",
        "FAISS",
        "pgvector",
        "Computer Vision",
        "Selenium",
      ],
    },
    {
      category: {
        pt: "Arquitetura e Engenharia",
        en: "Architecture & Engineering",
      },
      items: ["Clean Architecture", "DDD", "Modular Monolith", "Multi-tenant"],
    },
    {
      category: {
        pt: "Cloud, DevOps e Ferramentas",
        en: "Cloud, DevOps & Tools",
      },
      items: [
        "Microsoft Azure",
        "Docker",
        "Docker Compose",
        "Swagger/OpenAPI",
        "BullMQ",
        "Celery",
        "Git",
      ],
    },
  ],
  links: {
    github: "https://github.com/jvict",
    linkedin: "https://www.linkedin.com/in/jvict",
    email: "mailto:joaovictorgiani@gmail.com",
  },
  resume: {
    pt: "/resume/curriculo-fullstack-ptbr.pdf",
    en: "/resume/curriculo-fullstack-eng.pdf",
  },
};

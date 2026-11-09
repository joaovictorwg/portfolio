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
      "Acredito que um bom software vai além de funcionar: precisa ser bem estruturado, eficiente e capaz de evoluir junto com o problema que resolve.",
      "Minha experiência passa pelo desenvolvimento de aplicações web, APIs, arquitetura de sistemas, otimização de performance e soluções com inteligência artificial. Gosto especialmente de trabalhar na interseção entre regras de negócio e tecnologia, transformando processos complexos em sistemas mais simples e confiáveis.",
      "Hoje sou Desenvolvedor de Software Júnior na Vetta Digital e também construo produtos independentes, como o Dyto. Aqui, compartilho os projetos que desenvolvi, os desafios que encontrei e as decisões técnicas que fizeram parte de cada solução.",
    ],
    en: [
      "I believe good software goes beyond working: it has to be well structured, efficient, and able to evolve along with the problem it solves.",
      "My experience covers web application development, APIs, system architecture, performance optimization, and artificial intelligence solutions. I especially enjoy working at the intersection of business rules and technology, turning complex processes into simpler and more reliable systems.",
      "Today I am a Junior Software Developer at Vetta Digital, and I also build independent products such as Dyto. Here I share the projects I have developed, the challenges I ran into, and the technical decisions behind each solution.",
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
      "Sistemas bem estruturados, com arquiteturas que facilitam a evolução do produto.",
      "Aplicações eficientes, capazes de processar grandes volumes de dados.",
      "Automações que eliminam tarefas manuais e simplificam processos.",
      "Soluções inteligentes que combinam dados, APIs e modelos de IA.",
      "Produtos digitais que resolvem problemas reais e oferecem boas experiências.",
    ],
    en: [
      "Well-structured systems, with architectures that make the product easier to evolve.",
      "Efficient applications, able to process large volumes of data.",
      "Automations that remove manual work and simplify processes.",
      "Smart solutions that combine data, APIs, and AI models.",
      "Digital products that solve real problems and deliver good experiences.",
    ],
  },
  technologies: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Fastify",
    "React Query",
    "Next.js",
    "Zod",
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
    github: "https://github.com/joaovictorwg",
    linkedin: "https://www.linkedin.com/in/joao-victor-walcacer-giani/",
    email: "mailto:joaovictorgiani@gmail.com",
  },
  resume: {
    pt: "/resume/curriculo-fullstack-ptbr.pdf",
    en: "/resume/curriculo-fullstack-eng.pdf",
  },
};

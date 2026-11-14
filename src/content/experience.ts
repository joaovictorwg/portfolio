import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "vetta-junior",
    startDate: "2026-04",
    company: {
      pt: "Vetta Digital",
      en: "Vetta Digital",
    },
    role: {
      pt: "Desenvolvedor de Software Júnior",
      en: "Junior Software Engineer",
    },
    period: {
      pt: "Abril 2026 – atual",
      en: "April 2026 – present",
    },
    location: {
      pt: "Remoto, Brasil",
      en: "Remote, Brazil",
    },
    summary: {
      pt: "Atuação no desenvolvimento e manutenção de aplicações full stack para uma plataforma de gestão de eficiência energética e emissões de carbono. Desenvolvimento de novas funcionalidades, evolução de APIs e modernização da arquitetura frontend, com foco em qualidade de código, performance, escalabilidade e produtividade do desenvolvimento.",
      en: "Working on the development and maintenance of full-stack applications for an energy efficiency and carbon emissions management platform. Building new features, evolving APIs, and modernizing frontend architecture, with a focus on code quality, performance, scalability, and developer productivity.",
    },
    home: {
      summary: {
        pt: "Responsável pelo desenvolvimento e evolução de aplicações full stack, atuando na criação de funcionalidades, manutenção de APIs e modernização da arquitetura frontend, com foco em qualidade de código, performance e confiabilidade.",
        en: "Responsible for developing and evolving full-stack applications, working on feature implementation, API maintenance, and frontend architecture modernization, with a focus on code quality, performance, and reliability.",
      },
      impact: {
        pt: "Melhorei a performance e a eficiência das aplicações, reduzi significativamente o tempo de carregamento de telas com grandes volumes de dados, otimizei operações no frontend e modernizei o ambiente de desenvolvimento com a migração de Webpack para Vite. Também implementei funcionalidades que ampliaram as possibilidades de análise e exportação de dados da plataforma.",
        en: "Improved application performance and efficiency by reducing loading times for screens handling large datasets, optimizing frontend operations, and modernizing the development environment through the migration from Webpack to Vite. Also delivered features that expanded the platform's data analysis and export capabilities.",
      },
    },
    responsibilities: {
      pt: [
        "Desenvolvimento de funcionalidades full stack, implementando e integrando componentes React e serviços backend em Node.js.",
        "Evolução e manutenção de APIs REST com Node.js, incluindo versionamento, modelagem e consultas em PostgreSQL, validação de contratos com Zod, documentação com Swagger e implementação de paginação e rate limiting.",
        "Refatoração e otimização de interfaces React, aplicando técnicas como memoização, code splitting e lazy loading para melhorar a performance e a eficiência de renderização.",
        "Organização da arquitetura frontend utilizando Feature-Driven Architecture e padrões Container/Presentational e Hooks, além de documentação de componentes e funções com JSDoc.",
        "Desenvolvimento de funcionalidades de exportação de dados em Excel e CSV no backend, incluindo geração de planilhas formatadas e gráficos, com integração ao frontend.",
        "Modernização da infraestrutura frontend, migrando a aplicação de Webpack para Vite e reestruturando o fluxo de desenvolvimento para utilizar Hot Module Replacement (HMR).",
        "Desenvolvimento de testes automatizados para componentes e interfaces utilizando Jest.",
      ],
      en: [
        "Developing full-stack features by implementing and integrating React components with Node.js backend services.",
        "Evolving and maintaining REST APIs with Node.js, including API versioning, PostgreSQL data modeling and queries, schema validation with Zod, API documentation with Swagger, pagination, and rate limiting.",
        "Refactoring and optimizing React interfaces using techniques such as memoization, code splitting, and lazy loading to improve performance and rendering efficiency.",
        "Structuring frontend architecture using Feature-Driven Architecture and Container/Presentational and Hooks patterns, while documenting components and functions with JSDoc.",
        "Developing backend data export features for Excel and CSV files, including formatted spreadsheets and chart generation, integrated with the frontend.",
        "Modernizing the frontend infrastructure by migrating the application from Webpack to Vite and restructuring the development workflow to enable Hot Module Replacement (HMR).",
        "Developing automated tests for UI components and interfaces using Jest.",
      ],
    },
    results: {
      pt: [
        "Transformei uma necessidade recorrente dos usuários em uma funcionalidade integrada à plataforma, permitindo exportar dados em Excel e CSV, com planilhas formatadas e gráficos gerados automaticamente.",
        "Modernizei o ambiente de desenvolvimento frontend com a migração de Webpack para Vite, eliminando limitações do fluxo anterior e proporcionando atualizações instantâneas durante o desenvolvimento, com ganhos de produtividade.",
        "Reduzi em aproximadamente 80% o tempo de carregamento de uma tela com mais de 90 mil registros, de cerca de 5 segundos para 1 segundo, utilizando paginação no backend e estratégias de cache e carregamento com TanStack Query.",
        "Reduzi de O(n²) para O(n) a complexidade de operações no frontend, substituindo buscas lineares repetitivas por estruturas de dados pré-indexadas com Hash Maps.",
      ],
      en: [
        "Turned a recurring user need into an integrated platform feature, enabling data exports to Excel and CSV with automatically generated charts and formatted spreadsheets.",
        "Modernized the frontend development environment by migrating from Webpack to Vite, addressing limitations in the previous workflow and enabling instant updates during development through HMR, improving developer productivity.",
        "Reduced the loading time of a screen handling over 90,000 records by approximately 80%, from around 5 seconds to 1 second, using backend pagination and caching and data-fetching strategies with TanStack Query.",
        "Reduced the time complexity of frontend operations from O(n²) to O(n) by replacing repeated linear searches with pre-indexed Hash Map structures.",
      ],
    },
    technologies: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "React",
      "React Query",
      "Swagger",
    ],
    world: { zone: "experience", interactable: true },
  },
  {
    id: "vetta-estagio",
    startDate: "2024-04",
    company: {
      pt: "Vetta Digital",
      en: "Vetta Digital",
    },
    role: {
      pt: "Estagiário de Desenvolvimento de Software",
      en: "Software Engineer Intern",
    },
    period: {
      pt: "Abril 2024 – Abril 2026",
      en: "April 2024 – April 2026",
    },
    location: {
      pt: "Remoto, Brasil",
      en: "Remote, Brazil",
    },
    summary: {
      pt: "Contribuí para o desenvolvimento de aplicações web, com foco na criação de componentes reutilizáveis, melhoria da experiência do usuário e otimização de interfaces. Trabalhei com React e TypeScript em um ambiente de desenvolvimento colaborativo, participando da evolução de funcionalidades e da biblioteca interna de componentes.",
      en: "Contributed to web application development, focusing on reusable components, user experience improvements, and interface optimization. Worked with React and TypeScript in a collaborative development environment, contributing to feature development and the evolution of the internal component library.",
    },
    responsibilities: {
      pt: [
        "Desenvolver componentes reutilizáveis para diferentes contextos da aplicação.",
        "Contribuir para a biblioteca interna de componentes, com Storybook e JSDoc.",
        "Tratar estados de carregamento, vazio e erro nos fluxos assíncronos.",
      ],
      en: [
        "Develop reusable components for different contexts across the application.",
        "Contribute to the internal component library with Storybook and JSDoc.",
        "Handle loading, empty, and error states in asynchronous flows.",
      ],
    },
    results: {
      pt: [
        "Menos duplicação de lógica e mais consistência entre telas, com tipagem forte, composição e APIs de componente bem definidas.",
        "Skeleton Loading e Empty States nas telas principais, reduzindo a percepção de latência e tornando a navegação previsível.",
        "Documentação e exemplos de uso que facilitaram a adoção da biblioteca por outros desenvolvedores.",
      ],
      en: [
        "Less duplicated logic and more consistency across screens, with strong typing, composition, and well-defined component APIs.",
        "Skeleton Loading and Empty States on the main screens, reducing perceived latency and making navigation predictable.",
        "Documentation and usage examples that made the library easier for other developers to adopt.",
      ],
    },
    technologies: [
      "React",
      "TypeScript",
      "Styled Components",
      "Storybook",
      "JSDoc",
    ],
    world: { zone: "experience", interactable: true },
  },
  {
    id: "brain-analytics",
    startDate: "2023-04",
    company: {
      pt: "Brain Analytics",
      en: "Brain Analytics",
    },
    role: {
      pt: "Estágio em Desenvolvimento de Automações",
      en: "Automation Engineer Intern",
    },
    period: {
      pt: "Abril 2023 – Abril 2024",
      en: "April 2023 – April 2024",
    },
    location: {
      pt: "Remoto, Brasil",
      en: "Remote, Brazil",
    },
    summary: {
      pt: "Desenvolvi soluções de automação e processamento de dados utilizando Python, integrando diferentes fontes e sistemas por meio de APIs e bancos de dados. Atuei na automatização de processos operacionais e no desenvolvimento de soluções orientadas a dados, incluindo aplicações de Machine Learning.",
      en: "Developed automation and data processing solutions using Python, integrating different data sources and systems through APIs and databases. Worked on automating operational workflows and building data-driven solutions, including Machine Learning applications.",
    },
    responsibilities: {
      pt: [
        "Automatizar coleta, integração, limpeza e pré-processamento de dados de múltiplas fontes.",
        "Integrar APIs internas e entregar os dados prontos para uso pelos analistas.",
        "Treinar e disponibilizar modelos de scoring dentro de um fluxo de predição.",
      ],
      en: [
        "Automate collection, integration, cleaning, and preprocessing of data from multiple sources.",
        "Integrate internal APIs and deliver data ready for analysts to use.",
        "Train and ship scoring models inside a prediction workflow.",
      ],
    },
    results: {
      pt: [
        "Reduzi de cerca de 30 para 5 minutos o tempo de execução de uma tarefa operacional antes manual e repetitiva.",
        "Automação de análise de disponibilidade de crédito com scores de confiabilidade, apoiando a tomada de decisão.",
      ],
      en: [
        "Cut the execution time of a previously manual, repetitive operational task from about 30 to 5 minutes.",
        "Credit availability automation with reliability scores, supporting decision-making.",
      ],
    },
    technologies: [
      "Python",
      "Pandas",
      "Selenium",
      "FastAPI",
      "PostgreSQL",
      "Scikit-learn",
      "Joblib",
    ],
    world: { zone: "experience", interactable: true },
  },
  {
    id: "clientes-diretos",
    startDate: "2025-01",
    company: {
      pt: "Clientes Diretos",
      en: "Direct Clients",
    },
    role: {
      pt: "Desenvolvedor de Software",
      en: "Software Engineer",
    },
    period: {
      pt: "Janeiro 2025 – Abril 2026",
      en: "January 2025 – April 2026",
    },
    location: {
      pt: "Remoto, Brasil",
      en: "Remote, Brazil",
    },
    summary: {
      pt: "Desenvolvi soluções de software sob demanda, incluindo automações, integrações entre sistemas e aplicações baseadas em Inteligência Artificial. Trabalhei desde o levantamento de requisitos até a implementação e entrega, utilizando Python, APIs, processamento de documentos, Computer Vision e LLMs.",
      en: "Developed custom software solutions, including workflow automation, system integrations, and AI-powered applications. Worked across the entire development lifecycle, from requirements gathering to implementation and delivery, using Python, APIs, document processing, Computer Vision, and LLMs.",
    },
    responsibilities: {
      pt: [
        "Integrar APIs de CRM e orquestrar pipelines de validação com Machine Learning, Computer Vision e LLMs.",
        "Desenhar integrações assíncronas entre sistemas externos e aplicações de mensageria.",
      ],
      en: [
        "Integrate CRM APIs and orchestrate validation pipelines with Machine Learning, Computer Vision, and LLMs.",
        "Design asynchronous integrations between external systems and messaging applications.",
      ],
    },
    results: {
      pt: [
        "Sistema automatizado de verificação documental para o setor automotivo, com structured outputs em JSON para validação programática das respostas.",
        "Resiliência contra falhas de serviços externos: retries com exponential backoff e jitter, fallbacks e circuit breaker.",
        "Integração assíncrona via webhook com filas e workers, idempotência, logs estruturados e correlation IDs para rastreabilidade ponta a ponta.",
      ],
      en: [
        "Automated document verification system for the automotive sector, with structured JSON outputs for programmatic validation of responses.",
        "Resilience against external service failures: retries with exponential backoff and jitter, fallbacks, and circuit breaker.",
        "Asynchronous webhook integration with queues and workers, idempotency, structured logs, and correlation IDs for end-to-end traceability.",
      ],
    },
    technologies: [
      "Python",
      "FastAPI",
      "Computer Vision",
      "LLMs",
      "Azure",
      "BullMQ",
      "Redis",
    ],
    world: { zone: "experience", interactable: true },
  },
];

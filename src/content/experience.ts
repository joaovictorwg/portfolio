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
      pt: "Responsável por extrair um serviço de API dedicado e por reescrever a estratégia de dados das telas mais pesadas do produto.",
      en: "Promoted to junior after a two-year internship. Responsible for extracting a dedicated API service and for rethinking the data strategy behind the product's heaviest screens.",
    },
    responsibilities: {
      pt: [
        "Extrair responsabilidades de dados do frontend para um serviço de API dedicado.",
        "Definir a arquitetura do backend e documentar as APIs com Swagger.",
        "Otimizar consultas e o consumo de dados das telas de maior volume.",
      ],
      en: [
        "Extract data responsibilities from the frontend into a dedicated backend API service.",
        "Define the backend architecture and document the APIs with Swagger.",
        "Optimize queries and data consumption on the highest-volume screens.",
      ],
    },
    results: {
      pt: [
        "Reduzi em 40% o consumo de CPU e memória do servidor frontend ao isolar responsabilidades em um serviço backend estruturado com Clean Architecture, DDD e Modular Monolith.",
        "Reduzi em 80% o tempo de carregamento de uma tela com mais de 90 mil registros, de cerca de 5s para 1s, com paginação Limit/Offset no PostgreSQL e TanStack Query: cache, invalidação, Query Keys dinâmicas, prefetching preditivo e Stale-While-Revalidate.",
        "Reduzi de O(n²) para O(n) a complexidade de operações no frontend, trocando buscas lineares repetitivas por Hash Maps pré-indexados.",
      ],
      en: [
        "Cut frontend server CPU and memory consumption by 40% by isolating responsibilities into a backend service structured with Clean Architecture, DDD, and Modular Monolith.",
        "Cut the loading time of a screen processing more than 90,000 records by 80%, from about 5s to 1s, with Limit/Offset pagination in PostgreSQL and TanStack Query: caching, invalidation, dynamic Query Keys, predictive prefetching, and Stale-While-Revalidate.",
        "Reduced frontend operation complexity from O(n²) to O(n) by replacing repetitive linear searches with pre-indexed Hash Maps.",
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
      pt: "Dois anos construindo a base de frontend do produto: componentes reutilizáveis, a biblioteca interna e os estados que sustentam telas assíncronas.",
      en: "Two years building the product's frontend foundation: reusable components, the internal library, and the states that keep asynchronous screens honest.",
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
      pt: "Automação da coleta e preparação de dados de múltiplas plataformas, e uma pipeline de Machine Learning para análise de disponibilidade de crédito.",
      en: "Automation of data collection and preparation across multiple platforms, plus a Machine Learning pipeline for credit availability analysis.",
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
      pt: "Projetos como freelancer: verificação documental com visão computacional e LLMs, e integrações assíncronas entre CRMs e aplicações de mensageria.",
      en: "Freelance work: document verification with computer vision and LLMs, and asynchronous integrations between CRMs and messaging applications.",
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

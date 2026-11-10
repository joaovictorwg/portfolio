import type { Project } from "../types";
import chatImg from "../../../imgs/chatbot_rag/print_1.png";
import repositoryImg from "../../../imgs/chatbot_rag/print_2.png";
import automationsImg from "../../../imgs/chatbot_rag/print_3.png";
import emptyChatImg from "../../../imgs/chatbot_rag/print_4.png";

export const chatbotRag: Project = {
  id: "chatbot-rag",
  slug: "chatbot-rag",
  featured: false,
  title: {
    pt: "Chatbot RAG com Banco Vetorial",
    en: "RAG Chatbot with Vector Database",
  },
  summary: {
    pt: "POC de RAG para responder a partir de documentos próprios: upload, chunking, embeddings e busca vetorial.",
    en: "RAG POC that answers from your own documents: upload, chunking, embeddings, and vector search.",
  },
  problem: {
    pt: "LLMs sozinhos alucinam e não conhecem documentos internos. Era preciso responder com evidência recuperada, em tempo quase real, sem reindexar o mundo a cada pergunta — e sem travar o event loop enquanto o documento é processado.",
    en: "LLMs alone hallucinate and do not know internal documents. Answers needed retrieved evidence, near real time, without reindexing the world on every question — and without blocking the event loop while documents are processed.",
  },
  description: {
    pt: "Pipeline RAG completo com embeddings, índice vetorial e orquestração assíncrona. O LangChain orquestra as LLMs e a geração de embeddings via Google Gemini; os vetores ficam no PostgreSQL + pgvector e no FAISS, conforme a origem dos documentos. A indexação roda em workers Celery com Redis, então a conversa não espera o documento. O chat é em tempo real via Django Channels e WebSockets (Daphne), e o frontend consome a API por React + Axios. Tudo containerizado com Docker e Docker Compose.",
    en: "A complete RAG pipeline with embeddings, a vector index, and async orchestration. LangChain orchestrates the LLMs and embedding generation via Google Gemini; vectors live in PostgreSQL + pgvector and in FAISS depending on where the documents come from. Indexing runs on Celery workers with Redis, so the conversation never waits on the document. Chat is real time over Django Channels and WebSockets (Daphne), and the frontend consumes the API with React + Axios. Everything is containerized with Docker and Docker Compose.",
  },
  technologies: [
    "Python",
    "LangChain",
    "pgvector",
    "FAISS",
    "Django REST Framework",
    "Celery",
    "Redis",
    "WebSockets",
    "React",
    "Docker",
  ],
  architecture: ["RAG", "Async workers", "Vector search", "Real-time chat"],
  decisions: {
    pt: [
      "Separar ingestão (chunk + embed + index) da inferência da conversa: indexar documento é trabalho de minutos, responder é trabalho de milissegundos.",
      "FAISS para experimentação local e pgvector quando a fonte da verdade já é o PostgreSQL — dois índices, um critério.",
      "Celery + Redis para a indexação assíncrona, para não bloquear o event loop nem o turno da conversa.",
      "Django Channels e WebSockets para o chat em tempo real, com a geração só acontecendo depois da busca: o prompt leva trechos recuperados, não só a pergunta.",
    ],
    en: [
      "Split ingestion (chunk + embed + index) from conversation inference: indexing a document is minutes of work, answering is milliseconds.",
      "FAISS for local experiments and pgvector when PostgreSQL is already the source of truth — two indexes, one criterion.",
      "Celery + Redis for asynchronous indexing, so neither the event loop nor the conversation turn gets blocked.",
      "Django Channels and WebSockets for real-time chat, with generation happening only after retrieval: the prompt carries retrieved chunks, not just the question.",
    ],
  },
  images: [
    {
      src: chatImg.src,
      alt: {
        pt: "Conversa no chat do assistente respondendo sobre prazo de garantia e como abrir um chamado de suporte",
        en: "Chat conversation with the assistant answering about the warranty period and how to open a support ticket",
      },
    },
    {
      src: repositoryImg.src,
      alt: {
        pt: "Aba de repositório com os documentos indexados na base de conhecimento e status concluído",
        en: "Repository tab listing the documents indexed into the knowledge base with a completed status",
      },
    },
    {
      src: automationsImg.src,
      alt: {
        pt: "Painel de automações com agentes disponíveis e histórico de execuções",
        en: "Automations panel with available agents and the run history",
      },
    },
    {
      src: emptyChatImg.src,
      alt: {
        pt: "Tela inicial do chat antes da primeira mensagem",
        en: "Chat start screen before the first message",
      },
    },
  ],
  links: {
    demo: null,
    github: "https://github.com/joaovictorwg/chatbot-rag-vector",
    monograph: null,
  },
  world: {
    zone: "projects",
    interactable: true,
  },
};

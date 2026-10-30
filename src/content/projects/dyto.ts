import type { Project } from "../types";

export const dyto: Project = {
  id: "dyto",
  slug: "dyto",
  featured: true,
  title: {
    pt: "Dyto",
    en: "Dyto",
  },
  summary: {
    pt: "Plataforma multi-tenant de atendimento no WhatsApp que estou construindo com dois sócios: onboarding de números, webhooks e entrega confiável de mensagens.",
    en: "Multi-tenant WhatsApp customer service platform I am building with two partners: number onboarding, webhooks, and reliable message delivery.",
  },
  problem: {
    pt: "Cada cliente precisa de um número, de um consentimento OAuth e de isolamento real de dados — sem perder mensagens quando a Cloud API ou o próprio sistema falha no meio do caminho. É o tipo de problema em que o caso excepcional vira regra se ninguém o tratar como caso de domínio.",
    en: "Every customer needs a number, an OAuth consent flow, and real data isolation — without dropping messages when the Cloud API or the system itself fails mid-flight. This is the kind of problem where the edge case becomes the rule if nobody treats it as a domain concern.",
  },
  description: {
    pt: "Produto em desenvolvimento, com versão publicada e código fechado — é um serviço comercial que fundei com dois sócios, então o repositório não é público. O Dyto opera a WhatsApp Cloud API em modelo multi-tenant: onboarding via Embedded Signup, webhooks de entrada, envio confiável e um painel operacional. Um outbox transacional garante que o evento de domínio e a publicação externa nasçam na mesma transação, de modo que a mensagem não some da fila antes do commit.",
    en: "A product in development, with a published version and closed source — it is a commercial service I founded with two partners, so the repository is private. Dyto runs the WhatsApp Cloud API as a multi-tenant product: onboarding via Embedded Signup, inbound webhooks, reliable outbound delivery, and an operational dashboard. A transactional outbox keeps the domain event and the external publish in the same transaction, so nothing leaves the queue before the commit.",
  },
  technologies: [
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "WhatsApp Cloud API",
    "OAuth",
    "Webhooks",
    "React Query",
  ],
  architecture: ["Multi-tenancy", "DDD", "Modular Monolith", "Transactional Outbox"],
  decisions: {
    pt: [
      "Tenant como invariante de toda query e comando: isolamento no domínio, não só no middleware, porque middleware não te salva quando alguém esquece o filtro.",
      "Embedded Signup para o cliente conectar o WABA sem copiar token nenhum na mão — o fluxo de OAuth é parte do produto, não um detalhe de integração.",
      "Outbox transacional para webhooks e envios: o evento de domínio e a publicação externa nascem juntos, e a mensagem só sai da fila depois do commit.",
      "React Query no painel operacional, alinhado aos casos de uso do backend em vez de inventar um segundo estado no cliente.",
    ],
    en: [
      "Tenant as an invariant of every query and command: isolation in the domain, not only in the middleware, because middleware will not save you when someone forgets the filter.",
      "Embedded Signup so the customer can connect a WABA without pasting a single token — the OAuth flow is part of the product, not an integration detail.",
      "Transactional outbox for webhooks and outbound messages: the domain event and the external publish are born together, and the message only leaves the queue after the commit.",
      "React Query in the operational dashboard, aligned with the backend use cases instead of inventing a second state on the client.",
    ],
  },
  images: [],
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

import type { Project } from "../types";
import fluxogramaImg from "../../../imgs/holmes/fluxograma.png";

export const holmesDocumentos: Project = {
  id: "holmes-documentos",
  slug: "holmes-documentos",
  featured: false,
  badge: {
    pt: "Clientes",
    en: "Client work",
  },
  title: {
    pt: "Automação de documentos no Holmes",
    en: "Document automation in Holmes",
  },
  summary: {
    pt: "Automação para uma concessionária: cada venda abre um processo no Holmes, o CRM de compra e venda de veículos, com uma pilha de documentos. A automação extrai as informações desses documentos e valida contra os dados do processo, como etapa intermediária entre as ações humanas para encontrar erros com mais facilidade.",
    en: "An automation for a car dealership: every sale opens a process in Holmes, the vehicle sales CRM, filled with a stack of documents. The automation extracts the information from those documents and validates it against the process data, as an intermediate step between human actions so errors surface sooner.",
  },
  problem: {
    pt: "No Holmes, cada venda vira um processo com documentos anexados — pedido de venda, nota, documentos do cliente. Conferir tudo campo a campo, entre uma etapa do fluxo e outra, era trabalho humano repetitivo, e a divergência só aparecia depois de passar por várias mãos. Faltava uma checagem automática que ficasse exatamente no meio do caminho.",
    en: "In Holmes, every sale becomes a process with attached documents — sales order, invoice, customer paperwork. Checking everything field by field between one step of the flow and the next was repetitive human work, and a mismatch only surfaced after passing through several hands. What was missing was an automatic check sitting exactly in the middle of the path.",
  },
  description: {
    pt: "Feito em Python e Selenium para um cliente concessionária. Um monitor de e-mail avisa quando chega um processo novo; o bot faz login no Holmes, busca o processo pelo código, lê o cabeçalho e baixa os documentos anexados. Cada documento passa por OCR (Azure Document Intelligence) e por uma extração estruturada com Gemini, que devolve um JSON com os campos do pedido de venda — empresa, número, proponente, modelo, cor e chassi. Os validadores comparam esse JSON com os dados do processo no Holmes, normalizando o texto antes da comparação (sem acento, só dígitos, últimos 7 caracteres do chassi) e usando distância de edição para tolerar variação de escrita. No fim, o processo é aprovado no Holmes ou marcado como pendente, com um e-mail descrevendo o erro encontrado. Os validadores são registrados por tipo de documento — um tipo novo entra criando um módulo com `validar(arquivo, json)` — e o fluxo trabalha com pastas pendentes, analisando e analisados, com log diário de execução.",
    en: "Built in Python and Selenium for a dealership client. An email monitor signals when a new process arrives; the bot logs into Holmes, looks the process up by code, reads its header, and downloads the attached documents. Every document goes through OCR (Azure Document Intelligence) and then a structured extraction with Gemini, which returns JSON with the sales order fields — company, number, applicant, model, color, and chassis. Validators compare that JSON with the process data in Holmes, normalizing the text before comparing (lowercase, digits only, last 7 characters of the chassis) and using edit distance to tolerate spelling variation. In the end the process is approved in Holmes or flagged as pending, with an email describing the error found. Validators are registered per document type — a new type only needs a module exposing `validar(arquivo, json)` — and the flow works with pending, analyzing, and analyzed folders plus a daily execution log.",
  },
  technologies: [
    "Python",
    "Selenium",
    "Azure OCR",
    "Gemini",
    "PyPDF2",
    "Web Automation",
  ],
  architecture: [
    "RPA",
    "Document pipeline",
    "LLM extraction",
    "Validation rules",
  ],
  decisions: {
    pt: [
      "A automação não decide sozinha: ao encontrar divergência, marca o processo como pendente e envia e-mail com o documento e a descrição do erro — a decisão final continua com quem já conferia o processo.",
      "OCR e modelo em duas camadas: o Azure lê o documento e o Gemini transforma o texto em JSON com campos fixos. Separar leitura de interpretação permitiu trocar o modelo sem tocar nas regras de validação.",
      "Normalizar antes de comparar, com minúsculas, sem acento, só dígitos e os últimos 7 caracteres do chassi: assim a validação acusa divergência de dado, não de formatação.",
      "Um validador por tipo de documento, registrado em um mapa: um documento novo entra criando um módulo com `validar(arquivo, json)` e o orquestrador não muda.",
    ],
    en: [
      "The automation does not decide on its own: when it finds a mismatch it flags the process as pending and sends an email with the document and the error description — the final call stays with whoever already reviewed the process.",
      "OCR and model in two layers: Azure reads the document and Gemini turns the text into JSON with fixed fields. Separating reading from interpretation made it possible to swap the model without touching the validation rules.",
      "Normalize before comparing — lowercase, no accents, digits only, last 7 characters of the chassis — so validation reports a data mismatch, not a formatting one.",
      "One validator per document type, registered in a map: a new document only needs a module exposing `validar(arquivo, json)`, and the orchestrator stays untouched.",
    ],
  },
  images: [
    {
      src: fluxogramaImg.src,
      alt: {
        pt: "Fluxograma da automação: do monitoramento do e-mail e acesso ao processo no Holmes até a análise com IA e a aprovação ou pendência do processo",
        en: "Automation flowchart: from email monitoring and accessing the process in Holmes to AI analysis and approving or flagging the process",
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

import type { Project } from "../types";
import overviewImg from "../../../imgs/projeto_voto_aberto/overview.png";
import mapaBrasilImg from "../../../imgs/projeto_voto_aberto/mapa_brasil.png";
import eleicoesImg from "../../../imgs/projeto_voto_aberto/eleicoes.png";
import cidadesImg from "../../../imgs/projeto_voto_aberto/cidades.png";

export const votoAberto: Project = {
  id: "voto-aberto",
  slug: "voto-aberto",
  featured: true,
  title: {
    pt: "Voto Aberto",
    en: "Voto Aberto",
  },
  summary: {
    pt: "Painel eleitoral com comparecimento e resultados do 1º e 2º turno em 5.571 municípios, série desde 1989, mapa interativo e assistente de IA sobre as próprias APIs.",
    en: "Election panel with turnout and presidential results for both rounds across 5,571 municipalities, a series since 1989, an interactive map, and an AI assistant over the app's own APIs.",
  },
  problem: {
    pt: "Publicar número eleitoral exige que toda afirmação seja conferível na fonte e que a comparação entre turnos não seja lida como causal. Era preciso cruzar bases do TSE com granularidade desigual por ano (1989 só por UF, 2002+ por seção) sem imputar lacunas, e responder perguntas em tempo real sem carregar centenas de KB de payload para o modelo.",
    en: "Publishing electoral numbers requires every claim to be checkable at the source and any comparison between rounds never to be read as causal. The panel had to join TSE datasets with unequal granularity per year (1989 by state only, 2002+ by polling section) without imputing gaps, while answering questions in real time without pushing hundreds of KB of payload into the model.",
  },
  description: {
    pt: "Painel React + TypeScript com API em Python/FastAPI consumindo os resultados oficiais do TSE. A aba de mapa alterna estado e município (TopoJSON convertido em GeoJSON, projetado com d3-geo) e compara a margem Lula × Flávio nos dois turnos, destacando onde a vantagem relativa mudou. A série presidencial vai de 1989 a 2026 com granularidade e qualidade declaradas por eleição, sinalizando 1998 como base incompleta. Uma seção decompõe o ganho de votos do 2º turno por uma identidade aritmética exata, com resíduo zero, sem imputar troca de voto. Há ainda a coleta dos logs de urna para a curva minuto a minuto da prorrogação — 497.696 de 514.464 seções lidas — e um assistente de IA que responde chamando as próprias endpoints via function calling, com payloads projetados.",
    en: "React + TypeScript panel with a Python/FastAPI API consuming official TSE results. The map tab switches between state and municipality (TopoJSON converted to GeoJSON, projected with d3-geo) and compares the Lula × Flávio margin across the two rounds, highlighting where the relative advantage shifted. The presidential series runs from 1989 to 2026 with granularity and declared quality per election, flagging 1998 as an incomplete dataset. One section decomposes the second-round vote gain through an exact arithmetic identity with zero residue, without imputing vote switching. It also collects polling-station logs for the minute-by-minute curve of the runoff extension — 497,696 of 514,464 sections read — and an AI assistant that answers by calling the app's own endpoints via function calling, with projected payloads.",
  },
  technologies: [
    "TypeScript",
    "React",
    "Vite",
    "Python",
    "FastAPI",
    "d3-geo",
    "TopoJSON",
    "LLMs",
    "SSE",
    "REST APIs",
  ],
  architecture: ["Data visualization", "GIS rendering", "Data pipeline", "Tool-calling assistant"],
  decisions: {
    pt: [
      "Log da urna em vez do boletim de urna para a curva minuto a minuto: o BU registra um ponto por seção, o log registra cada evento — e o BU permanece no repositório como instrumento de validação independente.",
      "Cache por seção com agregador incremental (cursor por arquivo e lock): a coleta de 514.464 seções é retomável, cada ciclo passou a custar segundos em vez de dez minutos, e a tarefa agendada sobrevive ao terminal que a criou.",
      "Comparação entre turnos sempre descritiva: o ganho de votos é decomposto por uma identidade aritmética exata com resíduo zero, nunca por hipótese de troca de voto — o sigilo do voto impede qualquer atribuição a candidatura.",
      "Frontend em camadas (.tsx / .hook.ts / .utils.ts / .types.ts) com o hover do mapa pré-computado fora do React: geometria, cor e tooltip são calculados antes, porque re-renderizar 5.614 formas a cada mousemove derrubava a interação.",
      "Assistente de IA que não responde de memória: cada número vem de uma ferramenta que executa o mesmo código das rotas REST, com payloads projetados — /api/history tem 163 KB e o modelo recebe uma linha por ano.",
    ],
    en: [
      "The polling-station log instead of the tally sheet for the minute-by-minute curve: the sheet records one point per section, the log records every event — and the sheet stays in the repository as an independent validation instrument.",
      "Per-section cache with an incremental aggregator (file cursor and lock): collecting 514,464 sections is resumable, each cycle now costs seconds instead of ten minutes, and the scheduled task survives the terminal that created it.",
      "Round comparisons are always descriptive: the vote gain is decomposed by an exact arithmetic identity with zero residue, never by a vote-switching hypothesis — vote secrecy forbids attributing any of it to a candidacy.",
      "Frontend in layers (.tsx / .hook.ts / .utils.ts / .types.ts) with map hover precomputed outside React: geometry, color, and tooltip are computed ahead of time, because re-rendering 5,614 shapes on every mousemove killed the interaction.",
      "An AI assistant that does not answer from memory: every number comes from a tool running the same code as the REST routes, with projected payloads — /api/history is 163 KB and the model gets one row per year.",
    ],
  },
  images: [
    {
      src: overviewImg.src,
      alt: {
        pt: "Visão geral do painel com o comparecimento do 1º e do 2º turno e a variação da margem",
        en: "Panel overview with first and second round turnout and the margin shift",
      },
    },
    {
      src: mapaBrasilImg.src,
      alt: {
        pt: "Mapa do Brasil por municípios comparando a margem Lula × Flávio entre os dois turnos",
        en: "Map of Brazil by municipalities comparing the Lula × Flávio margin across the two rounds",
      },
    },
    {
      src: eleicoesImg.src,
      alt: {
        pt: "Série presidencial de 1989 a 2026 com comparecimento e vencedor de cada eleição",
        en: "Presidential series from 1989 to 2026 with turnout and the winner of each election",
      },
    },
    {
      src: cidadesImg.src,
      alt: {
        pt: "Dispersão do comparecimento por cidade e comparação das regiões entre os turnos",
        en: "Turnout scatter plot per city and regional comparison across the rounds",
      },
    },
  ],
  links: {
    demo: null,
    github: "https://github.com/joaovictorwg/votoaberto",
    monograph: null,
  },
  world: {
    zone: "projects",
    interactable: true,
  },
};

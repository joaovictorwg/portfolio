import type { Project } from "../types";
import paginaInicialImg from "../../../imgs/projeto_sistemas/PaginaInicial.png";
import homeUsuarioImg from "../../../imgs/projeto_sistemas/Tela home do usuario.png";
import resultadosImg from "../../../imgs/projeto_sistemas/Pagina de Resultados.png";
import perfilPrestadorImg from "../../../imgs/projeto_sistemas/PaginaPerfilPrestador.png";

export const projetoDeSistemas: Project = {
  id: "projeto-de-sistemas",
  slug: "projeto-de-sistemas",
  featured: false,
  badge: null,
  title: {
    pt: "ServiçoCerto · Projeto de Sistemas",
    en: "ServiçoCerto · Software Projects Course",
  },
  summary: {
    pt: "Plataforma de serviços em Flutter feita na disciplina de Projeto de Sistemas da UFT. Liderança técnica.",
    en: "Flutter service marketplace built for the Software Projects course at UFT. I led the technical development.",
  },
  problem: {
    pt: "Conectar quem precisa de um serviço a quem presta, com perfil, busca por localização e avaliação, sem virar uma planilha disfarçada de sistema. E o desafio duplo: entregar isso em iterações curtas com um time de disciplina, cuja coordenação também era parte do problema a resolver.",
    en: "Connect people who need a service with those who provide it — profiles, location search, ratings — without turning into a spreadsheet disguised as a system. And the double challenge: shipping it in short iterations with a class team, whose coordination was itself part of the problem to solve.",
  },
  description: {
    pt: "App em Flutter (Dart) com duas frentes de uso — cliente e prestadora de serviço — e o código separado em camadas em `lib/`: Components, Controller, DTO, Models, Repository, Services e Pages por perfil, com Firebase como backend. Antes do código, a disciplina pediu casos de uso expandidos e user stories escritos em Markdown, e o time prototipou cada tela no Figma antes de implementar. Coordenei o desenvolvimento: definição das iterações, repartição das telas entre o time e revisão das entregas, com versionamento no GitHub e quadro Kanban no Trello.",
    en: "A Flutter (Dart) app with two usage flows — client and service provider — and the code split into layers under `lib/`: Components, Controller, DTO, Models, Repository, Services, and pages per profile, with Firebase as the backend. Before the code, the course required expanded use cases and user stories written in Markdown, and we prototyped every screen in Figma before implementing it. I led the development: defining the iterations, splitting the screens across the team, and reviewing the deliveries, with versioning on GitHub and a Kanban board on Trello.",
  },
  technologies: ["Flutter", "Dart", "Firebase", "Figma", "Trello", "Git"],
  architecture: [
    "Layered architecture",
    "Mobile app",
    "Requirements engineering",
    "UI/UX prototyping",
  ],
  decisions: {
    pt: [
      "Especificar antes de codar: casos de uso expandidos e user stories em Markdown fizeram o time discutir escopo no documento, não no meio da implementação.",
      "Protótipos no Figma entram desde o início, junto com a especificação: cada tela era discutida como desenho antes de virar código, o que cortou retrabalho.",
      "Flutter com uma base só para Android, iOS e web, e `lib/` dividido em Controller, Repository, Services, DTO e Models — camadas que mantêm a UI fora das regras de negócio.",
      "Iterações fechadas com Kanban no Trello e versionamento no GitHub: o avanço era visível por entrega, e não por quanto tempo alguém passou trabalhando.",
    ],
    en: [
      "Specify before coding: expanded use cases and user stories in Markdown made the team argue about scope in the document, not in the middle of the implementation.",
      "Figma prototypes entered from the start, alongside the specification: every screen was discussed as a drawing before it became code, which cut rework.",
      "Flutter with a single codebase for Android, iOS, and web, and `lib/` split into Controller, Repository, Services, DTO, and Models — layers that keep the UI out of the business rules.",
      "Closed iterations with Kanban on Trello and versioning on GitHub: progress was visible per delivery, not per hour spent working.",
    ],
  },
  images: [
    {
      src: paginaInicialImg.src,
      alt: {
        pt: "Tela inicial do ServiçoCerto com acesso ao login e ao cadastro",
        en: "ServiçoCerto home screen with login and sign-up access",
      },
    },
    {
      src: homeUsuarioImg.src,
      alt: {
        pt: "Home do usuário no aplicativo ServiçoCerto",
        en: "User home inside the ServiçoCerto app",
      },
    },
    {
      src: resultadosImg.src,
      alt: {
        pt: "Resultados de busca por prestadores de serviço",
        en: "Search results for service providers",
      },
    },
    {
      src: perfilPrestadorImg.src,
      alt: {
        pt: "Perfil de prestadora de serviço com serviços e avaliações",
        en: "Service provider profile with services and ratings",
      },
    },
  ],
  links: {
    demo: null,
    github: "https://github.com/ViniciusDevelopment/Projeto_de_sistemas-2024.1",
    monograph: null,
  },
  world: {
    zone: "projects",
    interactable: true,
  },
};

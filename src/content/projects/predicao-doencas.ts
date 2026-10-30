import type { Project } from "../types";

export const predicaoDoencas: Project = {
  id: "predicao-doencas",
  slug: "predicao-doencas",
  featured: true,
  title: {
    pt: "Predição de Doenças Crônicas com Determinantes Sociais da Saúde",
    en: "Chronic Disease Prediction with Social Determinants of Health",
  },
  summary: {
    pt: "Trabalho de conclusão de curso: arquitetura preditiva que mede quanto os determinantes sociais da saúde mudam a predição de hipertensão — e a que custo de equidade.",
    en: "Bachelor's thesis: a predictive architecture that measures how much social determinants of health change hypertension prediction — and at what cost to fairness.",
  },
  problem: {
    pt: "Modelos clínicos ignoram escolaridade, renda e condições de vida. Isso pode melhorar a acurácia, mas também pode esconder viés: um modelo que acerta mais no agregado pode falhar de forma sistemática nos grupos mais vulneráveis.",
    en: "Clinical models ignore education, income, and living conditions. Including them may improve accuracy, but it may also hide bias: a model that is more accurate overall can fail systematically on the most vulnerable groups.",
  },
  description: {
    pt: "Usei os microdados da Pesquisa Nacional de Saúde (PNS 2019) e o processo de Knowledge Discovery in Databases (KDD) para preparação, análise e modelagem. Comparei Regressão Logística com regularização LASSO contra Random Forest em três cenários — biomédico, social e integrado — para isolar a contribuição das variáveis sociodemográficas. Os modelos integrados alcançaram AUC próxima de 0,80 e recall de aproximadamente 75%, mantendo capacidade discriminativa mesmo com a inclusão dessas variáveis.",
    en: "I used microdata from the National Health Survey (PNS 2019) and the Knowledge Discovery in Databases (KDD) process for preparation, analysis, and modeling. I compared Logistic Regression with LASSO regularization against Random Forest across three scenarios — biomedical, social, and integrated — to isolate the contribution of sociodemographic variables. The integrated models reached an AUC close to 0.80 and recall of about 75%, keeping their discriminative power even after those variables were added.",
  },
  technologies: [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "JupyterLab",
    "Matplotlib",
    "Seaborn",
  ],
  architecture: ["KDD", "Supervised ML", "Fairness analysis"],
  decisions: {
    pt: [
      "Separar os cenários biomédico, social e integrado em vez de jogar tudo num modelo só: sem isso não dá para atribuir ganho ou perda a um grupo de variáveis.",
      "Comparar um modelo interpretável (Regressão Logística com LASSO) com um ensemble (Random Forest) para saber se a complexidade extra paga o que promete.",
      "Medir equidade junto com acurácia: Odds Ratio, Feature Importance e métricas de fairness, não só AUC.",
      "Reportar a diferença de desempenho entre grupos de escolaridade, porque o número agregado esconde exatamente o que a pesquisa queria mostrar.",
    ],
    en: [
      "Keep the biomedical, social, and integrated scenarios separate instead of throwing everything into one model: otherwise no gain or loss can be attributed to a variable group.",
      "Compare an interpretable model (Logistic Regression with LASSO) against an ensemble (Random Forest) to find out whether the extra complexity pays for itself.",
      "Measure fairness alongside accuracy: Odds Ratio, Feature Importance, and fairness metrics, not just AUC.",
      "Report performance differences across education-level groups, because the aggregate number hides exactly what the research set out to show.",
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

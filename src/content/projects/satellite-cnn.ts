import type { Project } from "../types";
import notebookImg from "../../../imgs/deep_learning_satelete/notebook_img.png";

export const satelliteCnn: Project = {
  id: "satellite-cnn",
  slug: "satellite-cnn",
  featured: false,
  title: {
    pt: "Classificação de imagens de satélite com CNN",
    en: "Satellite image classification with CNN",
  },
  summary: {
    pt: "Rede neural convolucional em Keras para classificar imagens de satélite do EuroSAT em 10 classes de uso do solo, do carregamento ao treino num notebook único.",
    en: "A convolutional network in Keras that classifies EuroSAT satellite images into 10 land-use classes, from loading to training in a single notebook.",
  },
  problem: {
    pt: "Imagens de satélite chegam como pixels, não como rótulo: identificar uso do solo em milhares de cenas manualmente não escala, e a informação relevante está na disposição espacial das cores — não num valor isolado de pixel.",
    en: "Satellite imagery arrives as pixels, not labels: identifying land use across thousands of scenes by hand does not scale, and the relevant information sits in the spatial arrangement of colors, not in any single pixel value.",
  },
  description: {
    pt: "Notebook em Python com o dataset EuroSAT, dividido em 21.600 imagens de treino e 5.400 de validação em 10 classes de uso do solo. A rede convolucional é treinada em Keras com os geradores de imagem já separados por diretório, de modo que a validação acompanha a curva de erro a cada época. O escopo é um experimento para ser lido e reproduzido: carregamento, arquitetura, treino e avaliação no mesmo documento, sem serviço nem API em volta.",
    en: "A Python notebook using the EuroSAT dataset, split into 21,600 training and 5,400 validation images across 10 land-use classes. The convolutional network trains in Keras with image generators already separated by directory, so validation tracks the error curve epoch by epoch. The scope is an experiment meant to be read and reproduced: loading, architecture, training, and evaluation in the same document, with no service or API around it.",
  },
  technologies: ["Python", "TensorFlow", "Keras", "JupyterLab", "NumPy"],
  architecture: ["Computer vision", "Supervised ML", "CNN"],
  decisions: {
    pt: [
      "Usar o EuroSAT com as 10 classes já rotuladas: o trabalho de rotular cena por cena seria maior que o próprio experimento, e o padrão do dataset é conhecido.",
      "Rede convolucional em vez de uma rede densa: a imagem tem estrutura espacial, e a convolução aproveita essa vizinhança que uma camada totalmente conectada ignora.",
      "Separar treino e validação no gerador de imagens desde o início, para ler a curva por época e perceber overfitting sem adivinhar.",
      "Notebook único como formato do entregável: é um resultado para inspecionar e reproduzir, não um serviço — publicar como API só adicionaria manutenção sem mudar a resposta.",
    ],
    en: [
      "Use EuroSAT with its 10 classes already labeled: labeling scene by scene would cost more than the experiment itself, and the dataset's pattern is well known.",
      "A convolutional network instead of a dense one: an image has spatial structure, and convolution exploits that neighborhood a fully connected layer ignores.",
      "Split train and validation in the image generator from the start, so the curve is read per epoch and overfitting shows up without guessing.",
      "A single notebook as the deliverable format: it is a result to inspect and reproduce, not a service — publishing an API would add maintenance without changing the answer.",
    ],
  },
  images: [
    {
      src: notebookImg.src,
      alt: {
        pt: "Notebook com o carregamento do dataset EuroSAT e a configuração dos geradores de imagem de treino e validação",
        en: "Notebook loading the EuroSAT dataset and configuring the training and validation image generators",
      },
    },
  ],
  links: {
    demo: null,
    github: "https://github.com/joaovictorwg/DeepLearning-projects",
    monograph: null,
  },
  world: {
    zone: "projects",
    interactable: true,
  },
};

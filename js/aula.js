const authButton = document.getElementById("authButton");
const userWelcome = document.getElementById("userWelcome");

const aulaTitulo = document.querySelector(".curso-aula-titulo");
const aulaLabel = document.querySelector(".curso-label-figma");
const lessonMeta = document.querySelector(".curso-lesson-meta");
const lessonTitulo = document.querySelector(".curso-aula-texto h3");
const lessonParagrafos = document.querySelectorAll(".curso-aula-texto p");

const questionLabel = document.getElementById("questionLabel");
const questionType = document.getElementById("questionType");
const questionTitle = document.getElementById("questionTitle");
const questionCode = document.getElementById("questionCode");
const questionDesc = document.getElementById("questionDesc");
const answersContainer = document.getElementById("answersContainer");
const quizDots = document.getElementById("quizDots");
const nextBtn = document.getElementById("nextBtn");
const nextBtnText = document.getElementById("nextBtnText");
const backBtn = document.getElementById("backBtn");

let currentQuizStep = 0;
let selectedAnswers = {};

function getUsuario() {
  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function atualizarUsuarioAula() {
  const usuarioAtual = getUsuario();

  if (usuarioAtual) {
    if (userWelcome) {
      userWelcome.textContent = `Bem-vindo, ${usuarioAtual.nome} 👋`;
    }

    if (authButton) {
      authButton.textContent = "Sair";
    }
  } else {
    if (userWelcome) {
      userWelcome.textContent = "";
    }

    if (authButton) {
      authButton.textContent = "ENTRAR";
    }
  }
}

const aulasData = {
  "software-modulo-1": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Fundamentos do inglês para Programação",
    aulaNumero: "AULA 7 DE 12",
    modulo: "MÓDULO 1",
    conteudoTitulo: "Entendendo Comentários no Código",
    paragrafos: [
      "Nesta aula, você aprenderá a identificar e compreender comentários escritos em inglês dentro do código. Eles explicam trechos importantes, ajudam a documentar funções e deixam o projeto mais fácil de entender.",
      "Você também vai praticar como esses comentários aparecem no dia a dia do desenvolvimento e como eles ajudam na leitura, manutenção e colaboração em projetos de programação."
    ]
  },

  "software-modulo-2": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Escrita Técnica em Código",
    aulaNumero: "AULA 8 DE 12",
    modulo: "MÓDULO 2",
    conteudoTitulo: "Como escrever comentários e descrições técnicas",
    paragrafos: [
      "Nesta aula, você vai aprender a escrever comentários, descrições de funções e mensagens técnicas com mais clareza em inglês.",
      "O objetivo é melhorar sua comunicação no código e deixar seu projeto mais profissional para outras pessoas da equipe."
    ]
  },

  "software-modulo-3": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Leitura de Documentação Técnica",
    aulaNumero: "AULA 9 DE 12",
    modulo: "MÓDULO 3",
    conteudoTitulo: "Interpretando documentações em inglês",
    paragrafos: [
      "Aqui você vai praticar a leitura de documentações técnicas, identificando palavras-chave, instruções e exemplos comuns no ambiente de desenvolvimento.",
      "Isso ajuda a ganhar autonomia para estudar ferramentas, bibliotecas e frameworks usados no mercado."
    ]
  },

  "software-modulo-4": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Inglês para Ferramentas de Desenvolvimento",
    aulaNumero: "AULA 10 DE 12",
    modulo: "MÓDULO 4",
    conteudoTitulo: "Vocabulário de plataformas e ferramentas",
    paragrafos: [
      "Nesta etapa, você vai aprender termos comuns em plataformas de versionamento, integração, deploy e produtividade.",
      "Assim, fica mais fácil entender interfaces, comandos e mensagens em ferramentas usadas no dia a dia do desenvolvedor."
    ]
  },

  "software-modulo-5": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Code Review e Colaboração",
    aulaNumero: "AULA 11 DE 12",
    modulo: "MÓDULO 5",
    conteudoTitulo: "Comunicação em revisões de código",
    paragrafos: [
      "Nesta aula, você verá expressões comuns usadas em code reviews, sugestões de melhoria e feedbacks técnicos em inglês.",
      "Essa habilidade é importante para colaborar com equipes e participar de projetos de forma mais confiante."
    ]
  },

  "software-modulo-6": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Comunicação em Times de Desenvolvimento",
    aulaNumero: "AULA 12 DE 12",
    modulo: "MÓDULO 6",
    conteudoTitulo: "Interação profissional em times de tecnologia",
    paragrafos: [
      "Aqui o foco é entender frases e termos usados em reuniões, alinhamentos, tarefas e conversas do ambiente profissional.",
      "Você vai desenvolver uma comunicação mais natural para atuar em times de desenvolvimento com contexto internacional."
    ]
  },

  "data-modulo-1": {
    cursoLabel: "— ENGLISH FOR DATA SCIENCE & AI",
    titulo: "Vocabulary for Data Science",
    aulaNumero: "AULA 1 DE 6",
    modulo: "MÓDULO 1",
    conteudoTitulo: "Vocabulário essencial para dados",
    paragrafos: [
      "Nesta aula, você vai conhecer os principais termos em inglês usados em análise de dados, métricas, gráficos e bases de informação.",
      "Esses conceitos formam a base para interpretar materiais técnicos e se comunicar melhor em projetos da área."
    ]
  },

  "data-modulo-2": {
    cursoLabel: "— ENGLISH FOR DATA SCIENCE & AI",
    titulo: "English for AI and Machine Learning",
    aulaNumero: "AULA 2 DE 6",
    modulo: "MÓDULO 2",
    conteudoTitulo: "Termos comuns em IA e machine learning",
    paragrafos: [
      "Você vai aprender palavras e expressões frequentes em modelos, treinamento, inferência e avaliação de algoritmos.",
      "Isso ajuda bastante na leitura de conteúdos técnicos e no acompanhamento de discussões da área."
    ]
  },

  "data-modulo-3": {
    cursoLabel: "— ENGLISH FOR DATA SCIENCE & AI",
    titulo: "Presenting Data Insights",
    aulaNumero: "AULA 3 DE 6",
    modulo: "MÓDULO 3",
    conteudoTitulo: "Como apresentar insights em inglês",
    paragrafos: [
      "Nesta aula, o foco é desenvolver a comunicação para apresentar descobertas, tendências e resultados de análise.",
      "Você vai praticar estruturas úteis para explicar dados com mais clareza e objetividade."
    ]
  },

  "data-modulo-4": {
    cursoLabel: "— ENGLISH FOR DATA SCIENCE & AI",
    titulo: "Reading Technical Papers",
    aulaNumero: "AULA 4 DE 6",
    modulo: "MÓDULO 4",
    conteudoTitulo: "Leitura de papers e artigos técnicos",
    paragrafos: [
      "Aqui você vai praticar a leitura de artigos técnicos em inglês, com foco em interpretação de abstracts, métodos e resultados.",
      "Essa habilidade é importante para acompanhar novidades e aprofundar seu repertório na área."
    ]
  },

  "data-modulo-5": {
    cursoLabel: "— ENGLISH FOR DATA SCIENCE & AI",
    titulo: "Writing Reports and Dashboards",
    aulaNumero: "AULA 5 DE 6",
    modulo: "MÓDULO 5",
    conteudoTitulo: "Escrita profissional para relatórios",
    paragrafos: [
      "Nesta etapa, você vai aprender a escrever títulos, descrições e resumos mais claros em dashboards e relatórios.",
      "Isso torna sua comunicação mais profissional e mais fácil de entender por equipes e lideranças."
    ]
  },

  "data-modulo-6": {
    cursoLabel: "— ENGLISH FOR DATA SCIENCE & AI",
    titulo: "Communication in Global Data Teams",
    aulaNumero: "AULA 6 DE 6",
    modulo: "MÓDULO 6",
    conteudoTitulo: "Comunicação em times globais de dados",
    paragrafos: [
      "Aqui o foco é a interação em reuniões, alinhamentos e trocas profissionais com times internacionais.",
      "Você vai ganhar mais segurança para participar de contextos colaborativos usando inglês técnico."
    ]
  },

  "cyber-modulo-1": {
    cursoLabel: "— ENGLISH FOR CYBERSECURITY",
    titulo: "Cybersecurity Essentials in English",
    aulaNumero: "AULA 1 DE 6",
    modulo: "MÓDULO 1",
    conteudoTitulo: "Base técnica em segurança da informação",
    paragrafos: [
      "Nesta aula, você vai aprender vocabulário essencial de cybersecurity, incluindo termos sobre riscos, ataques e proteção.",
      "Essa base ajuda a entender conteúdos técnicos e relatórios da área com mais facilidade."
    ]
  },

  "cyber-modulo-2": {
    cursoLabel: "— ENGLISH FOR CYBERSECURITY",
    titulo: "Incident Reports and Communication",
    aulaNumero: "AULA 2 DE 6",
    modulo: "MÓDULO 2",
    conteudoTitulo: "Relatórios e comunicação de incidentes",
    paragrafos: [
      "Aqui você vai praticar expressões usadas em relatórios de incidentes e comunicações formais de segurança.",
      "O objetivo é melhorar sua clareza ao registrar e explicar eventos importantes."
    ]
  },

  "cyber-modulo-3": {
    cursoLabel: "— ENGLISH FOR CYBERSECURITY",
    titulo: "Risk, Threats and Vulnerabilities",
    aulaNumero: "AULA 3 DE 6",
    modulo: "MÓDULO 3",
    conteudoTitulo: "Riscos, ameaças e vulnerabilidades",
    paragrafos: [
      "Nesta aula, você verá termos comuns para descrever riscos, vulnerabilidades e cenários de ameaça.",
      "Isso ajuda a interpretar melhor relatórios e documentos da área de segurança."
    ]
  },

  "cyber-modulo-4": {
    cursoLabel: "— ENGLISH FOR CYBERSECURITY",
    titulo: "Compliance and Governance",
    aulaNumero: "AULA 4 DE 6",
    modulo: "MÓDULO 4",
    conteudoTitulo: "Governança e compliance em inglês",
    paragrafos: [
      "O foco aqui é entender palavras e estruturas usadas em políticas, normas e práticas de compliance.",
      "Você vai fortalecer seu vocabulário para contextos corporativos e regulatórios."
    ]
  },

  "cyber-modulo-5": {
    cursoLabel: "— ENGLISH FOR CYBERSECURITY",
    titulo: "Security Meetings and Presentations",
    aulaNumero: "AULA 5 DE 6",
    modulo: "MÓDULO 5",
    conteudoTitulo: "Reuniões e apresentações de segurança",
    paragrafos: [
      "Nesta aula, você pratica a linguagem usada em apresentações, reuniões e alinhamentos da área de segurança.",
      "Isso melhora sua comunicação profissional em contextos estratégicos e técnicos."
    ]
  },

  "cyber-modulo-6": {
    cursoLabel: "— ENGLISH FOR CYBERSECURITY",
    titulo: "Professional Writing for Security Teams",
    aulaNumero: "AULA 6 DE 6",
    modulo: "MÓDULO 6",
    conteudoTitulo: "Escrita profissional para times de segurança",
    paragrafos: [
      "Aqui você vai desenvolver escrita mais clara para relatórios, mensagens e documentações da área de segurança.",
      "A ideia é deixar sua comunicação mais objetiva, técnica e profissional."
    ]
  }
};

const quizData = [
  {
    label: "QUESTÃO 1",
    type: "MÚLTIPLA ESCOLHA",
    title: "What is the purpose of the comment in the code below?",
    code: `// TODO: add input validation before
sending to the API

function submitForm(data) {
  sendToAPI(data);
}`,
    description: "Escolha a opção que melhor descreve o papel desse comentário dentro do código.",
    mode: "single",
    answers: [
      {
        letter: "A",
        text: "Descreve o que a função já faz atualmente."
      },
      {
        letter: "B",
        text: "Indica uma tarefa pendente que o desenvolvedor ainda precisa implementar."
      },
      {
        letter: "C",
        text: "Marca o código como desativado temporariamente."
      },
      {
        letter: "D",
        text: "Explica um erro que ocorreu na execução anterior."
      }
    ]
  },
  {
    label: "QUESTÃO 2",
    type: "COMPLETE AS FRASES",
    title: "Read the comment and fill in the blanks.",
    code: `// This function calculates the total price.
// It accepts quantity and unit price as parameters.

function getTotal(quantity, unitPrice) {
  return quantity * unitPrice;
}`,
    description: "Use as informações do comentário para completar as frases em inglês.",
    mode: "chips",
    answers: [
      {
        letter: "A",
        text: "The function ______ the total price.",
        chips: ["calculates", "returns"]
      },
      {
        letter: "B",
        text: "It receives ______ parameters.",
        chips: ["two", "one"]
      },
      {
        letter: "C",
        text: "The function accepts ______ as parameters.",
        chips: ["quantity and unit price", "price and total"]
      }
    ]
  }
];

function getModuloSelecionado() {
  return localStorage.getItem("moduloSelecionado") || "software-modulo-1";
}

function getDadosAula() {
  const moduloSelecionado = getModuloSelecionado();
  return aulasData[moduloSelecionado] || aulasData["software-modulo-1"];
}

function renderAula() {
  const dados = getDadosAula();

  document.title = `${dados.titulo} | PRISMA`;

  if (aulaLabel) {
    aulaLabel.textContent = dados.cursoLabel;
  }

  if (aulaTitulo) {
    aulaTitulo.textContent = dados.titulo;
  }

  if (lessonMeta) {
    lessonMeta.innerHTML = `
      <span>${dados.aulaNumero}</span>
      <span>•</span>
      <span>${dados.modulo}</span>
    `;
  }

  if (lessonTitulo) {
    lessonTitulo.textContent = dados.conteudoTitulo;
  }

  if (lessonParagrafos.length >= 2) {
    lessonParagrafos[0].textContent = dados.paragrafos[0];
    lessonParagrafos[1].textContent = dados.paragrafos[1];
  }
}

function renderDots() {
  if (!quizDots) return;

  quizDots.innerHTML = "";

  quizData.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === currentQuizStep) {
      dot.classList.add("active");
    }
    quizDots.appendChild(dot);
  });
}

function createSingleAnswer(answer, index) {
  const button = document.createElement("button");
  button.className = "answer";
  button.type = "button";

  if (selectedAnswers[currentQuizStep] === index) {
    button.classList.add("selected");
  }

  button.innerHTML = `
    <span class="letter">${answer.letter}</span>
    <span class="answer-copy">${answer.text}</span>
  `;

  button.addEventListener("click", () => {
    selectedAnswers[currentQuizStep] = index;
    renderQuizStep();
  });

  return button;
}

function createChipAnswer(answer, index) {
  const row = document.createElement("div");
  row.className = "answer answer-row";

  const left = document.createElement("div");
  left.className = "answer-row-left";

  left.innerHTML = `
    <span class="letter">${answer.letter}</span>
    <span class="answer-copy">${answer.text}</span>
  `;

  const chips = document.createElement("div");
  chips.className = "answer-chips";

  answer.chips.forEach((chipText, chipIndex) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "answer-chip";
    chip.textContent = chipText;

    const saved = selectedAnswers[currentQuizStep];
    if (saved && saved.answerIndex === index && saved.chipIndex === chipIndex) {
      chip.classList.add("selected");
      row.classList.add("selected");
    }

    chip.addEventListener("click", () => {
      selectedAnswers[currentQuizStep] = { answerIndex: index, chipIndex };
      renderQuizStep();
    });

    chips.appendChild(chip);
  });

  row.appendChild(left);
  row.appendChild(chips);

  return row;
}

function renderQuizStep() {
  const step = quizData[currentQuizStep];
  if (!step) return;

  questionLabel.textContent = step.label;
  questionType.textContent = step.type;
  questionTitle.textContent = step.title;
  questionCode.textContent = step.code;
  questionDesc.textContent = step.description;

  answersContainer.innerHTML = "";

  if (step.mode === "single") {
    step.answers.forEach((answer, index) => {
      answersContainer.appendChild(createSingleAnswer(answer, index));
    });
  }

  if (step.mode === "chips") {
    step.answers.forEach((answer, index) => {
      answersContainer.appendChild(createChipAnswer(answer, index));
    });
  }

  if (currentQuizStep === quizData.length - 1) {
    nextBtnText.textContent = "Finalizar";
    if (backBtn) {
      backBtn.style.display = "inline-flex";
    }
  } else {
    nextBtnText.textContent = "Próxima";
    if (backBtn) {
      backBtn.style.display = "none";
    }
  }

  renderDots();
}

function canGoNext() {
  return selectedAnswers[currentQuizStep] !== undefined;
}

function handleNextStep() {
  if (!canGoNext()) return;

  if (currentQuizStep < quizData.length - 1) {
    currentQuizStep += 1;
    renderQuizStep();
    return;
  }

  alert("Quiz finalizado!");
}

function handleBackStep() {
  if (currentQuizStep === quizData.length - 1) {
    currentQuizStep -= 1;
    renderQuizStep();
  }
}

if (authButton) {
  authButton.addEventListener("click", () => {
    const usuarioAtual = getUsuario();

    if (usuarioAtual) {
      localStorage.removeItem("usuarioCadastrado");
    }

    window.location.href = "index.html";
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", handleNextStep);
}

if (backBtn) {
  backBtn.addEventListener("click", handleBackStep);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarUsuarioAula();
  renderAula();
  renderQuizStep();
});
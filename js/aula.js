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
  const logado = localStorage.getItem("usuarioLogado");

  if (!logado) return null;

  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function atualizarUsuarioAula() {
  const usuarioAtual = getUsuario();

  if (usuarioAtual) {
    if (userWelcome) userWelcome.textContent = `Bem-vindo(a), ${usuarioAtual.nome} 👋`;
    if (authButton) authButton.textContent = "SAIR";
  } else {
    if (userWelcome) userWelcome.textContent = "";
    if (authButton) authButton.textContent = "ENTRAR";
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
      "Nesta aula, você aprenderá a identificar e compreender comentários escritos em inglês dentro do código. Serão apresentados exemplos comuns utilizados por desenvolvedores para explicar funções, indicar tarefas pendentes ou descrever partes importantes de um programa, ajudando você a interpretar melhor projetos e colaborar em ambientes de desenvolvimento."
    ]
  },
  "software-modulo-2": {
    cursoLabel: "— ENGLISH FOR SOFTWARE DEVELOPMENT",
    titulo: "Escrita Técnica em Código",
    aulaNumero: "AULA 8 DE 12",
    modulo: "MÓDULO 2",
    conteudoTitulo: "Como escrever comentários e descrições técnicas",
    paragrafos: [
      "Nesta aula, você vai aprender a escrever comentários, descrições de funções e mensagens técnicas com mais clareza em inglês. O objetivo é melhorar sua comunicação no código e deixar seu projeto mais profissional para outras pessoas da equipe."
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
      { letter: "A", text: "Descreve o que a função já faz atualmente." },
      { letter: "B", text: "Indica uma tarefa pendente que o desenvolvedor ainda precisa implementar." },
      { letter: "C", text: "Marca o código como desativado temporariamente." },
      { letter: "D", text: "Explica um erro que ocorreu na execução anterior." }
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
      { letter: "A", text: "The function ______ the total price.", chips: ["calculates", "returns"] },
      { letter: "B", text: "It receives ______ parameters.", chips: ["two", "one"] },
      { letter: "C", text: "The function accepts ______ as parameters.", chips: ["quantity and unit price", "price and total"] }
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

  if (aulaLabel) aulaLabel.textContent = dados.cursoLabel;
  if (aulaTitulo) aulaTitulo.textContent = dados.titulo;

  if (lessonMeta) {
    lessonMeta.innerHTML = `
      <span>${dados.aulaNumero}</span>
      <span>•</span>
      <span>${dados.modulo}</span>
    `;
  }

  if (lessonTitulo) lessonTitulo.textContent = dados.conteudoTitulo;

  if (lessonParagrafos.length >= 1) {
    lessonParagrafos[0].textContent = dados.paragrafos[0];
  }
}

function renderDots() {
  if (!quizDots) return;

  quizDots.innerHTML = "";

  quizData.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === currentQuizStep) dot.classList.add("active");
    quizDots.appendChild(dot);
  });
}

function createSingleAnswer(answer, index) {
  const button = document.createElement("button");
  button.className = "answer";
  button.type = "button";

  if (selectedAnswers[currentQuizStep] === index) button.classList.add("selected");

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

  const savedRow = selectedAnswers[currentQuizStep] || {};

  if (savedRow[index] !== undefined) {
    row.classList.add("selected");
  }

  answer.chips.forEach((chipText, chipIndex) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "answer-chip";
    chip.textContent = chipText;

    if (savedRow[index] === chipIndex) {
      chip.classList.add("selected");
    }

    chip.addEventListener("click", () => {
      if (!selectedAnswers[currentQuizStep]) {
        selectedAnswers[currentQuizStep] = {};
      }
      selectedAnswers[currentQuizStep][index] = chipIndex;
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

  if (currentQuizStep > 0) {
    if (backBtn) backBtn.style.display = "inline-flex";
  } else {
    if (backBtn) backBtn.style.display = "none";
  }

  if (currentQuizStep === quizData.length - 1) {
    nextBtnText.textContent = "Finalizar";
  } else {
    nextBtnText.textContent = "Próxima";
  }

  renderDots();
}

function canGoNext() {
  const step = quizData[currentQuizStep];
  if (!step) return false;

  if (step.mode === "single") {
    return selectedAnswers[currentQuizStep] !== undefined;
  }

  if (step.mode === "chips") {
    const saved = selectedAnswers[currentQuizStep];
    return saved && Object.keys(saved).length > 0;
  }

  return false;
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
  if (currentQuizStep > 0) {
    currentQuizStep -= 1;
    renderQuizStep();
  }
}

if (authButton) {
  authButton.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "/index.html";
  });
}

if (nextBtn) nextBtn.addEventListener("click", handleNextStep);
if (backBtn) backBtn.addEventListener("click", handleBackStep);

document.addEventListener("DOMContentLoaded", () => {
  atualizarUsuarioAula();
  renderAula();
  renderQuizStep();
});
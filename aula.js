const authButton = document.getElementById("authButton");
const userWelcome = document.getElementById("userWelcome");

const quizStep = document.getElementById("quizStep");
const quizType = document.getElementById("quizType");
const quizQuestion = document.getElementById("quizQuestion");
const quizCodeBox = document.getElementById("quizCodeBox");
const quizInstruction = document.getElementById("quizInstruction");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const feedbackText = document.getElementById("feedbackText");
const feedbackStatus = document.getElementById("feedbackStatus");
const feedbackExtra = document.getElementById("feedbackExtra");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

let perguntaAtual = 0;
let respostaSelecionada = false;

const quizData = [
  {
    step: "QUESTÃO 1",
    type: "MÚLTIPLA ESCOLHA",
    question: "What is the purpose of the comment in the code below?",
    code: `// This code will input validation before
// sending to the server

function submitForm(data) {
  // validate data
}`,
    instruction: "Escolha a opção que melhor descreve o papel desse comentário dentro do código.",
    options: [
      { letra: "A", texto: "Executar uma função de validação", correta: false },
      { letra: "B", texto: "Explicar o que o código faz ou pretende fazer", correta: true },
      { letra: "C", texto: "Marcar o código como desativado temporariamente", correta: false },
      { letra: "D", texto: "Explicar um erro da execução anterior", correta: false }
    ],
    feedback: {
      text: "O comentário descreve a intenção daquela parte do código.",
      status: "Correto",
      extra: "Boa!"
    }
  },
  {
    step: "QUESTÃO 2",
    type: "MÚLTIPLA ESCOLHA",
    question: "What does the word 'return' usually indicate in programming?",
    code: `function getUserName() {
  return "Gabriel";
}`,
    instruction: "Escolha a alternativa que melhor explica o significado de 'return' nesse contexto.",
    options: [
      { letra: "A", texto: "Encerrar o navegador", correta: false },
      { letra: "B", texto: "Voltar um valor gerado pela função", correta: true },
      { letra: "C", texto: "Criar uma nova variável global", correta: false },
      { letra: "D", texto: "Apagar uma função anterior", correta: false }
    ],
    feedback: {
      text: "A palavra 'return' indica o valor que a função devolve.",
      status: "Correto",
      extra: "Mandou bem!"
    }
  },
  {
    step: "QUESTÃO 3",
    type: "MÚLTIPLA ESCOLHA",
    question: "What is the best meaning of 'debug' in software development?",
    code: `if(user === null){
  console.log("User not found");
}`,
    instruction: "Selecione a opção que representa melhor o uso da palavra 'debug' no dia a dia do desenvolvimento.",
    options: [
      { letra: "A", texto: "Publicar o sistema em produção", correta: false },
      { letra: "B", texto: "Traduzir o sistema para inglês", correta: false },
      { letra: "C", texto: "Encontrar e corrigir erros no código", correta: true },
      { letra: "D", texto: "Criar telas com animações", correta: false }
    ],
    feedback: {
      text: "Debug significa analisar, encontrar e corrigir problemas no código.",
      status: "Correto",
      extra: "Você concluiu!"
    }
  }
];

function getUsuario() {
  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function atualizarUsuarioAula() {
  const usuarioAtual = getUsuario();

  if (usuarioAtual) {
    if (userWelcome) userWelcome.textContent = `Bem-vindo, ${usuarioAtual.nome} 👋`;
    if (authButton) authButton.textContent = "Sair";
  } else {
    if (userWelcome) userWelcome.textContent = "";
    if (authButton) authButton.textContent = "Entrar";
  }
}

function renderPergunta() {
  const pergunta = quizData[perguntaAtual];
  respostaSelecionada = false;

  if (quizStep) quizStep.textContent = pergunta.step;
  if (quizType) quizType.textContent = pergunta.type;
  if (quizQuestion) quizQuestion.textContent = pergunta.question;
  if (quizInstruction) quizInstruction.textContent = pergunta.instruction;

  if (quizCodeBox) {
    quizCodeBox.innerHTML = `
      <pre><code>${pergunta.code}</code></pre>
    `;
  }

  if (quizOptions) {
    quizOptions.innerHTML = pergunta.options.map(opcao => `
      <button class="answer" type="button" data-correct="${opcao.correta}">
  <span class="letter">${opcao.letra}</span>
  <span class="answer-copy">${opcao.texto}</span>
</button>
    `).join("");
  }

  if (quizFeedback) {
    quizFeedback.style.display = "none";
  }

  if (nextQuestionBtn) {
    nextQuestionBtn.textContent = perguntaAtual === quizData.length - 1 ? "Finalizar" : "Próxima →";
  }

  ativarOpcoes();
}

function ativarOpcoes() {
  const options = document.querySelectorAll(".answer");
  options.forEach(option => {
    option.addEventListener("click", () => {
      if (respostaSelecionada) return;

      respostaSelecionada = true;

      options.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");

      const pergunta = quizData[perguntaAtual];
      const acertou = option.dataset.correct === "true";

      if (feedbackText) feedbackText.textContent = pergunta.feedback.text;
      if (feedbackStatus) feedbackStatus.textContent = acertou ? "Correto" : "Tente novamente";
      if (feedbackExtra) feedbackExtra.textContent = acertou ? pergunta.feedback.extra : "Revise a aula";

      if (quizFeedback) {
        quizFeedback.style.display = "flex";
      }
    });
  });
}

function avancarPergunta() {
  if (!respostaSelecionada) return;

  if (perguntaAtual < quizData.length - 1) {
    perguntaAtual++;
    renderPergunta();
  } else {
    mostrarConclusao();
  }
}

function mostrarConclusao() {
  if (quizStep) quizStep.textContent = "QUIZ CONCLUÍDO";
  if (quizType) quizType.textContent = "PARABÉNS";

  if (quizQuestion) {
    quizQuestion.textContent = "Você concluiu esta etapa do módulo com sucesso!";
  }

  if (quizInstruction) {
    quizInstruction.textContent = "Continue avançando para desbloquear as próximas aulas e desafios.";
  }

  if (quizCodeBox) {
    quizCodeBox.innerHTML = `
      <pre><code>// Great job!
// You completed the lesson quiz successfully.</code></pre>
    `;
  }

  if (quizOptions) {
    quizOptions.innerHTML = "";
  }

  if (quizFeedback) {
    quizFeedback.style.display = "flex";
  }

  if (feedbackText) feedbackText.textContent = "Seu progresso foi registrado no curso.";
  if (feedbackStatus) feedbackStatus.textContent = "Concluído";
  if (feedbackExtra) feedbackExtra.textContent = "Excelente!";

  if (nextQuestionBtn) {
    nextQuestionBtn.textContent = "Voltar ao curso";
    nextQuestionBtn.onclick = () => {
      window.location.href = "curso.html";
    };
  }
}

if (authButton) {
  authButton.addEventListener("click", function () {
    const usuarioAtual = getUsuario();

    if (usuarioAtual) {
      localStorage.removeItem("usuarioCadastrado");
      window.location.href = "index.html";
    } else {
      window.location.href = "index.html";
    }
  });
}

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", avancarPergunta);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarUsuarioAula();
  renderPergunta();
});
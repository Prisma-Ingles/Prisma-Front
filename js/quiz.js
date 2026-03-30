const perguntas = [
  {
    pergunta: "Qual é a sua área de atuação profissional?",
    opcoes: [
      "Tecnologia e TI / Dados",
      "Saúde / Medicina / Farmácia",
      "Jurídico / Negócios",
      "Financeiro / Bancos",
      "Hotelaria / Turismo",
      "Marketing / Vendas",
      "Administração / Operações",
      "Outro / Estudante"
    ]
  },
  {
    pergunta: "Com que frequência você usa inglês no trabalho hoje?",
    opcoes: [
      "Nunca ou quase nunca",
      "Leio e-mails ocasionalmente",
      "Participo de reuniões simples",
      "Interajo de forma recorrente",
      "Uso inglês diariamente"
    ]
  },
  {
    pergunta: "Qual é o seu principal objetivo com o inglês?",
    opcoes: [
      "Conseguir emprego ou crescer na área",
      "Trabalhar em empresa internacional",
      "Trabalhar em carreira para o exterior",
      "Crescer em cargos atuais",
      "Me aprofundar no meu trabalho"
    ]
  },
  {
    pergunta: "Qual habilidade você mais precisa desenvolver?",
    opcoes: [
      "Leitura de documentos técnicos",
      "Escrita de e-mails e relatórios",
      "Conversação em reuniões",
      "Vocabulário técnico da minha área",
      "Entrevistas em inglês"
    ]
  },
  {
    pergunta: "Como você descreveria seu nível de inglês atual?",
    opcoes: [
      "Básico: sei poucas palavras",
      "Pré-intermediário: leitura muito facilitada",
      "Intermediário: consigo me comunicar com esforço",
      "Intermediário avançado: me viro em temas da minha área",
      "Avançado: já pretendo me especializar no idioma"
    ]
  },
  {
    pergunta: "Em qual situação você se sentiria menos confortável hoje?",
    opcoes: [
      "Apresentar projeto para equipe internacional",
      "Negociar com cliente ou parceiro estrangeiro",
      "Entrevistar para vaga global",
      "Redigir relatório técnico longo",
      "Participar de conferência internacional"
    ]
  },
  {
    pergunta: "Quantas horas por semana você consegue estudar?",
    opcoes: [
      "Menos de 1 hora",
      "1 a 2 horas",
      "3 a 5 horas",
      "6 a 10 horas",
      "Mais de 10 horas"
    ]
  }
];

let atual = 0;
let respostas = perguntas.map(() => []);

const passo = document.getElementById("passo");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const btnVoltar = document.getElementById("btnVoltar");
const btnProximo = document.getElementById("btnProximo");
const quizSubtitulo = document.getElementById("quizSubtitulo");
const quizHelper = document.getElementById("quizHelper");

const quizBox = document.getElementById("quizBox");
const resultadoBox = document.getElementById("resultadoBox");
const cursoResultado = document.getElementById("cursoResultado");
const textoResultado = document.getElementById("textoResultado");

const btnCadastro = document.getElementById("btnCadastro");
const btnVerCursos = document.getElementById("btnVerCursos");
const modalCadastro = document.getElementById("modalCadastro");
const fecharModal = document.getElementById("fecharModal");
const formCadastro = document.getElementById("formCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");

function opcaoEstaSelecionada(indiceOpcao) {
  return respostas[atual].includes(indiceOpcao);
}

function atualizarBotaoProximo() {
  btnProximo.disabled = respostas[atual].length === 0;
  btnProximo.textContent = atual === perguntas.length - 1 ? "FINALIZAR" : "PRÓXIMO";
}

function renderizarPergunta() {
  const item = perguntas[atual];

  passo.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  pergunta.textContent = item.pergunta;
  quizSubtitulo.textContent = `${perguntas.length} perguntas • menos de 2 minutos`;
  quizHelper.textContent = "Selecione uma ou mais opções";

  opcoes.innerHTML = "";

  item.opcoes.forEach((texto, index) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opcao";

    if (opcaoEstaSelecionada(index)) {
      botao.classList.add("selecionada");
    }

    botao.innerHTML = `
      <span>${texto}</span>
      <span class="opcao-check">✓</span>
    `;

    botao.addEventListener("click", () => {
      alternarOpcao(index);
      renderizarPergunta();
    });

    opcoes.appendChild(botao);
  });

  btnVoltar.style.visibility = atual === 0 ? "hidden" : "visible";
  atualizarBotaoProximo();
}

function alternarOpcao(index) {
  if (respostas[atual].includes(index)) {
    respostas[atual] = respostas[atual].filter((i) => i !== index);
  } else {
    respostas[atual].push(index);
  }
}

function calcularCursoIdeal() {
  return {
    curso: "English for Software Development",
    descricao:
      "Ideal para quem quer desenvolver vocabulário técnico, fluidez e segurança em contextos profissionais de tecnologia.",
    cursoInterno: "English for Software Development"
  };
}

function mostrarResultado() {
  const resultado = calcularCursoIdeal();

  quizBox.classList.add("escondido");
  resultadoBox.classList.remove("escondido");

  cursoResultado.textContent = resultado.curso;
  textoResultado.textContent = resultado.descricao;

  localStorage.setItem("cursoIdeal", resultado.cursoInterno);
  localStorage.setItem("descricaoCursoIdeal", resultado.descricao);
  localStorage.setItem("respostasQuiz", JSON.stringify(respostas));
}

btnVoltar.addEventListener("click", () => {
  if (atual > 0) {
    atual--;
    renderizarPergunta();
  }
});

btnProximo.addEventListener("click", () => {
  if (respostas[atual].length === 0) {
    alert("Selecione pelo menos uma opção antes de continuar.");
    return;
  }

  if (atual < perguntas.length - 1) {
    atual++;
    renderizarPergunta();
  } else {
    mostrarResultado();
  }
});

btnVerCursos.addEventListener("click", () => {
  window.location.href = "cursos.html";
});

btnCadastro.addEventListener("click", () => {
  modalCadastro.classList.remove("escondido");
  mensagemCadastro.textContent = "";
});

fecharModal.addEventListener("click", () => {
  modalCadastro.classList.add("escondido");
});

modalCadastro.addEventListener("click", (e) => {
  if (e.target === modalCadastro) {
    modalCadastro.classList.add("escondido");
  }
});

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

  if (!nome || !email || !senha || !confirmarSenha) {
    mensagemCadastro.textContent = "Preencha todos os campos.";
    mensagemCadastro.style.color = "#dc2626";
    return;
  }

  if (senha.length < 6) {
    mensagemCadastro.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    mensagemCadastro.style.color = "#dc2626";
    return;
  }

  if (senha !== confirmarSenha) {
    mensagemCadastro.textContent = "As senhas não coincidem.";
    mensagemCadastro.style.color = "#dc2626";
    return;
  }

localStorage.setItem(
  "usuarioCadastrado",
  JSON.stringify({
    nome,
    email,
    senha
  })
);

localStorage.setItem("usuarioLogado", "true");

  mensagemCadastro.textContent = "Conta criada com sucesso!";
  mensagemCadastro.style.color = "#16a34a";

  setTimeout(() => {
    window.location.href = "cursos.html";
  }, 1200);
});

renderizarPergunta();
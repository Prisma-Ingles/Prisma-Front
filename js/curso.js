const authButton = document.getElementById("authButton");
const userWelcome = document.getElementById("userWelcome");

const cursoTitulo = document.getElementById("cursoTitulo");
const cursoDescricao1 = document.getElementById("cursoDescricao1");
const cursoDescricao2 = document.getElementById("cursoDescricao2");
const cursoBeneficios = document.getElementById("cursoBeneficios");
const cursoModulos = document.getElementById("cursoModulos");

function getUsuario() {
  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function atualizarUsuarioCurso() {
  const usuarioAtual = getUsuario();

  if (usuarioAtual) {
    if (userWelcome) userWelcome.textContent = `Bem-vindo(a), ${usuarioAtual.nome} 👋`;
    if (authButton) authButton.textContent = "SAIR";
  } else {
    if (userWelcome) userWelcome.textContent = "";
    if (authButton) authButton.textContent = "ENTRAR";
  }
}

const cursosData = {
  "English for Software Development": {
    titulo: "English for Software Development",
    descricao1: "Este módulo foi desenvolvido para estudantes e profissionais da área de tecnologia que desejam melhorar seu inglês no contexto da programação e do desenvolvimento de software.",
    descricao2: "Ao longo das aulas, você aprenderá o vocabulário essencial utilizado por desenvolvedores, além de praticar a leitura de documentação técnica, compreender mensagens de erro e utilizar termos comuns em ferramentas amplamente utilizadas no mercado, como sistemas de versionamento e plataformas de colaboração.",
    beneficios: [
      { icon: "fa-solid fa-code", text: "Aprender vocabulário essencial da programação" },
      { icon: "fa-solid fa-users", text: "Desenvolver habilidades para ler documentações técnicas" },
      { icon: "fa-solid fa-circle-info", text: "Entender mensagens de erro e logs de sistemas" },
      { icon: "fa-solid fa-briefcase", text: "Se preparar para o mundo do trabalho com Software Development" }
    ],
    modulos: [
      {
        id: "software-modulo-1",
        title: "Fundamentos do Inglês para Programação",
        hours: "10h",
        description: "Introdução ao vocabulário técnico e às estruturas mais usadas no universo da programação.",
        image: "../img/tl-cursos/modulo1.png"
      },
      {
        id: "software-modulo-2",
        title: "Escrita Técnica em Código",
        hours: "10h",
        description: "Como produzir textos escritos com clareza em commits, issues e pull requests.",
        image: "../img/tl-cursos/modulo2.png"
      },
      {
        id: "software-modulo-3",
        title: "Leitura de Documentação Técnica",
        hours: "8h",
        description: "Aprenda a navegar por documentações, guias e referências em inglês.",
        image: "../img/tl-cursos/modulo3.png"
      },
      {
        id: "software-modulo-4",
        title: "Inglês para Ferramentas de Desenvolvimento",
        hours: "12h",
        description: "Vocabulário comum em ferramentas de versionamento, integração e produtividade.",
        image: "../img/tl-cursos/modulo4.png"
      },
      {
        id: "software-modulo-5",
        title: "Interpretação de Erros e Logs",
        hours: "10h",
        description: "Compreenda mensagens de erro e registros de sistema no contexto do trabalho.",
        image: "../img/tl-cursos/modulo5.png"
      },
      {
        id: "software-modulo-6",
        title: "Comunicação em Times de Desenvolvimento",
        hours: "5h",
        description: "Expressões usadas em reuniões, code reviews e colaboração técnica.",
        image: "../img/tl-cursos/modulo6.png"
      }
    ]
  },
}

function getCursoSelecionado() {
  return localStorage.getItem("cursoSelecionado") || "English for Software Development";
}

function getDadosCurso() {
  const cursoSelecionado = getCursoSelecionado();
  return cursosData[cursoSelecionado] || cursosData["English for Software Development"];
}

function abrirAula(moduloId, moduloTitle) {
  if (moduloId) {
    localStorage.setItem("moduloSelecionado", moduloId);
  }

  if (moduloTitle) {
    localStorage.setItem("moduloTitulo", moduloTitle);
  }

  window.location.href = "aula.html";
}

function renderBeneficios(beneficios) {
  if (!cursoBeneficios) return;

  cursoBeneficios.innerHTML = beneficios.map((item) => `
    <div class="curso-benefit-item figma-benefit-item">
      <i class="${item.icon}"></i>
      <p>${item.text}</p>
    </div>
  `).join("");
}

function renderModulos(modulos) {
  if (!cursoModulos) return;

  cursoModulos.innerHTML = modulos.map((modulo, index) => {
    const progresso = [63, 7, 0, 0, 0, 0][index] ?? 0;
    const statusTexto = progresso > 0 ? `${progresso}%` : "Não iniciado";

    return `
      <article
        class="curso-modulo-card figma-modulo-card modulo-clicavel"
        data-modulo-id="${modulo.id}"
        data-modulo-title="${modulo.title}"
      >
        <div class="figma-modulo-thumb">
          <img src="${modulo.image}" alt="${modulo.title}">
        </div>

        <div class="figma-modulo-info">
          <div class="figma-modulo-top">
            <h3>${modulo.title}</h3>
            <span class="figma-modulo-hours">${modulo.hours}</span>
          </div>

          <p class="figma-modulo-desc">${modulo.description}</p>

          ${progresso > 0
        ? `
                <div class="figma-progress">
                  <div class="figma-progress-bar">
                    <span style="width:${progresso}%"></span>
                  </div>
                  <small>${statusTexto}</small>
                </div>
              `
        : `
                <div class="figma-progress figma-progress-empty">
                  <small>${statusTexto}</small>
                </div>
              `
      }
        </div>
      </article>
    `;
  }).join("");

  const cardsModulos = document.querySelectorAll(".modulo-clicavel");

  cardsModulos.forEach((card, index) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      if (index > 0) {
        alert("Você precisa concluir os módulos anteriores primeiro.");
        return;
      }

      const moduloId = card.dataset.moduloId;
      const moduloTitle = card.dataset.moduloTitle;

      abrirAula(moduloId, moduloTitle);
    });
  });
}

function renderCurso() {
  const dados = getDadosCurso();

  document.title = `${dados.titulo} | PRISMA`;

  if (cursoTitulo) cursoTitulo.textContent = dados.titulo;
  if (cursoDescricao1) cursoDescricao1.textContent = dados.descricao1;
  if (cursoDescricao2) cursoDescricao2.textContent = dados.descricao2;

  renderBeneficios(dados.beneficios);
  renderModulos(dados.modulos);
}

if (authButton) {
  authButton.addEventListener("click", () => {
    const usuarioAtual = getUsuario();

    if (usuarioAtual) {
      localStorage.removeItem("usuarioCadastrado");
      window.location.href = "index.html";
    } else {
      window.location.href = "index.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarUsuarioCurso();
  renderCurso();
});
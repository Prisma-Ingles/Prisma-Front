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
    if (userWelcome) userWelcome.textContent = `Bem-vindo, ${usuarioAtual.nome} 👋`;
    if (authButton) authButton.textContent = "Sair";
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

  "English for Data Science & AI": {
    titulo: "English for Data Science & AI",
    descricao1: "Este curso foi desenvolvido para profissionais que atuam com dados, inteligência artificial e machine learning em ambientes globais.",
    descricao2: "Você desenvolverá vocabulário técnico, leitura de papers, apresentação de resultados e comunicação em times analíticos e científicos.",
    beneficios: [
      { icon: "fa-solid fa-chart-line", text: "Aprender vocabulário de dados e IA" },
      { icon: "fa-solid fa-brain", text: "Entender documentação técnica avançada" },
      { icon: "fa-solid fa-file-lines", text: "Ler relatórios e papers com mais confiança" },
      { icon: "fa-solid fa-comments", text: "Apresentar resultados em inglês" }
    ],
    modulos: [
      {
        id: "data-modulo-1",
        title: "Vocabulary for Data Science",
        hours: "8h",
        description: "Vocabulário essencial para atuar com dados em inglês.",
        image: "../img/tl-cursos/modulo1.png"
      },
      {
        id: "data-modulo-2",
        title: "English for AI and Machine Learning",
        hours: "10h",
        description: "Termos e expressões usados em IA e ML.",
        image: "../img/tl-cursos/modulo2.png"
      },
      {
        id: "data-modulo-3",
        title: "Presenting Data Insights",
        hours: "6h",
        description: "Como apresentar insights com clareza.",
        image: "../img/tl-cursos/modulo3.png"
      },
      {
        id: "data-modulo-4",
        title: "Reading Technical Papers",
        hours: "7h",
        description: "Leitura de artigos e papers técnicos.",
        image: "../img/tl-cursos/modulo4.png"
      },
      {
        id: "data-modulo-5",
        title: "Writing Reports and Dashboards",
        hours: "5h",
        description: "Relatórios e dashboards em inglês.",
        image: "../img/tl-cursos/modulo5.png"
      },
      {
        id: "data-modulo-6",
        title: "Communication in Global Data Teams",
        hours: "6h",
        description: "Comunicação em times globais de dados.",
        image: "../img/tl-cursos/modulo6.png"
      }
    ]
  },

  "English for Cybersecurity": {
    titulo: "English for Cybersecurity",
    descricao1: "Este curso foi criado para desenvolver a fluência técnica necessária em segurança da informação, gestão de incidentes e compliance.",
    descricao2: "Você vai trabalhar com terminologia de riscos, vulnerabilidades, relatórios e comunicação estratégica com equipes e liderança.",
    beneficios: [
      { icon: "fa-solid fa-shield-halved", text: "Aprender termos essenciais de cybersecurity" },
      { icon: "fa-solid fa-triangle-exclamation", text: "Compreender incidentes e alertas" },
      { icon: "fa-solid fa-file-shield", text: "Produzir relatórios com clareza" },
      { icon: "fa-solid fa-user-tie", text: "Comunicar riscos de forma profissional" }
    ],
    modulos: [
      {
        id: "cyber-modulo-1",
        title: "Cybersecurity Essentials in English",
        hours: "8h",
        description: "Base do inglês técnico em cibersegurança.",
        image: "../img/tl-cursos/modulo1.png"
      },
      {
        id: "cyber-modulo-2",
        title: "Incident Reports and Communication",
        hours: "7h",
        description: "Relatórios e comunicação de incidentes.",
        image: "../img/tl-cursos/modulo2.png"
      },
      {
        id: "cyber-modulo-3",
        title: "Risk, Threats and Vulnerabilities",
        hours: "8h",
        description: "Riscos, ameaças e vulnerabilidades.",
        image: "../img/tl-cursos/modulo3.png"
      },
      {
        id: "cyber-modulo-4",
        title: "Compliance and Governance",
        hours: "6h",
        description: "Governança e compliance em inglês.",
        image: "../img/tl-cursos/modulo4.png"
      },
      {
        id: "cyber-modulo-5",
        title: "Security Meetings and Presentations",
        hours: "5h",
        description: "Reuniões e apresentações da área.",
        image: "../img/tl-cursos/modulo5.png"
      },
      {
        id: "cyber-modulo-6",
        title: "Professional Writing for Security Teams",
        hours: "6h",
        description: "Escrita profissional para times de segurança.",
        image: "../img/tl-cursos/modulo6.png"
      }
    ]
  }
};

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

          ${
            progresso > 0
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

  cardsModulos.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
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
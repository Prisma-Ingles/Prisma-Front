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
    if (authButton) authButton.textContent = "Entrar";
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
        title: "Fundamentos do Inglês para Programação",
        hours: "10h",
        description: "Introdução ao vocabulário técnico e às estruturas mais usadas no universo da programação."
      },
      {
        title: "Escrita Técnica em Código",
        hours: "10h",
        description: "Como produzir textos escritos com clareza em commits, issues e pull requests."
      },
      {
        title: "Leitura de Documentação Técnica",
        hours: "8h",
        description: "Aprenda a navegar por documentações, guias e referências em inglês."
      },
      {
        title: "Inglês para Ferramentas de Desenvolvimento",
        hours: "12h",
        description: "Vocabulário comum em ferramentas de versionamento, integração e produtividade."
      },
      {
        title: "Interpretação de Erros e Logs",
        hours: "10h",
        description: "Compreenda mensagens de erro e registros de sistema no contexto do trabalho."
      },
      {
        title: "Comunicação em Times de Desenvolvimento",
        hours: "5h",
        description: "Expressões usadas em reuniões, code reviews e colaboração técnica."
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
      { title: "Vocabulary for Data Science", hours: "8h", description: "Vocabulário essencial para atuar com dados em inglês." },
      { title: "English for AI and Machine Learning", hours: "10h", description: "Termos e expressões usados em IA e ML." },
      { title: "Presenting Data Insights", hours: "6h", description: "Como apresentar insights com clareza." },
      { title: "Reading Technical Papers", hours: "7h", description: "Leitura de artigos e papers técnicos." },
      { title: "Writing Reports and Dashboards", hours: "5h", description: "Relatórios e dashboards em inglês." },
      { title: "Communication in Global Data Teams", hours: "6h", description: "Comunicação em times globais de dados." }
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
      { title: "Cybersecurity Essentials in English", hours: "8h", description: "Base do inglês técnico em cibersegurança." },
      { title: "Incident Reports and Communication", hours: "7h", description: "Relatórios e comunicação de incidentes." },
      { title: "Risk, Threats and Vulnerabilities", hours: "8h", description: "Riscos, ameaças e vulnerabilidades." },
      { title: "Compliance and Governance", hours: "6h", description: "Governança e compliance em inglês." },
      { title: "Security Meetings and Presentations", hours: "5h", description: "Reuniões e apresentações da área." },
      { title: "Professional Writing for Security Teams", hours: "6h", description: "Escrita profissional para times de segurança." }
    ]
  }
};

function renderCurso() {
  const cursoSelecionado = localStorage.getItem("cursoSelecionado") || "English for Software Development";
  const dados = cursosData[cursoSelecionado] || cursosData["English for Software Development"];

  document.title = `${dados.titulo} | PRISMA`;

  if (cursoTitulo) cursoTitulo.textContent = dados.titulo;
  if (cursoDescricao1) cursoDescricao1.textContent = dados.descricao1;
  if (cursoDescricao2) cursoDescricao2.textContent = dados.descricao2;

  if (cursoBeneficios) {
    cursoBeneficios.innerHTML = dados.beneficios.map(item => `
      <div class="curso-benefit-item figma-benefit-item">
        <i class="${item.icon}"></i>
        <p>${item.text}</p>
      </div>
    `).join("");
  }

  if (cursoModulos) {
    cursoModulos.innerHTML = dados.modulos.map((modulo, index) => `
      <article 
        class="figma-modulo-card ${index === 0 ? "modulo-clicavel" : ""}" 
        data-modulo-index="${index}"
        data-modulo-titulo="${modulo.title}"
      >
        <div class="figma-modulo-thumb">
          <img src="img/modulo${index + 1}.png" alt="${modulo.title}">
        </div>

        <div class="figma-modulo-info">
          <h4>${modulo.title}</h4>

          <p class="figma-modulo-desc">
            ${modulo.description}
          </p>

          <div class="figma-modulo-footer">
            <span class="figma-modulo-status ${index < 2 ? "concluido" : index === 5 ? "progresso" : "nao-iniciado"}">
              ${index < 2 ? "Concluído" : index === 5 ? "Em andamento" : "Não iniciado"}
            </span>

            <strong>${modulo.hours}</strong>
          </div>

          <div class="figma-progress ${index === 2 || index === 3 || index === 4 ? "hidden-progress" : ""}">
            <span style="width:${index === 0 ? "62%" : index === 1 ? "17%" : index === 5 ? "25%" : "0%"}"></span>
          </div>
        </div>
      </article>
    `).join("");

    ativarCliqueModulos();
  }
}

function ativarCliqueModulos() {
  const modulos = document.querySelectorAll(".figma-modulo-card");

  modulos.forEach((modulo) => {
    modulo.addEventListener("click", () => {
      const index = Number(modulo.dataset.moduloIndex);
      const titulo = modulo.dataset.moduloTitulo;
      const cursoSelecionado = localStorage.getItem("cursoSelecionado") || "English for Software Development";

      if (cursoSelecionado === "English for Software Development" && index === 0) {
        localStorage.setItem("moduloSelecionado", titulo);
        window.location.href = "aula.html";
      }
    });
  });
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

document.addEventListener("DOMContentLoaded", () => {
  atualizarUsuarioCurso();
  renderCurso();
});
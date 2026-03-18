const authButton = document.getElementById("authButton");
const userWelcome = document.getElementById("userWelcome");
const nomeUsuario = document.getElementById("nomeUsuario");
const cursoIdealTexto = document.getElementById("cursoIdealTexto");
const descricaoCursoIdeal = document.getElementById("descricaoCursoIdeal");
const courseCards = document.querySelectorAll(".prisma-course-card");

function getUsuario() {
  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function getCursoIdeal() {
  return localStorage.getItem("cursoIdeal") || "English for Software Development";
}

function atualizarUsuarioCurso() {
  const usuarioAtual = getUsuario();

  if (usuarioAtual) {
    if (userWelcome) userWelcome.textContent = `Bem-vindo, ${usuarioAtual.nome} 👋`;
    if (nomeUsuario) nomeUsuario.textContent = usuarioAtual.nome;
    if (authButton) authButton.textContent = "Sair";
  } else {
    if (userWelcome) userWelcome.textContent = "";
    if (nomeUsuario) nomeUsuario.textContent = "Aluno";
    if (authButton) authButton.textContent = "Entrar";
  }
}

function atualizarCursoIdealTexto() {
  const cursoIdeal = getCursoIdeal();
  const descricaoSalva = localStorage.getItem("descricaoCursoIdeal");

  if (cursoIdealTexto) {
    cursoIdealTexto.textContent = cursoIdeal;
  }

  if (descricaoCursoIdeal && descricaoSalva) {
    descricaoCursoIdeal.textContent = descricaoSalva;
  }
}

function destacarCursoIdeal() {
  const cursoIdeal = getCursoIdeal();

  courseCards.forEach((card) => {
    card.classList.remove("prisma-course-card-active");

    if (card.dataset.course === cursoIdeal) {
      card.classList.add("prisma-course-card-active");
    }
  });
}

function abrirCurso(courseName) {
  localStorage.setItem("cursoSelecionado", courseName);
  window.location.href = "curso.html";
}

function configurarCards() {
  courseCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const courseName = card.dataset.course;
      abrirCurso(courseName);
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
  atualizarCursoIdealTexto();
  destacarCursoIdeal();
  configurarCards();
});
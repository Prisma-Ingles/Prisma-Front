(function () {

const authButton = document.getElementById("authButton");
const userWelcome = document.getElementById("userWelcome");
const nomeUsuario = document.getElementById("nomeUsuario");
const cursoIdealTexto = document.getElementById("cursoIdealTexto");
const descricaoCursoIdeal = document.getElementById("descricaoCursoIdeal");
const courseCards = document.querySelectorAll(".prisma-course-card");
const tituloPaginaCursos = document.querySelector('.courses-main-title')

function getUsuario() {
  const logado = localStorage.getItem("usuarioLogado");

  if (!logado) return null;

  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;}

function getCursoIdeal() {
  return localStorage.getItem("cursoIdeal") || null;}

function atualizarUsuarioCurso() {
  const usuarioAtual = getUsuario();

  if (usuarioAtual) {
    if (userWelcome) userWelcome.textContent = `Bem-vindo(a), ${usuarioAtual.nome} 👋`;
    if (nomeUsuario) nomeUsuario.textContent = usuarioAtual.nome;
    if (authButton) authButton.textContent = "SAIR";
  } else {
    if (userWelcome) userWelcome.textContent = "";
    if (nomeUsuario) nomeUsuario.textContent = "Aluno";
    if (authButton) authButton.textContent = "ENTRAR";
  }
}

function atualizarCursoIdealTexto() {
  const usuario = getUsuario();
  const cursoIdeal = getCursoIdeal();
  const descricaoSalva = localStorage.getItem("descricaoCursoIdeal");

  if (!usuario) {
    tituloPaginaCursos.textContent = "Nossos cursos";
    descricaoCursoIdeal.textContent = "Conteúdo prático por área profissional. Cada curso tem 10 módulos com videoaulas e atividades.";
    return;
  }

  if (usuario && !cursoIdeal) {
    tituloPaginaCursos.textContent = "Nossos cursos";
    descricaoCursoIdeal.textContent = "Conteúdo prático por área profissional. Cada curso tem 10 módulos com videoaulas e atividades.";
    return;
  }

  if (cursoIdealTexto && cursoIdeal) {
    cursoIdealTexto.textContent = `${cursoIdeal}`;
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
  if (!courseName) return;

  if (courseName !== "English for Software Development") {
    return;
  }

  localStorage.setItem("cursoSelecionado", courseName);
  window.location.href = "curso.html";
}

function configurarCards() {
  courseCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const usuario = getUsuario();

      if (!usuario) {
        alert("Você precisa se cadastrar ou fazer login para acessar os cursos.");
        abrirModal();
        return;
      }

      let courseName = card.dataset.course;

      if (!courseName) {
        const titulo = card.querySelector("h3");
        if (titulo) {
          courseName = titulo.textContent.trim();
        }
      }

      abrirCurso(courseName);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarUsuarioCurso();
  atualizarCursoIdealTexto();
  destacarCursoIdeal();
  configurarCards();
});

})();
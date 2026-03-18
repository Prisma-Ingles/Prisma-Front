const header = document.getElementById("header");
const sections = document.querySelectorAll(".section");

const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

const tabEntrar = document.getElementById("tabEntrar");
const tabCadastrar = document.getElementById("tabCadastrar");

const formEntrar = document.getElementById("formEntrar");
const formCadastrar = document.getElementById("formCadastrar");

const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const formMessage = document.getElementById("formMessage");

const emailEntrar = document.getElementById("emailEntrar");
const senhaEntrar = document.getElementById("senhaEntrar");

const nomeCadastrar = document.getElementById("nomeCadastrar");
const emailCadastrar = document.getElementById("emailCadastrar");
const senhaCadastrar = document.getElementById("senhaCadastrar");
const confirmarSenha = document.getElementById("confirmarSenha");

const authButton = document.getElementById("authButton");
const userWelcome = document.getElementById("userWelcome");

function showMessage(text, type) {
  if (!formMessage) return;
  formMessage.textContent = text;
  formMessage.classList.remove("error", "success");
  formMessage.classList.add(type);
}

function clearMessage() {
  if (!formMessage) return;
  formMessage.textContent = "";
  formMessage.classList.remove("error", "success");
}

function abrirModal() {
  if (!loginModal) return;
  loginModal.classList.add("active");
  clearMessage();
  ativarEntrar();
}

function fecharModal() {
  if (!loginModal) return;
  loginModal.classList.remove("active");
  clearMessage();
}

function ativarEntrar() {
  if (!tabEntrar || !tabCadastrar || !formEntrar || !formCadastrar) return;

  tabEntrar.classList.add("active");
  tabCadastrar.classList.remove("active");

  formEntrar.classList.remove("hidden-form");
  formCadastrar.classList.add("hidden-form");

  if (modalTitle) {
    modalTitle.textContent = "Bem-vindo";
  }

  if (modalSubtitle) {
    modalSubtitle.textContent = "Acesse sua conta ou crie uma nova gratuitamente.";
  }

  clearMessage();
}

function ativarCadastrar() {
  if (!tabEntrar || !tabCadastrar || !formEntrar || !formCadastrar) return;

  tabCadastrar.classList.add("active");
  tabEntrar.classList.remove("active");

  formCadastrar.classList.remove("hidden-form");
  formEntrar.classList.add("hidden-form");

  if (modalTitle) {
    modalTitle.textContent = "Crie sua conta";
  }

  if (modalSubtitle) {
    modalSubtitle.textContent = "Cadastre-se para continuar sua jornada no inglês.";
  }

  clearMessage();
}

function revelarSecoes() {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;

    if (sectionTop < trigger) {
      section.classList.add("show");
    }
  });
}

function atualizarUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuarioCadastrado"));

  if (usuario && userWelcome && authButton) {
    userWelcome.textContent = `Bem-vindo, ${usuario.nome} 👋`;
    authButton.textContent = "Sair";
  } else if (userWelcome && authButton) {
    userWelcome.textContent = "";
    authButton.textContent = "Entrar";
  }
}

if (authButton) {
  authButton.addEventListener("click", function () {
    const usuario = localStorage.getItem("usuarioCadastrado");

    if (usuario) {
      localStorage.removeItem("usuarioCadastrado");
      atualizarUsuario();
    } else {
      abrirModal();
    }
  });
}

if (closeModal) {
  closeModal.addEventListener("click", fecharModal);
}

if (loginModal) {
  loginModal.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      fecharModal();
    }
  });
}

if (tabEntrar) {
  tabEntrar.addEventListener("click", ativarEntrar);
}

if (tabCadastrar) {
  tabCadastrar.addEventListener("click", ativarCadastrar);
}

window.addEventListener("scroll", function () {
  if (header) {
    if (window.scrollY > 40) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  }

  revelarSecoes();
});

revelarSecoes();
atualizarUsuario();

if (formEntrar) {
  formEntrar.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailEntrar ? emailEntrar.value.trim() : "";
    const senha = senhaEntrar ? senhaEntrar.value.trim() : "";

    if (!email || !senha) {
      showMessage("Preencha e-mail e senha.", "error");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    if (!usuario) {
      showMessage("Nenhuma conta cadastrada ainda.", "error");
      return;
    }

    if (usuario.email !== email) {
      showMessage("E-mail não encontrado.", "error");
      return;
    }

    showMessage("Login realizado com sucesso!", "success");

    setTimeout(() => {
      fecharModal();
      atualizarUsuario();
    }, 1200);
  });
}

if (formCadastrar) {
  formCadastrar.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = nomeCadastrar ? nomeCadastrar.value.trim() : "";
    const email = emailCadastrar ? emailCadastrar.value.trim() : "";
    const senha = senhaCadastrar ? senhaCadastrar.value : "";
    const confirmar = confirmarSenha ? confirmarSenha.value : "";

    if (!nome || !email || !senha || !confirmar) {
      showMessage("Preencha todos os campos.", "error");
      return;
    }

    if (senha.length < 6) {
      showMessage("A senha precisa ter pelo menos 6 caracteres.", "error");
      return;
    }

    if (senha !== confirmar) {
      showMessage("As senhas não coincidem.", "error");
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

    showMessage("Conta criada com sucesso!", "success");

    setTimeout(() => {
      fecharModal();
      atualizarUsuario();
      ativarEntrar();
    }, 1200);
  });
}


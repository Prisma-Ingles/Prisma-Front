const header = document.getElementById("header");
const revealElements = document.querySelectorAll(".reveal");

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
const ctaCadastrar = document.getElementById("ctaCadastrar");

const paymentModal = document.getElementById("paymentModal");
const paymentBox = document.getElementById("paymentBox");
const paymentClose = document.getElementById("paymentClose");
const paymentTitle = document.getElementById("paymentTitle");
const paymentPlanTag = document.getElementById("paymentPlanTag");
const paymentSubtitle = document.getElementById("paymentSubtitle");

const methodBtns = document.querySelectorAll(".method-btn");
const paymentContents = document.querySelectorAll(".payment-content");
const cardConfirmBtn = document.getElementById("cardConfirmBtn");
const pixConfirmBtn = document.getElementById("pixConfirmBtn");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add("show");
    }
  });
}

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

function getUsuario() {
  const logado = localStorage.getItem("usuarioLogado");

  if (!logado) return null;

  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

function abrirModal() {
  if (!loginModal) {
    window.location.href = "../index.html#login";
    return;
  }

  loginModal.classList.add("active");
  document.body.classList.add("blur-bg");
  clearMessage();
  ativarEntrar();
}

function fecharModal() {
  if (!loginModal) return;
  loginModal.classList.remove("active");
  document.body.classList.remove("blur-bg");
  clearMessage();
}

function abrirModalCadastro() {
  if (!loginModal) {
    window.location.href = "../index.html#login";
    return;
  }

  loginModal.classList.add("active");
  document.body.classList.add("blur-bg");
  clearMessage();
  ativarCadastrar();
}

function ativarEntrar() {
  if (!tabEntrar || !tabCadastrar || !formEntrar || !formCadastrar) return;

  tabEntrar.classList.add("active");
  tabCadastrar.classList.remove("active");

  formEntrar.classList.remove("hidden-form");
  formCadastrar.classList.add("hidden-form");

  if (modalTitle) {
    modalTitle.textContent = "Bem-vindo(a)";
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

function atualizarUsuario() {
  const usuario = getUsuario();

  if (usuario && userWelcome && authButton) {
    userWelcome.textContent = `Bem-vindo(a), ${usuario.nome} 👋`;
    authButton.textContent = "SAIR";
  } else if (userWelcome && authButton) {
    userWelcome.textContent = "";
    authButton.textContent = "ENTRAR";
  }
}

function switchPaymentMethod(method) {
  methodBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.method === method);
  });

  paymentContents.forEach((content) => {
    content.classList.remove("active");
  });

  if (method === "card") {
    document.getElementById("cardPayment")?.classList.add("active");
  } else {
    document.getElementById("pixPayment")?.classList.add("active");
  }
}

function openPayment(planType) {
  const usuario = getUsuario();

  if (planType === "free") {
    if (!usuario) {
      alert("Você precisa se cadastrar ou fazer login para continuar.");
      abrirModalCadastro();
      return;
    }

    window.location.href = "./html/cursos.html";
    return;
  }

  if (!usuario) {
    alert("Você precisa se cadastrar ou fazer login para continuar.");
    localStorage.setItem("planoPendente", planType);
    abrirModalCadastro();
    return;
  }

  if (!paymentModal || !paymentBox) return;

  paymentModal.classList.add("active");
  document.body.classList.add("blur-bg");

  // 🔥 limpa SEMPRE antes
  paymentBox.classList.remove("payment-free", "payment-plus", "payment-pro");

  // 🔥 trata TODOS os planos corretamente
  if (planType === "plus") {
    paymentBox.classList.add("payment-plus");

    if (paymentPlanTag) paymentPlanTag.textContent = "LIBERAR PRISMA PLUS";
    if (paymentTitle) paymentTitle.textContent = "Finalizar assinatura";
    if (paymentSubtitle) {
      paymentSubtitle.textContent =
        "Escolha a forma de pagamento para desbloquear mais aulas e recursos.";
    }

  } else if (planType === "pro") {
    paymentBox.classList.add("payment-pro");

    if (paymentPlanTag) paymentPlanTag.textContent = "LIBERAR PRISMA PRO";
    if (paymentTitle) paymentTitle.textContent = "Finalizar assinatura";
    if (paymentSubtitle) {
      paymentSubtitle.textContent =
        "Escolha a forma de pagamento para acessar todos os cursos e recursos exclusivos.";
    }
  }

  switchPaymentMethod("card");
}

function fecharPagamento() {
  if (!paymentModal) return;
  paymentModal.classList.remove("active");
  document.body.classList.remove("blur-bg");
}

if (authButton) {
  authButton.addEventListener("click", function () {
    const usuario = getUsuario();

    if (usuario) {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("cursoSelecionado");
      window.location.href = "../index.html";
    } else {
      abrirModal();
    }
  });
}

if (ctaCadastrar) {
  ctaCadastrar.addEventListener("click", abrirModalCadastro);
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

if (formEntrar) {
  formEntrar.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailEntrar ? emailEntrar.value.trim() : "";
    const senha = senhaEntrar ? senhaEntrar.value.trim() : "";

    if (!email || !senha) {
      showMessage("Preencha e-mail e senha.", "error");
      return;
    }

    const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
    const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

    if (!usuario) {
      showMessage("Nenhuma conta cadastrada ainda.", "error");
      return;
    }

    if (usuario.email !== email || usuario.senha !== senha) {
      showMessage("E-mail ou senha incorretos.", "error");
      return;
    }

    showMessage("Login realizado com sucesso!", "success");
    localStorage.setItem("usuarioLogado", "true");

    setTimeout(() => {
      fecharModal();
      atualizarUsuario();
      const planoPendente = localStorage.getItem("planoPendente");

      if (planoPendente) {
        localStorage.removeItem("planoPendente");
        openPayment(planoPendente);
        return;
      }

      window.location.href = "./html/cursos.html";

    }, 900);
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

    localStorage.setItem("usuarioLogado", "true");
    atualizarUsuario();

    showMessage("Conta criada com sucesso!", "success");

    setTimeout(() => {
      fecharModal();
      atualizarUsuario();
      const planoPendente = localStorage.getItem("planoPendente");

      if (planoPendente) {
        localStorage.removeItem("planoPendente");
        openPayment(planoPendente);
        return;
      }

      window.location.href = "./html/cursos.html";

    }, 900);
  });
}

if (paymentClose) {
  paymentClose.addEventListener("click", fecharPagamento);
}

if (paymentModal) {
  paymentModal.addEventListener("click", function (e) {
    if (e.target === paymentModal) {
      fecharPagamento();
    }
  });
}

methodBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchPaymentMethod(btn.dataset.method);
  });
});

if (cardConfirmBtn) {
  cardConfirmBtn.addEventListener("click", () => {
    alert("Pagamento com cartão aprovado com sucesso!");
    fecharPagamento();
  });
}

if (pixConfirmBtn) {
  pixConfirmBtn.addEventListener("click", () => {
    alert("Pagamento via Pix confirmado com sucesso!");
    fecharPagamento();
  });
}

window.addEventListener("scroll", function () {
  if (header) {
    if (window.scrollY > 40) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  }

  revealOnScroll();
});

window.addEventListener("load", () => {
  revealOnScroll();
  atualizarUsuario();

  if (window.location.hash === "#login") {
    setTimeout(() => {
      abrirModal();
    }, 100);
    history.replaceState(null, null, window.location.pathname);
  }
});
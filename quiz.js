document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: 'Como você responderia à pergunta: “How are you?”',
      options: [
        { text: "I’m fine, thank you.", score: 1 },
        { text: "I have 25 years old.", score: 0 },
        { text: "My name is Gabriel.", score: 0 },
        { text: "Good night.", score: 0 }
      ]
    },
    {
      question: "Qual frase está correta em inglês?",
      options: [
        { text: "She go to work every day.", score: 0 },
        { text: "She goes to work every day.", score: 1 },
        { text: "She going to work every day.", score: 0 },
        { text: "She gone to work every day.", score: 0 }
      ]
    },
    {
      question: "Como dizer corretamente: 'Tenho experiência com atendimento ao cliente'?",
      options: [
        { text: "I have experience with customer service.", score: 1 },
        { text: "I am experience in customer service.", score: 0 },
        { text: "I have customer service experienced.", score: 0 },
        { text: "I has experience with customer service.", score: 0 }
      ]
    },
    {
      question: "Qual frase demonstra um nível mais avançado?",
      options: [
        { text: "I like music.", score: 0 },
        { text: "I can travel tomorrow.", score: 0 },
        { text: "I have been improving my English for professional situations.", score: 1 },
        { text: "My favorite color is blue.", score: 0 }
      ]
    },
    {
      question: "Em um contexto profissional, qual frase está mais adequada?",
      options: [
        { text: "Send me this now.", score: 0 },
        { text: "Could you please send me this by the end of the day?", score: 1 },
        { text: "You send me today.", score: 0 },
        { text: "Send this for me because yes.", score: 0 }
      ]
    }
  ];

  let currentQuestion = 0;
  let answers = new Array(questions.length).fill(null);

  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizStep = document.getElementById("quizStep");
  const quizProgressBar = document.getElementById("quizProgressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const quizCard = document.getElementById("quizCard");
  const quizResultCard = document.getElementById("quizResultCard");
  const resultLevel = document.getElementById("resultLevel");
  const resultText = document.getElementById("resultText");
  const openRegisterFromResult = document.getElementById("openRegisterFromResult");

  const loginModal = document.getElementById("loginModal");
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const tabEntrar = document.getElementById("tabEntrar");
  const tabCadastrar = document.getElementById("tabCadastrar");
  const formEntrar = document.getElementById("formEntrar");
  const formCadastrar = document.getElementById("formCadastrar");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const formMessage = document.getElementById("formMessage");

  function renderQuestion() {
    const questionData = questions[currentQuestion];

    quizStep.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    quizQuestion.textContent = questionData.question;
    quizProgressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    quizOptions.innerHTML = "";

    questionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option.text;

      if (answers[currentQuestion] === index) {
        button.classList.add("selected");
      }

      button.addEventListener("click", function () {
        answers[currentQuestion] = index;
        renderQuestion();
      });

      quizOptions.appendChild(button);
    });

    prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima";
  }

  function calculateResult() {
    let totalScore = 0;

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        totalScore += questions[questionIndex].options[answerIndex].score;
      }
    });

    if (totalScore <= 2) {
      return {
        level: "Básico",
        text: "Você está começando sua jornada e já pode evoluir com uma trilha ideal."
      };
    }

    if (totalScore <= 4) {
      return {
        level: "Intermediário",
        text: "Você já possui uma boa base e pode desenvolver fluidez e confiança no inglês profissional."
      };
    }

    return {
      level: "Avançado",
      text: "Você já demonstra ótimo domínio do idioma e pode focar em comunicação profissional e networking internacional."
    };
  }

  function showResult() {
    const result = calculateResult();

    quizCard.style.display = "none";
    quizResultCard.classList.remove("hidden-result");

    resultLevel.textContent = result.level;
    resultText.textContent = result.text;

    localStorage.setItem("quizNivel", result.level);
    localStorage.setItem("quizResultadoTexto", result.text);
  }

  function openLoginModal() {
    loginModal.classList.add("active");
  }

  function closeLoginModal() {
    loginModal.classList.remove("active");
  }

  function activateEntrarTab() {
    tabEntrar.classList.add("active");
    tabCadastrar.classList.remove("active");

    formEntrar.classList.remove("hidden-form");
    formCadastrar.classList.add("hidden-form");

    modalTitle.textContent = "Bem-vindo";
    modalSubtitle.textContent = "Acesse sua conta ou crie uma nova gratuitamente.";
    formMessage.textContent = "";
    formMessage.className = "form-message";
  }

  function activateCadastrarTab() {
    tabCadastrar.classList.add("active");
    tabEntrar.classList.remove("active");

    formCadastrar.classList.remove("hidden-form");
    formEntrar.classList.add("hidden-form");

    modalTitle.textContent = "Crie sua conta";
    modalSubtitle.textContent = "Cadastre-se para salvar seu resultado e começar sua jornada.";
    formMessage.textContent = "";
    formMessage.className = "form-message";
  }

  nextBtn.addEventListener("click", function () {
    if (answers[currentQuestion] === null) {
      alert("Selecione uma resposta antes de continuar.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });

  openModal.addEventListener("click", function () {
    openLoginModal();
    activateEntrarTab();
  });

  closeModal.addEventListener("click", closeLoginModal);

  loginModal.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      closeLoginModal();
    }
  });

  tabEntrar.addEventListener("click", activateEntrarTab);
  tabCadastrar.addEventListener("click", activateCadastrarTab);

  openRegisterFromResult.addEventListener("click", function () {
    openLoginModal();
    activateCadastrarTab();
  });

  formEntrar.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "Login realizado com sucesso!";
    formMessage.className = "form-message success";

    setTimeout(function () {
      closeLoginModal();
    }, 1200);
  });

  formCadastrar.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeCadastrar").value.trim();
    const email = document.getElementById("emailCadastrar").value.trim();
    const senha = document.getElementById("senhaCadastrar").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (!nome || !email || !senha || !confirmarSenha) {
      formMessage.textContent = "Preencha todos os campos.";
      formMessage.className = "form-message error";
      return;
    }

    if (senha.length < 6) {
      formMessage.textContent = "A senha precisa ter pelo menos 6 caracteres.";
      formMessage.className = "form-message error";
      return;
    }

    if (senha !== confirmarSenha) {
      formMessage.textContent = "As senhas não coincidem.";
      formMessage.className = "form-message error";
      return;
    }

    const nivelSalvo = localStorage.getItem("quizNivel") || "Não identificado";

    localStorage.setItem(
      "usuarioCadastrado",
      JSON.stringify({
        nome: nome,
        email: email,
        nivel: nivelSalvo
      })
    );

    formMessage.textContent = `Conta criada com sucesso! Nível salvo: ${nivelSalvo}.`;
    formMessage.className = "form-message success";

    setTimeout(function () {
      closeLoginModal();
      window.location.href = "index.html";
    }, 1500);
  });

  renderQuestion();
});
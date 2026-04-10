(function () {
  "use strict";

  function criarToast() {
    // Evita duplicata
    if (document.getElementById("prismaToast")) return;

    var toast = document.createElement("div");
    toast.id = "prismaToast";
    toast.innerHTML = '\
      <div class="prisma-toast-icon"><i class="fa-solid fa-circle-check"></i></div>\
      <div class="prisma-toast-texto">\
        <strong>Mensagem enviada!</strong>\
        <span>Recebemos seu contato. Retornaremos em até 24 horas.</span>\
      </div>\
      <button class="prisma-toast-fechar" aria-label="Fechar">\
        <i class="fa-solid fa-xmark"></i>\
      </button>';

    document.body.appendChild(toast);

  
    toast.querySelector(".prisma-toast-fechar").addEventListener("click", function () {
      esconderToast();
    });
  }

  function exibirToast() {
    var toast = document.getElementById("prismaToast");
    if (!toast) return;
    toast.classList.add("prisma-toast-visivel");


    setTimeout(esconderToast, 5000);
  }

  function esconderToast() {
    var toast = document.getElementById("prismaToast");
    if (!toast) return;
    toast.classList.remove("prisma-toast-visivel");
  }


  function injetarEstilos() {
    if (document.getElementById("prismaToastStyle")) return;

    var style = document.createElement("style");
    style.id = "prismaToastStyle";
    style.textContent = '\
      #prismaToast {\
        position: fixed;\
        bottom: 28px;\
        left: 50%;\
        transform: translateX(-50%) translateY(100px);\
        opacity: 0;\
        display: flex;\
        align-items: center;\
        gap: 14px;\
        background: #03123a;\
        color: #ffffff;\
        padding: 16px 20px;\
        border-radius: 12px;\
        box-shadow: 0 8px 32px rgba(0,0,0,0.22);\
        min-width: 300px;\
        max-width: 90vw;\
        z-index: 9999;\
        transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;\
        font-family: "Inter", Arial, sans-serif;\
      }\
      #prismaToast.prisma-toast-visivel {\
        transform: translateX(-50%) translateY(0);\
        opacity: 1;\
      }\
      .prisma-toast-icon {\
        font-size: 22px;\
        color: #4ade80;\
        flex-shrink: 0;\
      }\
      .prisma-toast-texto {\
        display: flex;\
        flex-direction: column;\
        gap: 2px;\
        flex: 1;\
      }\
      .prisma-toast-texto strong {\
        font-size: 14px;\
        font-weight: 700;\
      }\
      .prisma-toast-texto span {\
        font-size: 12px;\
        opacity: 0.78;\
        line-height: 1.4;\
      }\
      .prisma-toast-fechar {\
        background: transparent;\
        border: none;\
        color: rgba(255,255,255,0.6);\
        font-size: 16px;\
        cursor: pointer;\
        padding: 2px 4px;\
        flex-shrink: 0;\
        transition: color 0.2s ease;\
      }\
      .prisma-toast-fechar:hover { color: #ffffff; }\
    ';

    document.head.appendChild(style);
  }

  function validarCampo(valor, tipo) {
    if (!valor || valor.trim() === "") return false;
    if (tipo === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
    }
    return true;
  }

  function marcarErro(input, ativo) {
    input.style.borderColor = ativo ? "#ef4444" : "rgb(191, 219, 250)";
  }

  function init() {
    injetarEstilos();
    criarToast();

    var form = document.getElementById("formContato");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome    = document.getElementById("nome");
      var email   = document.getElementById("email");
      var assunto = document.getElementById("Assunto_tecnico");
      var mensagem = document.getElementById("mensagemcaixa");

      var valido = true;

      // Valida nome
      if (!validarCampo(nome.value)) {
        marcarErro(nome, true);
        valido = false;
      } else {
        marcarErro(nome, false);
      }

      if (!validarCampo(email.value, "email")) {
        marcarErro(email, true);
        valido = false;
      } else {
        marcarErro(email, false);
      }

      if (!validarCampo(mensagem.value)) {
        marcarErro(mensagem, true);
        valido = false;
      } else {
        marcarErro(mensagem, false);
      }

      if (!valido) return;

      exibirToast();
      form.reset();

      [nome, email, mensagem].forEach(function (el) {
        marcarErro(el, false);
      });
    });

    form.querySelectorAll("input, textarea").forEach(function (el) {
      el.addEventListener("input", function () {
        marcarErro(el, false);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
/* ============================================================
   PRISMA — menu-mobile.js
   Script global do menu hambúrguer. Funciona em qualquer
   página do projeto sem nenhuma alteração.

   Como importar (em TODAS as páginas, antes de fechar </body>):
     <script src="/js/menu-mobile.js"></script>

   Páginas na pasta /html/ usam:
     <script src="../js/menu-mobile.js"></script>
   ============================================================ */

(function () {
  "use strict";

  /* ──────────────────────────────────────────────────────────
     CONFIGURAÇÃO CENTRALIZADA
     Altere os hrefs aqui se a estrutura do projeto mudar.
     Caminhos absolutos (/html/...) funcionam igual para
     index.html (raiz) e para qualquer página em /html/.
  ─────────────────────────────────────────────────────────── */
  var NAV_LINKS = [
    { href: "/index.html",             label: "INÍCIO"        },
    { href: "/html/cursos.html",       label: "CURSOS"        },
    { href: "/html/certificados.html", label: "CERTIFICADOS"  },
    { href: "/html/recursos.html",     label: "RECURSOS"      },
    { href: "/html/perfil.html",       label: "PERFIL"        },
    { href: "/html/contato.html",      label: "CONTATO"       },
  ];


  /* ──────────────────────────────────────────────────────────
     1. CRIA O DRAWER E INJETA NO BODY
  ─────────────────────────────────────────────────────────── */
  function criarDrawer() {
    if (document.getElementById("mobileNavOverlay")) return;

    // Monta os <li> a partir da config centralizada
    var itens = NAV_LINKS.map(function (link) {
      return '<li><a href="' + link.href + '">' + link.label + '</a></li>';
    }).join("\n          ");

    var overlay = document.createElement("div");
    overlay.id        = "mobileNavOverlay";
    overlay.className = "mobile-nav-overlay";

    overlay.innerHTML = '\
      <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>\
      <nav class="mobile-nav-drawer" id="mobileNavDrawer"\
           role="dialog" aria-modal="true" aria-label="Menu de navegação">\
        <button class="mobile-nav-close" id="mobileNavClose"\
                type="button" aria-label="Fechar menu">\
          <i class="fa-solid fa-xmark"></i>\
        </button>\
        <ul class="mobile-nav-links" id="mobileNavLinks">\
          ' + itens + '\
        </ul>\
        <div class="mobile-nav-auth">\
          <button class="btn-entrar-mobile" id="mobileAuthBtn" type="button">\
            ENTRAR\
          </button>\
        </div>\
      </nav>';

    document.body.appendChild(overlay);
  }


  /* ──────────────────────────────────────────────────────────
     2. ABRIR / FECHAR
  ─────────────────────────────────────────────────────────── */
  function abrirMenu() {
    var overlay = document.getElementById("mobileNavOverlay");
    if (!overlay) return;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function fecharMenu() {
    var overlay = document.getElementById("mobileNavOverlay");
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }


  /* ──────────────────────────────────────────────────────────
     3. MARCA O LINK ATIVO COM BASE NA URL ATUAL
     Compara o pathname da página com o href de cada link.
  ─────────────────────────────────────────────────────────── */
  function marcarAtivo() {
    var path = window.location.pathname;

    document.querySelectorAll("#mobileNavLinks a").forEach(function (a) {
      var href = a.getAttribute("href") || "";

      // Normaliza: remove .html e barras finais para comparar
      var hrefNorm = href.replace(/\.html$/, "").replace(/\/$/, "");
      var pathNorm = path.replace(/\.html$/, "").replace(/\/$/, "");

      // Caso especial: raiz do site
      var ehRaiz = (pathNorm === "" || pathNorm === "/index") && hrefNorm === "/index";

      var ehAtivo = ehRaiz || (hrefNorm !== "/index" && pathNorm.endsWith(hrefNorm.split("/").pop()));

      a.classList.toggle("active", ehAtivo);
    });
  }


  /* ──────────────────────────────────────────────────────────
     4. ATUALIZA O BOTÃO DO DRAWER (ENTRAR / SAIR)
     Lê o localStorage — mesma lógica usada pelo script.js.
  ─────────────────────────────────────────────────────────── */
  function atualizarBotaoAuth() {
    var btn = document.getElementById("mobileAuthBtn");
    if (!btn) return;

    var logado   = localStorage.getItem("usuarioLogado");
    var usuario  = null;

    try {
      var salvo = localStorage.getItem("usuarioCadastrado");
      usuario   = salvo ? JSON.parse(salvo) : null;
    } catch (e) {}

    if (logado && usuario) {
      btn.textContent = "SAIR";
      btn.dataset.acao = "sair";
    } else {
      btn.textContent = "ENTRAR";
      btn.dataset.acao = "entrar";
    }
  }


  /* ──────────────────────────────────────────────────────────
     5. EVENT LISTENERS — event delegation no document
     Garante funcionamento mesmo em elementos criados após
     o carregamento da página.
  ─────────────────────────────────────────────────────────── */
  function bindEventos() {

    // Abre ao clicar no hambúrguer
    document.addEventListener("click", function (e) {
      if (e.target.closest("#menuHamburger")) {
        e.stopPropagation();
        abrirMenu();
      }
    });

    // Fecha pelo botão ×
    document.addEventListener("click", function (e) {
      if (e.target.closest("#mobileNavClose")) {
        fecharMenu();
      }
    });

    // Fecha ao clicar no backdrop (fora do drawer)
    document.addEventListener("click", function (e) {
      if (e.target.id === "mobileNavBackdrop") {
        fecharMenu();
      }
    });

    // Fecha ao clicar em qualquer link
    document.addEventListener("click", function (e) {
      if (e.target.closest("#mobileNavLinks a")) {
        fecharMenu();
        // não previne o href — a navegação acontece normalmente
      }
    });

    // Botão ENTRAR / SAIR do drawer
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("#mobileAuthBtn");
      if (!btn) return;

      fecharMenu();

      if (btn.dataset.acao === "sair") {
        // Mesma lógica de logout do script.js
        setTimeout(function () {
          localStorage.removeItem("usuarioLogado");
          localStorage.removeItem("cursoSelecionado");
          window.location.href = "/index.html";
        }, 320);
        return;
      }

      // Login: tenta usar a função global do script.js ou dispara o botão original
      setTimeout(function () {
        if (typeof abrirModal === "function") {
          abrirModal();
        } else {
          var authBtn = document.getElementById("authButton");
          if (authBtn) authBtn.click();
        }
      }, 320);
    });

    // Fecha com Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharMenu();
    });
  }


  /* ──────────────────────────────────────────────────────────
     6. INIT
  ─────────────────────────────────────────────────────────── */
  function init() {
    criarDrawer();
    marcarAtivo();
    atualizarBotaoAuth();
    bindEventos();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
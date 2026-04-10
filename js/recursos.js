document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function () {

        const card = this.closest('.card');
        const titulo = card ? card.querySelector('h3')?.innerText : null;

        if (!titulo) {
            console.warn("Título não encontrado no card");
            return;
        }

        if (titulo === 'Simulador de Entrevista') {
            window.location.href = './entrevista.html';
            return;
        }

        if (titulo === 'Flashcards') {
            window.location.href = './flashcards.html';
            return;
        }

if (titulo === 'Podcasts Profissionais') {
    window.open(
        'https://open.spotify.com/playlist/1AgDd7JgdFijapvi8rMLob?si=50eb7a6c3e31461c',
        '_blank',
        'noopener,noreferrer'
    );
    return;
}
        alert(`Iniciando ação: ${titulo}`);
    });
});

// RECURSOS BLOQUEADO

document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuarioLogado");
  const overlay = document.getElementById("lockOverlay");

  if (!logado) {
    if (overlay) overlay.classList.remove("hidden");
  }
});

function irParaLogin() {
  window.location.href = "../index.html#login";
}

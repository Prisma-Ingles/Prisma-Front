document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function () {

        const card = this.closest('.card');
        const titulo = card ? card.querySelector('h3')?.innerText : null;

        if (!titulo) {
            console.warn("Título não encontrado no card");
            return;
        }

        // Redirecionar para simulador de entrevista
        if (titulo === 'Simulador de Entrevista') {
            window.location.href = './entrevista.html';
            return;
        }

        // Redirecionar para flashcards
        if (titulo === 'Flashcards') {
            window.location.href = './flashcards.html';
            return;
        }

        alert(`Iniciando ação: ${titulo}`);
    });
});
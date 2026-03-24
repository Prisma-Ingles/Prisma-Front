// BOTÕES DE AÇÃO DOS CARDS
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function () {

        const card = this.closest('.card');
        const titulo = card ? card.querySelector('h3')?.innerText : null;

        if (!titulo) {
            console.warn("Título não encontrado no card");
            return;
        }

        // Simulação de ação
        alert(`Iniciando ação: ${titulo}`);
    });
});
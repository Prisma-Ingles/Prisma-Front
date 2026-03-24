// Efeito simples de clique nos botões
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function() {
        const titulo = this.parentElement.querySelector('h3').innerText;
        alert('Iniciando download de: ' + titulo);
    });
});
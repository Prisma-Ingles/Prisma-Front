
const bloqueios = document.querySelectorAll('.seucertificado.seucertificadobloqueado');

bloqueios.forEach(bloqueio => {
  const imagem = bloqueio.querySelector('.conteudo img');
  
  if (imagem) {
    imagem.src = './certificados-fotos/icone-cadeado.png';
    imagem.style.width = '30px';
  }

});

bloqueios.forEach(bloqueio => {

const conclua = bloqueio.querySelector('h4');


  if(conclua){
    conclua.textContent = "conclua o curso para liberar.";
    conclua.style.fontWeight = '400';
    conclua.style.fontSize = '20px';
  }

});

bloqueios.forEach(bloqueio => {

const precoemicao = bloqueio.querySelector('p');


  if(precoemicao){
    precoemicao.textContent = "EMITIR POR R$30.00.";
    precoemicao.style.backgroundColor = 'black';
    precoemicao.style.color = 'white';
    precoemicao.style.margin = 'auto';
    precoemicao.style.padding = '10px';
    precoemicao.style.borderRadius = '20px';
  }

});
function getUsuario() {
  const logado = localStorage.getItem("usuarioLogado");

  if (!logado) return null;

  const usuarioSalvo = localStorage.getItem("usuarioCadastrado");
  return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

const usuario = getUsuario();

if (!usuario) {
  const certificados = document.querySelectorAll('.seucertificado');

  certificados.forEach(card => {
    card.classList.add('seucertificadobloqueado');

    const btnVisualizar = card.querySelector('.btn-certificado');
    if (btnVisualizar) {
      btnVisualizar.remove();
    }
  });
}

const bloqueios = document.querySelectorAll('.seucertificado.seucertificadobloqueado');

bloqueios.forEach(bloqueio => {
  const imagem = bloqueio.querySelector('.conteudo img');

  if (imagem) {
    imagem.src = '../img/certificados-fotos/icone-cadeado.png';
    imagem.style.width = '30px';
  }

});

bloqueios.forEach(bloqueio => {

const conclua = bloqueio.querySelector('h4');

  if(conclua){
    conclua.textContent = "Conclua o curso para liberar";
    conclua.style.fontWeight = '400';
    conclua.style.fontSize = '15px';
  }

});

bloqueios.forEach(bloqueio => {

const precoemicao = bloqueio.querySelector('p');

  if(precoemicao){
    precoemicao.remove();
  }

});

bloqueios.forEach(bloqueio => {
  const conteudo = bloqueio.querySelector('.conteudo');
  const botao = document.createElement('button');
  botao.textContent = 'EMITIR POR R$30,00';
  botao.type = 'button';
  botao.style.backgroundColor = 'black';
  botao.style.color = 'white';
  botao.style.fontSize = '12px';
  botao.style.margin = 'auto';
  botao.style.marginTop = '15px';
  botao.style.padding = '15px';
  botao.style.borderRadius = '25px';
  botao.style.border = 'none';
  botao.style.cursor = 'pointer';
  botao.style.fontFamily = "'Inter', sans-serif";
  botao.style.fontWeight = '600';
  botao.style.transition = 'all 0.3s ease';
  botao.style.width = 'fit-content';

  botao.onmouseover = function() {
    this.style.backgroundColor = '#333';
    this.style.transform = 'translateY(-2px)';
  };

  botao.onmouseout = function() {
    this.style.backgroundColor = 'black';
    this.style.transform = 'translateY(0)';
  };

  botao.onclick = function(e) {
    e.preventDefault();

    const usuario = getUsuario();

    if (!usuario) {
      alert("Você precisa criar uma conta ou fazer login para emitir o certificado.");
      window.location.href = "../index.html#login";
      return;
    }

    abrirModalPagamento();
  };

  conteudo.appendChild(botao);
});

function abrirModalCertificado() {
  const modal = document.getElementById('modal-certificado');
  modal.style.display = 'flex';
}

function fecharModalCertificado() {
  const modal = document.getElementById('modal-certificado');
  modal.style.display = 'none';
}

document.getElementById('modal-certificado').addEventListener('click', function(e) {
  if (e.target === this) fecharModal();
});

function abrirModalPagamento() {
  const modal = document.getElementById('paymentModalCert');
  modal.style.display = 'flex';
}

function fecharModalPagamento() {
  const modal = document.getElementById('paymentModalCert');
  modal.style.display = 'none';
}

const paymentCloseCert = document.getElementById('paymentCloseCert');
if (paymentCloseCert) {
  paymentCloseCert.addEventListener('click', fecharModalPagamento);
}

const paymentModalCert = document.getElementById('paymentModalCert');
if (paymentModalCert) {
  paymentModalCert.addEventListener('click', function(e) {
    if (e.target === this) fecharModalPagamento();
  });
}

const methodBtnsCert = document.querySelectorAll('#paymentBoxCert .method-btn');
methodBtnsCert.forEach(btn => {
  btn.addEventListener('click', function() {
    const method = this.getAttribute('data-method');

    methodBtnsCert.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const cardPaymentCert = document.getElementById('cardPaymentCert');
    const pixPaymentCert = document.getElementById('pixPaymentCert');

    if (cardPaymentCert) cardPaymentCert.classList.remove('active');
    if (pixPaymentCert) pixPaymentCert.classList.remove('active');

    if (method === 'card' && cardPaymentCert) {
      cardPaymentCert.classList.add('active');
    } else if (method === 'pix' && pixPaymentCert) {
      pixPaymentCert.classList.add('active');
    }
  });
});

const cardConfirmBtnCert = document.getElementById('cardConfirmBtnCert');
const pixConfirmBtnCert = document.getElementById('pixConfirmBtnCert');

if (cardConfirmBtnCert) {
  cardConfirmBtnCert.addEventListener('click', function() {
    alert('Pagamento de R$ 30,00 realizado com sucesso! Seu certificado será enviado em breve.');
    fecharModalPagamento();
  });
}

if (pixConfirmBtnCert) {
  pixConfirmBtnCert.addEventListener('click', function() {
    alert('Obrigado! Confirmamos o recebimento do seu pagamento. Seu certificado será enviado em breve.');
    fecharModalPagamento();
  });
}
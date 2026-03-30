const vlibrasDiv = document.createElement('div');
vlibrasDiv.setAttribute('vw', '');
vlibrasDiv.className = 'enabled';
vlibrasDiv.innerHTML = `
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
`;
document.body.appendChild(vlibrasDiv);

const script = document.createElement('script');
script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
document.head.appendChild(script);

script.onload = function() {
  new window.VLibras.Widget('https://vlibras.gov.br/app');
};
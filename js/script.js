const tabuleiro = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,1,2,1,2,1],
  [1,2,1,2,2,2,1,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,2,2,1,2,2,2,1,2,2,2,1,2,1],
  [1,1,1,2,1,2,1,1,1,2,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,1,2,1,2,1],
  [1,2,1,2,2,2,1,2,2,2,1,2,1,2,1],
  [1,2,1,2,1,1,1,2,1,2,1,2,1,2,1],
  [1,2,2,2,1,2,2,2,1,2,2,2,1,2,1],
  [1,2,1,1,1,2,1,1,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let posPacman = { linha: 7, coluna: 7 };
let rotPacman = 0;
let placar = 0;
const totalPontos = tabuleiro.flat().filter(valor => valor === 2).length;
const jogo = document.getElementById('jogo');

function desenhaTabuleiro() {
  jogo.innerHTML = '';
  for (let linha = 0; linha < tabuleiro.length; linha++) {
    for (let coluna = 0; coluna < tabuleiro[0].length; coluna++) {
      const celula = document.createElement('div');
      celula.className = 'celula';
      if (tabuleiro[linha][coluna] === 1) {
        celula.classList.add('parede');
      } else if (tabuleiro[linha][coluna] === 2) {
        celula.classList.add('ponto');
      }
      if (linha === posPacman.linha && coluna === posPacman.coluna) {
        celula.classList.add('pacman');
        celula.style.transform = `rotate(${rotPacman}deg)`;
      }
      jogo.appendChild(celula);
    }
  }
}

document.addEventListener('keydown', function(evento) {
  let novaLinha = posPacman.linha, novaColuna = posPacman.coluna;
  
  if (evento.key === 'ArrowUp') {
    novaLinha--;
    rotPacman = -90;
  } else if (evento.key === 'ArrowDown') {
    novaLinha++;
    rotPacman = 90;
  } else if (evento.key === 'ArrowLeft') {
    novaColuna--;
    rotPacman = 180;
  } else if (evento.key === 'ArrowRight') {
    novaColuna++;
    rotPacman = 0;
  } else {
    return;
  }
  
  if (novaLinha < 0 || novaLinha >= tabuleiro.length || novaColuna < 0 || novaColuna >= tabuleiro[0].length) return;
  if (tabuleiro[novaLinha][novaColuna] === 1) return;
  
  if (tabuleiro[novaLinha][novaColuna] === 2) {
    placar++;
    tabuleiro[novaLinha][novaColuna] = 0;
    if (placar === totalPontos) {
      setTimeout(() => alert('Você venceu!'), 10);
    }
  }
  
  posPacman.linha = novaLinha;
  posPacman.coluna = novaColuna;
  desenhaTabuleiro();
});

desenhaTabuleiro();

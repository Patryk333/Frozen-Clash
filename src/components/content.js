export { renderContent };

const tamaño = 15;

function renderContent() {
  let tablero = `
    <div class="board-wrapper" id="board-wrapper">
      <div class="board">
  `;

  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      tablero += `<div class="cell empty" data-x="${x}" data-y="${y}"><div class="inner"></div></div>`;
    }
  }

  tablero += `
      </div>
    </div>
  `;

  setTimeout(() => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => cambiarColor(cell));
  });
}, 0);

  return tablero;
  
}

function cambiarColor(cell) {
   if (!cell.classList.contains('empty')) {
    return;
  }
const x = parseInt(cell.getAttribute('data-x'));
const y = parseInt(cell.getAttribute('data-y'));



  cell.querySelector('.inner').style.backgroundColor = 'blue';
  cell.classList.remove('empty');
    
    const vecinas = [
    [0, -1], // arriba
    [0, 1],  // abajo
    [-1, 0], // izquierda
    [1, 0]   // derecha
  ];

  vecinas.forEach(([avanzarX,avanzarY]) => {
    const posicionX = x + avanzarX;
    const posicionY = y + avanzarY;

    if(posicionX >= 0 && posicionX < 15 && posicionY >= 0 && posicionY < 15 ){
      const celda = document.querySelector(`.cell[data-x="${posicionX}"][data-y="${posicionY}"]`);
      if (celda && celda.classList.contains('empty')) {
        celda.querySelector('.inner').style.backgroundColor = 'blue';
        celda.classList.remove('empty');
      }
    }
  })
}
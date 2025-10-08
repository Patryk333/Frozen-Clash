export { renderContent };

const tamaño = 15;
let jugador = Math.floor(Math.random() * 2) + 1;

let tableroEstado = Array.from({ length: tamaño }, () => Array(tamaño).fill(0));

function renderContent() {
  let tablero = `
    <h1 id="titulo">Turno del Jugador ${jugador}</h1>
    <div class="board-wrapper" id="board-wrapper">
      <div class="board">
  `;

  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      tablero += `<div class="celda vacia" data-x="${x}" data-y="${y}"><div class="inner"></div></div>`;
    }
  }

  tablero += `
      </div>
    </div>
  `;

  setTimeout(() => {
    const celdas = document.querySelectorAll(".celda");
    celdas.forEach((celda) => {
      celda.addEventListener("click", () => manejarClick(celda));
    });
    actualizarVista();
  }, 0);

  return tablero;
}

function manejarClick(celda) {
  const x = parseInt(celda.getAttribute("data-x"));
  const y = parseInt(celda.getAttribute("data-y"));

  if (tableroEstado[y][x] !== 0) return;

  tableroEstado[y][x] = jugador;

  const vecinas = [
    [0, -1], [0, 1], [-1, 0], [1, 0],
  ];

  vecinas.forEach(([avanzarX, avanzarY]) => {
    const posicionX = x + avanzarX;
    const posicionY = y + avanzarY;
    if (posicionX >= 0 && posicionX < tamaño && posicionY >= 0 && posicionY < tamaño) {
      tableroEstado[posicionY][posicionX] = jugador;
    }
  });

  jugador = jugador === 1 ? 2 : 1;

  actualizarVista();
}

function actualizarVista() {
document.querySelector("#titulo").textContent = `Turno del Jugador ${jugador}`;
  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      const celda = document.querySelector(`.celda[data-x="${x}"][data-y="${y}"]`);
      const inner = celda.querySelector(".inner");

      if (tableroEstado[y][x] === 1) {
        inner.style.backgroundColor = "blue";
        celda.classList.remove("vacia");
      } else if (tableroEstado[y][x] === 2) {
        inner.style.backgroundColor = "pink";
        celda.classList.remove("vacia");
      } else {
        inner.style.backgroundColor = "white";
        celda.classList.add("vacia");
      }
    }
  }
}
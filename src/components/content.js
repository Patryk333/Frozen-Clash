import { BehaviorSubject } from "rxjs";

export {
  renderContent,
  crearTableroHTML,
  manejarClick,
  actualizarDOM,
  comprobarJuego,
  comprobarGanador,
  reiniciarJuego
};

const tablero$ = new BehaviorSubject([]);
const jugador$ = new BehaviorSubject(1);

function renderContent() {
  const tamaño = 15;

  // Inicializar tablero y jugador
  tablero$.next(Array.from({ length: tamaño }, () => Array(tamaño).fill(0)));
  jugador$.next(Math.floor(Math.random() * 2) + 1);

  const contenedor = document.createElement("div");
  contenedor.innerHTML = `
    <h1 id="titulo">Turno del Jugador ${jugador$.getValue()}</h1>
    <div class="board-wrapper" id="board-wrapper">
      <div class="board">
        ${crearTableroHTML(tamaño)}
      </div>
    </div>
  `;

  // Función para agregar event listeners a las celdas
  const agregarEventListeners = () => {
    const celdas = contenedor.querySelectorAll(".celda");
    celdas.forEach((celda) => {
      celda.addEventListener("click", () => {
        const x = parseInt(celda.getAttribute("data-x"));
        const y = parseInt(celda.getAttribute("data-y"));
        const resultado = manejarClick(tablero$.getValue(), x, y, jugador$.getValue(), tamaño);
        tablero$.next(resultado.tablero);
        jugador$.next(resultado.jugador);
      });
    });
  };

  const reiniciar = () => {
    // Reiniciar el estado del juego
    const nuevoEstado = reiniciarJuego(tamaño);
    tablero$.next(nuevoEstado.tablero);
    jugador$.next(nuevoEstado.jugador);

    // Recrear el contenido del board-wrapper
    const boardWrapper = contenedor.querySelector("#board-wrapper");
    boardWrapper.innerHTML = `
      <div class="board">
        ${crearTableroHTML(tamaño)}
      </div>
    `;

    // Volver a agregar los event listeners a las nuevas celdas
    agregarEventListeners();

    // Forzar actualización del título
    contenedor.querySelector("#titulo").textContent = `Turno del Jugador ${jugador$.getValue()}`;
  };

  // Agregar event listeners inicialmente
  agregarEventListeners();

  // Subscribir al cambio de tablero y jugador para actualizar DOM
  const subscription = tablero$.subscribe((tablero) => {
    actualizarDOM(tablero, jugador$.getValue(), tamaño, contenedor, reiniciar);
  });
  const subscriptionJugador = jugador$.subscribe((jugador) => {
    actualizarDOM(tablero$.getValue(), jugador, tamaño, contenedor, reiniciar);
  });

  contenedor.cleanup = () => {
    subscription.unsubscribe();
    subscriptionJugador.unsubscribe();
  };

  return contenedor;
}

function crearTableroHTML(tamaño) {
  let html = "";
  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      html += `<div class="celda vacia" data-x="${x}" data-y="${y}"><div class="inner"></div></div>`;
    }
  }
  return html;
}

function manejarClick(tablero, x, y, jugadorActual, tamaño) {
  if (tablero[y][x] !== 0) return { tablero, jugador: jugadorActual };

  const nuevoTablero = tablero.map((fila) => [...fila]);
  nuevoTablero[y][x] = jugadorActual;

  const vecinas = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  vecinas.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < tamaño && ny >= 0 && ny < tamaño) {
      nuevoTablero[ny][nx] = jugadorActual;
    }
  });

  const siguienteJugador = jugadorActual === 1 ? 2 : 1;
  return { tablero: nuevoTablero, jugador: siguienteJugador };
}

function actualizarDOM(tablero, jugadorActual, tamaño, contenedor, onReiniciar) {
  const titulo = contenedor.querySelector("#titulo");
  if (titulo) {
    titulo.textContent = `Turno del Jugador ${jugadorActual}`;
  }

  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      const celda = contenedor.querySelector(`.celda[data-x="${x}"][data-y="${y}"]`);
      if (!celda) continue;
      
      const inner = celda.querySelector(".inner");
      if (!inner) continue;

      if (tablero[y][x] === 1) {
        inner.style.backgroundColor = "blue";
        celda.classList.remove("vacia");
      } else if (tablero[y][x] === 2) {
        inner.style.backgroundColor = "green";
        celda.classList.remove("vacia");
      } else {
        inner.style.backgroundColor = "white";
        celda.classList.add("vacia");
      }
    }
  }

  if (comprobarJuego(tablero)) {
    const { mensaje, stats } = comprobarGanador(tablero);
    const boardWrapper = contenedor.querySelector("#board-wrapper");
    if (boardWrapper) {
      boardWrapper.innerHTML = `
        <div class="mensaje-final">
          <h2>${mensaje}</h2>
          <p>${stats}</p>
          <button id="reiniciar">🔄 Jugar otra vez</button>
        </div>
      `;
      const tituloFinal = contenedor.querySelector("#titulo");
      if (tituloFinal) {
        tituloFinal.textContent = "Partida terminada";
      }
      const botonReiniciar = boardWrapper.querySelector("#reiniciar");
      if (botonReiniciar) {
        botonReiniciar.addEventListener("click", onReiniciar);
      }
    }
  }
}

function comprobarJuego(tablero) {
  return tablero.flat().every((celda) => celda !== 0);
}

function comprobarGanador(tablero) {
  let celdas1 = 0,
    celdas2 = 0;
  tablero.forEach((fila) =>
    fila.forEach((celda) => {
      if (celda === 1) celdas1++;
      else if (celda === 2) celdas2++;
    })
  );
  let mensaje =
    celdas1 > celdas2
      ? "🏆 ¡Ha ganado el Jugador 1 (azul)!"
      : celdas2 > celdas1
      ? "🏆 ¡Ha ganado el Jugador 2 (rosa)!"
      : "🤝 ¡Empate!";
  const stats = `Casillas Azules: ${celdas1} | Casillas Rosas: ${celdas2}`;
  return { mensaje, stats };
}

function reiniciarJuego(tamaño) {
  return {
    tablero: Array.from({ length: tamaño }, () => Array(tamaño).fill(0)),
    jugador: Math.floor(Math.random() * 2) + 1,
  };
}
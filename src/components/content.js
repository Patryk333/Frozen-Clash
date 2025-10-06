export { renderContent }

function renderContent() {
  const filas = 12;
  const columnas = 10;
  const anchoCelda = 40;
  const altoCelda = 40;

  const html = `
    <div class="container board-wrapper">
      <canvas id="boardCanvas" width="${columnas * anchoCelda}" height="${filas * altoCelda}"></canvas>
    </div>
  `;

  const app = document.getElementById('app');
  app.innerHTML = html;

  const canvas = document.getElementById('boardCanvas');
  const ctx = canvas.getContext('2d');
  const colorCelda = 'blue';

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      ctx.fillStyle = colorCelda;
      ctx.fillRect(j * anchoCelda, i * altoCelda, anchoCelda, altoCelda);

      ctx.strokeStyle = 'black';
      ctx.strokeRect(j * anchoCelda, i * altoCelda, anchoCelda, altoCelda);
    }
  }
}

export { renderContent };

const tamaño = 15;

function renderContent() {
  let html = `
    <div class="board-wrapper">
      <div class="board">
  `;

  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      html += `<div class="cell empty"><div class="inner"></div></div>`;
    }
  }

  html += `
      </div>
    </div>
  `;

  return html;
}

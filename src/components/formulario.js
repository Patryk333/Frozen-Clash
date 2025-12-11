export class FormularioComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container mt-5">
        <h2>Formulario de Datos</h2>
        <form id="userForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Tu nombre de usuario" required>
          </div>

          <div class="mb-3">
            <label for="fullName" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="fullName" placeholder="Tu nombre completo" required>
          </div>

          <div class="mb-3">
            <label for="avatarUrl" class="form-label">Avatar URL</label>
            <input type="file" class="form-control" id="avatarUrl" accept="image/*">
          </div>

          <img id="foto" style="width:200px;height:200px">
          <br><br>

          <button id="botonFormulario" type="submit" class="btn btn-primary">
            Registrar
          </button>
        </form>
      </div>
    `;

    const imagen = this.querySelector("#foto");
    const inputFoto = this.querySelector("#avatarUrl");

    inputFoto.addEventListener("change", () => {
      const file = inputFoto.files[0];
      const url = URL.createObjectURL(file);
      imagen.src = url;
    });

    import("../back/registrar.js");
  }
}

customElements.define("formulario-component", FormularioComponent);

export function renderFormulario() {
  return document.createElement("formulario-component");
}

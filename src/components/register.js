export class RegisterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container mt-5" style="max-width: 400px;">
        <h2 class="mb-4 text-center">Registro</h2>

        <form id="formRegistro">
          <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input class="form-control" id="email" type="email" placeholder="Introduce tu email">
          </div>

          <div class="mb-3">
            <label class="form-label" for="password">Contraseña</label>
            <input class="form-control" id="password" type="password" placeholder="Introduce tu contraseña">
          </div>

          <button id="registroBoton" type="submit" class="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
      </div>
    `;

    import("../back/registrar.js");
  }
}

customElements.define("register-component", RegisterComponent);

export function renderRegister() {
  return document.createElement("register-component");
}

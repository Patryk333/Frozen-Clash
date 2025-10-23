export function renderRegister() {
  const html = `
  <div class="container mt-5" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Registro</h2>
    <form id="formRegistro">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Introduce tu email">
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password" placeholder="Introduce tu contraseña">
      </div>

      <button id="registroBoton" type="submit" class="btn btn-primary w-100">Registrarse</button>
    </form>
  </div>
  `;

  setTimeout(() => {
    import("../back/registrar.js");
  }, 0);

  return html;
}

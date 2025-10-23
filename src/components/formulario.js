export {renderFormulario}

function renderFormulario(){
    const html = `
<div class="container mt-5">
  <h2>Formlario de Datos</h2>
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

    <button id="botonFormulario" type="submit" class="btn btn-primary">Registrar</button>
  </form>
</div>
`;
setTimeout(() => {
    import("../back/registrar.js");
  }, 0);
  return html;
}
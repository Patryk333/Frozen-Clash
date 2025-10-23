import { SUPABASE_KEY } from "./environment.js";

// -------------------- REGISTRO --------------------
export function attachRegisterListeners() {
  const boton = document.querySelector("#registroBoton");
  if (boton) {
    boton.addEventListener("click", async (e) => {
      e.preventDefault();

      const signUpObject = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };

      const response = await fetch(
        "https://sjfoftsghdknudqxefok.supabase.co/auth/v1/signup",
        {
          method: "POST",
          headers: {
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpObject),
        }
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("token", data.access_token);

      if (data.access_token) {
        alert("Usuario registrado correctamente. Revisa tu correo para confirmar.");
        window.location.hash = "#formulario";
      }
    });
  }
}

// -------------------- FORMULARIO DE PERFIL --------------------
export function attachProfileListeners() {
  const botonForm = document.querySelector("#botonFormulario");
  if (botonForm) {
    botonForm.addEventListener("click", async (e) => {
      e.preventDefault();

      const formObject = {
        username: document.querySelector("#username").value,
        full_name: document.querySelector("#fullName").value,
        avatar_url: "hola.jpg",
      };

      const id = localStorage.getItem("id");

      const response = await fetch(
        `https://sjfoftsghdknudqxefok.supabase.co/rest/v1/profiles?id=eq.${id}`,
        {
          method: "PATCH",
          headers: {
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(formObject),
        }
      );

      const data = await response.json();
      console.log("Perfil actualizado:", data);
    });
  }
}

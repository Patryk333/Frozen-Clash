import { SUPABASE_KEY } from "./environment.js";

// -------------------- REGISTRO --------------------
export function registro() {
  const boton = document.querySelector("#registroBoton");
  if (boton) {
    boton.addEventListener("click", async (e) => {
      e.preventDefault();

      const signUpObject = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };

      let headers = {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json",
      };
      const response = await hacerFetch(
        "https://sjfoftsghdknudqxefok.supabase.co/auth/v1/signup",
        "POST",
        headers,
        signUpObject
      );
      // const response = await fetch(
      //   "https://sjfoftsghdknudqxefok.supabase.co/auth/v1/signup",
      //   {
      //     method: "POST",
      //     headers: {
      //       "apikey": SUPABASE_KEY,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(signUpObject),
      //   }
      // );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("token", data.access_token);

      if (data.access_token) {
        alert(
          "Usuario registrado correctamente. Revisa tu correo para confirmar."
        );
        window.location.hash = "#formulario";
      }
    });
  }
}

// -------------------- FORMULARIO DE PERFIL --------------------
export function formulario() {
  const botonForm = document.querySelector("#botonFormulario");
  if (botonForm) {
    botonForm.addEventListener("click", async (e) => {
      e.preventDefault();

      const formObject = {
        username: document.querySelector("#username").value,
        full_name: document.querySelector("#fullName").value,
        avatar_url: document.querySelector("#foto").src
      };

      const id = localStorage.getItem("id");

      let headers = {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        Prefer: "return=representation",
      };
      const response = await hacerFetch(
        `https://sjfoftsghdknudqxefok.supabase.co/rest/v1/profiles?id=eq.${id}`,
        "PATCH",
        headers,
        formObject
      );
      // const response = await fetch(
      //   `https://sjfoftsghdknudqxefok.supabase.co/rest/v1/profiles?id=eq.${id}`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "apikey": SUPABASE_KEY,
      //       "Content-Type": "application/json",
      //       "Authorization": "Bearer " + localStorage.getItem("token")
      //     },
      //     body: JSON.stringify(formObject),
      //   }
      // );

      const data = await response.json();
      console.log(data)
      headers = {
        apiKey: SUPABASE_KEY,
        Authorization: "Bearer " + localStorage.getItem("token"),
        "x-upsert": true,
      };
      const response2 = await hacerFetchAvatar(data, headers, "POST");

      const data2 = await response2.json();
      console.log(data2)
      if (data.id) {
        alert(
          "Usuario registrado correctamente. Revisa tu correo para confirmar."
        );

      }
      console.log("Perfil actualizado:", data);
    });
  }
}

//----------------------LOGIN-----------------------------
export function login() {
  const botonLogin = document.querySelector("#botonLogin");
  if (botonLogin) {
    botonLogin.addEventListener("click", async (e) => {
      e.preventDefault();

      const loginObject = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };
      let headers = {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json",
      };
      const response = await hacerFetch(
        "https://sjfoftsghdknudqxefok.supabase.co/auth/v1/token?grant_type=password",
        "POST",
        headers,
        loginObject
      );
      /*const response = await fetch(
        "https://sjfoftsghdknudqxefok.supabase.co/auth/v1/token?grant_type=password",
        {
          method: "POST",
          headers: {
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginObject),
        }
      );*/
    });
  }
}

async function hacerFetch(url, metodo, headers, objeto) {
  const response = await fetch(url, {
    method: metodo,
    headers: headers,
    body: JSON.stringify(objeto),
  });

  return response;
}

async function hacerFetchAvatar(data, headers, metodo) {
  const inputFile = document.querySelector("#avatarUrl");
  const avatarFile = inputFile.files[0];

  const formImg = new FormData();
  formImg.append("avatar", avatarFile, avatarFile.name);

  const response = await fetch(
    `https://sjfoftsghdknudqxefok.supabase.co/storage/v1/object/avatars/${avatarFile.name}`,
    {
      method: metodo,
      headers: headers,
      body: formImg,
    }
  );
  return response;
}


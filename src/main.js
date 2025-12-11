import "./style.scss"
import { router } from "./router";
import * as bootstrap from 'bootstrap'

import { renderHeader } from "./components/renderHeader"
import { renderFooter } from "./components/renderFooter"
import { renderLogin } from "./components/login"

document.addEventListener("DOMContentLoaded", () => {
  const appDiv = document.querySelector('#app');
  const headerDiv = document.querySelector('#header');
  const footerDiv = document.querySelector('#footer');

  headerDiv.innerHTML = "";
  headerDiv.appendChild(renderHeader());

  appDiv.innerHTML = "";
  appDiv.appendChild(renderLogin());

  footerDiv.innerHTML = "";
  footerDiv.appendChild(renderFooter());

  router("#register", appDiv);

  window.addEventListener("hashchange", () => {
    router(window.location.hash, appDiv);
  });
});

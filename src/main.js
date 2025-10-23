import "./style.scss"
import { router } from "./router";

import * as bootstrap from 'bootstrap'

import { renderHeader } from "./components/header"
import { renderContent } from "./components/content";
import { renderFooter } from "./components/footer";
import { renderLogin } from "./components/login";

document.addEventListener("DOMContentLoaded",()=>{
  const appDiv = document.querySelector('#app');
  const headerDiv = document.querySelector('#header');
  const footerDiv = document.querySelector('#footer');

  headerDiv.innerHTML = renderHeader();
  appDiv.innerHTML = renderLogin();
  footerDiv.innerHTML = renderFooter();
  router("#register", appDiv);
  window.addEventListener("hashchange", () => {
    router(window.location.hash, appDiv);
  });
});
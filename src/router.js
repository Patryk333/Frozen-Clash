import { renderContent } from "./components/content";
import { renderFormulario } from "./components/formulario";
import { renderLogin } from "./components/login";
import { renderRegister } from "./components/register";
import { attachProfileListeners,attachRegisterListeners } from "./back/registrar";

export { router };

const routes = new Map([
    ['#', renderContent],
    ['#game', renderContent],
    ['#login', renderLogin],
    ['#register', renderRegister],
    ['#formulario', renderFormulario]
]);

function router(route, container){
    if(routes.has(route)){
        container.innerHTML = routes.get(route)();

        if(route === "#register") attachRegisterListeners();
        if(route === "#formulario") attachProfileListeners();
    }
    else {
        container.innerHTML = `<h2>404</h2>`;
    }
}

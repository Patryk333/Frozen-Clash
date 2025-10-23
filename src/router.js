import { renderContent } from "./components/content";
import { renderFormulario } from "./components/formulario";
import { renderLogin } from "./components/login";
import { renderRegister } from "./components/register";
import { registro,formulario,login } from "./back/registrar";

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

        if(route === "#register") registro();
        if(route === "#formulario") formulario();
        if(route === "#login") login();
    }
    else {
        container.innerHTML = `<h2>404</h2>`;
    }
}

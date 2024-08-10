import express from "express";
import routerBem from "./BemRoutes.js"
import routerInventario from "./InventarioRoutes.js"
import routerSala from "./SalaRoutes.js"
import routerUsuario from "./UsuariosRouter.js"


const routes = (app) => {
    app.use(
        express.json(),
        routerBem,
        routerInventario,
        routerSala,
        routerUsuario
    );
};

export default routes;
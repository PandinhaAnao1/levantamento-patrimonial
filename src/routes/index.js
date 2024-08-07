import express  from "express";
import routerBem from "./BemRoutes.js"
import routerInventario from "./InventarioRoutes.js"
import routerSala from "./SalaRoutes.js"
import routerConta from "./ContaRouter.js"


const routes = (app)=>{
    app.use(
        express.json(),
        routerBem,
        routerInventario,
        routerSala,
        routerConta
    );
};

export default routes;
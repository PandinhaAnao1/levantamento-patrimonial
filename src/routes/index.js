import express  from "express";
import routerBem from "./BemRoutes.js"
import routerBemAdicionados from "./BemAdicionadoRoutes.js"
import routerInventario from "./InventarioRoutes.js"
import routerSala from "./SalaRoutes.js"
import routerConta from "./ContaRouter.js"


const routes = (app)=>{
    app.use(
        express.json(),
        routerBem,
        routerBemAdicionados,
        routerInventario,
        routerSala,
        routerConta
    );
};

export default routes;
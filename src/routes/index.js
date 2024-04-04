import express  from "express";
import teste from "./listarTes.js"
import bem from "./systemBemRoutes.js"
import bemAdicionados from "./systemBemAdicionadoRoutes.js"
import inventario from "./systemInventarioRoutes.js"
import sala from "./systemSalaRoutes.js"


const routes = (app)=>{
    app.use(
        express.json(),
        teste,
        bem,
        bemAdicionados,
        inventario,
        sala
    );
};

export default routes;
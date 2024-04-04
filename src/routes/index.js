import express  from "express";
import teste from "./listarTes.js"
import inventario from "./systemInventarioRoutes.js"
const routes = (app)=>{
    app.use(
        express.json(),
        teste,
        inventario
    );
};

export default routes;
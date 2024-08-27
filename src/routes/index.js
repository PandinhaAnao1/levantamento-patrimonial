import express from "express";
import routerBem from "./BemRoutes.js"
import routerInventario from "./InventarioRoutes.js"
import routerSala from "./SalaRoutes.js"
import routerUsuario from "./UsuariosRouter.js"

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import getSwaggerOptions from "../docs/config/head.js";



const routes = (app) => {

    const swaggerDocs = swaggerJsDoc(getSwaggerOptions());
    app.use(swaggerUI.serve);
    app.get("/", (req, res, next) => {
        swaggerUI.setup(swaggerDocs)(req, res, next);
    });

    app.use(
        express.json(),
        routerBem,
        routerInventario,
        routerSala,
        routerUsuario
    );

    app.use((req, res, next) => {
        res.status(404).json({ message: "Rota não encontrada" });
    });

};

export default routes;
import express  from "express";
import teste from "./listarTes.js"
const routes = (app)=>{
    app.use(
        express.json(),
        teste
    );
};

export default routes;
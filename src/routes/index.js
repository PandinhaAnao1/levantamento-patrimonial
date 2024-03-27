import express  from "express";
import listarTest from "./listarTes.js"
const routes = (app)=>{
    app.use(
        express.json(),
        listarTest
    );
};

export default routes;
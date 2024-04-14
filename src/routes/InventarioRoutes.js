import express from "express";
import systemInventarioController from '../controllers/systemInventarioController.js'
const router = express.Router();

router
    .get("/inventario", systemInventarioController.listarInventarios) // Daniel criar a rota que buscar os inventarios
    .get("/sala/:idInventario", systemInventarioController.listarSalas) //busca todas as salas pertencentes a um inventario
    //.post("/inventario", systemInventarioController.criarInventario)


export default router;
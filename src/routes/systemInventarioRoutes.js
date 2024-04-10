import express from "express";
import systemInventarioController from '../controllers/systemInventarioController.js'
const router = express.Router();

router
    .get("/inventario", systemInventarioController.listarInventarios) // Daniel criar a rota que buscar os inventarios
    //.post("/inventario", systemInventarioController.criarInventario)

export default router;
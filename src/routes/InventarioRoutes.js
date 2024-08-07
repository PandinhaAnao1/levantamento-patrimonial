import express from "express";
import InventarioController from '../controllers/InventarioController.js'
const router = express.Router();

router
    .get("/inventarios", InventarioController.listarInventarios) // Daniel criar a rota que buscar os inventarios
    .get("/inventarios/:id/salas", InventarioController.listarSalas) //busca todas as salas pertencentes a um inventario
    //.post("/inventario", systemInventarioController.criarInventario)


export default router;
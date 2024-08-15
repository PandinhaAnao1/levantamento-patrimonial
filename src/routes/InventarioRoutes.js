import express from "express";
import InventarioController from '../controllers/InventarioController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
const router = express.Router();

router
    .get("/inventarios", AuthMiddleware, InventarioController.listarInventarios) 
    .get("/inventarios", AuthMiddleware, )
    //.post("/inventario", systemInventarioController.criarInventario)


export default router;
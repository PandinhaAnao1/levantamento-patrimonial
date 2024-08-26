import express from "express";
import InventarioController from '../controllers/InventarioController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
const router = express.Router();

router
    .get("/inventarios", AuthMiddleware, InventarioController.listarInventarios) 
    .get("/inventarios/:id", AuthMiddleware, InventarioController.listarInventarioPorId)
    .post("/inventarios",AuthMiddleware, InventarioController.criarInventario)
    .patch("/inventarios/:id",AuthMiddleware,InventarioController.atualizarInventario)


export default router;
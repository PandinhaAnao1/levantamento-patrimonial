import express from "express";
import InventarioController from '../controllers/InventarioController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
import multer from "multer";

const multerConfig = multer()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router
    .get("/inventarios", AuthMiddleware, InventarioController.listarInventarios) 
    .get("/inventarios/:id", AuthMiddleware, InventarioController.listarInventarioPorId)
    .post("/inventarios",AuthMiddleware, InventarioController.criarInventario)
    .post("/inventarios/csv", upload.single('file'), InventarioController.importCSV)
    .patch("/inventarios/:id",AuthMiddleware,InventarioController.atualizarInventario)


export default router;
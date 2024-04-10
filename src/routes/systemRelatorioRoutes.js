import express from "express";
import systemRelatorioController from '../controllers/systemRelatorioController.js'
const router = express.Router();

router
    .get("/relatorio", systemRelatorioController.gerarRelatorio) // Daniel criar a rota que buscar os inventarios


export default router;
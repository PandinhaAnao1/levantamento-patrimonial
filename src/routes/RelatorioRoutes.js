import express from "express";
import RelatorioController from '../controllers/RelatorioController.js'
const router = express.Router();

router
    .get("/relatorio", RelatorioController.gerarRelatorio) // Daniel criar a rota que buscar os inventarios


export default router;
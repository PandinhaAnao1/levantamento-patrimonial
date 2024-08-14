import express from "express";
import BemController from '../controllers/BemController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
const router = express.Router();

router
    .get("/bens", BemController.listarbens)
    .get("/bens/:id", BemController.listarPorId) // Busca os dados de um bem expecifico
    .post("/bens/auditar", BemController.auditarBem) // audita um bem
    .post("/bens/adicionar", BemController.adicionarBem) // Adiciona um bem a tabela bem adcicionados

export default router;
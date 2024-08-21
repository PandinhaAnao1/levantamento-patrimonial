import express from "express";
import BemController from '../controllers/BemController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';
const router = express.Router();

router
    .get("/bens", AuthMiddleware, BemController.listarbens)
    .get("/bens/:id", AuthMiddleware, BemController.listarPorId) // Busca os dados de um bem expecifico
    .post("/bens", AuthMiddleware, BemController.createBem) // cria um bem ser auditar ele
    .post("/bens/criar/auditar", AuthMiddleware, BemController.adicionarBem) // Adiciona um bem a tabela bem adcicionados
    .patch ("/bens/auditar", AuthMiddleware, BemController.auditarBem) // audita um bem

export default router;
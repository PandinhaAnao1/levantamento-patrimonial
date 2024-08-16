import express from "express";
import BemController from '../controllers/BemController.js'
const router = express.Router();

router
    .get("/bens", BemController.listarbens)
    .get("/bens/:id", BemController.listarPorId) // Busca os dados de um bem expecifico
    .post("/bens", BemController.createBem) // cria um bem ser auditar ele
    .post("/bens/criar/auditar", BemController.adicionarBem) // Adiciona um bem a tabela bem adcicionados
    .patch ("/bens/auditar", BemController.auditarBem) // audita um bem

export default router;
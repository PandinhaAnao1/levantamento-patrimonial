import express from "express";
import BemAdicionadoController from '../controllers/AdicionarBemController.js'
const router = express.Router();

router
    .post("/adicionarBem", BemAdicionadoController.adicionarBem) // Adiciona um bem a tabela bem adcicionados

export default router;
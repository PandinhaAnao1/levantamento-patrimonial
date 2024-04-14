import express from "express";
import BemAdicionadoController from '../controllers/BemAdicionadoController.js'
const router = express.Router();

router
    .post("/bemAdicionado", BemAdicionadoController.adicionarBem) // Adiciona um bem a tabela bem adcicionados

export default router;
import express from "express";
import systemBemAdicionadoController from '../controllers/systemBemAdicionadoController.js'
const router = express.Router();

router
    .post("/bemAdicionado", systemBemAdicionadoController.adicionarBem) // Adiciona um bem a tabela bem adcicionados

export default routes;
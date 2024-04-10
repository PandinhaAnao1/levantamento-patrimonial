import express from "express";
import systemContaController from '../controllers/systemContaController.js'
const router = express.Router();

router
    .get("/conta", systemContaController.listarContas) // lista todas as contas existentes
    .get("/conta/:id", systemContaController.listarPorId) // lista os dados de apenas uma conta
    .post("/conta", systemContaController.criarConta) // criar uma conta de usuario
    .patch("/conta", systemContaController.atualizarConta) // Atualiza os dados de uma conta

export default router;
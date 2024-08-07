import express from "express";
import ContaController from '../controllers/ContaController.js'
const router = express.Router();

router
    .get("/contas", ContaController.listarContas) // lista todas as contas existentes
    .get("/contas/:id", ContaController.listarPorId) // busca uma conta
    .post("/contas", ContaController.criarConta) // criar uma conta de usuario
    .patch("/contas", ContaController.atualizarConta) // Atualiza os dados de uma conta

export default router;
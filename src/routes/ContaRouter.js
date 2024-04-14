import express from "express";
import ContaController from '../controllers/ContaController.js'
const router = express.Router();

router
    .get("/conta", ContaController.listarContas) // lista todas as contas existentes
    .get("/conta/:id", ContaController.listarPorId) // lista os dados de apenas uma conta
    .post("/conta", ContaController.criarConta) // criar uma conta de usuario
    .patch("/conta", ContaController.atualizarConta) // Atualiza os dados de uma conta

export default router;
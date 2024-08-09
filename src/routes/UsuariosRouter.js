import express from "express";
import ContaController from '../controllers/ContaController.js'
const router = express.Router();

router
    .get("/usuario", ContaController.listarUsuarios) // lista todas as contas existentes
    .get("/usuario/:id", ContaController.listarUsuariosId) // busca uma conta
    .post("/usuario", ContaController.criarUsuario) // criar uma conta de usuario
    .patch("/usuario", ContaController.atualizarUsuario) // Atualiza os dados de uma conta

export default router;
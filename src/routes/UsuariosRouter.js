import express from "express";
import UsuarioController from '../controllers/UsuarioController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
const router = express.Router();

router
    .post("/login",UsuarioController.login)
    .get("/usuario", AuthMiddleware, UsuarioController.listarUsuarios) // lista todas as contas existentes
    .get("/usuario/:id", UsuarioController.listarUsuariosId) // busca uma conta
    .post("/usuario", UsuarioController.criarUsuario) // criar uma conta de usuario
    .patch("/usuario", UsuarioController.atualizarUsuario) // Atualiza os dados de uma conta

export default router;
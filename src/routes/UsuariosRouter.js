import express from "express";
import UsuarioController from '../controllers/UsuarioController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
const router = express.Router();

router
    .post("/login",UsuarioController.login)
    .get("/usuario", AuthMiddleware, UsuarioController.listarUsuario) // lista todas as contas existentes
    .get("/usuario/:id",AuthMiddleware, UsuarioController.listarUsuarioPorId) // busca uma conta
    .post("/usuario", AuthMiddleware, UsuarioController.criarUsuario) // criar uma conta de usuario
    .patch("/usuario/:id", AuthMiddleware, UsuarioController.atualizarUsuario) // Atualiza os dados de uma conta

export default router;
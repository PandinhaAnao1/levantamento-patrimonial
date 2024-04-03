import express from "express";
import systemSalaController from '../controllers/systemSalaController'
const router = express.Router();

router
    .get("sala/:idInvetario", systemSalaController.listarSalas) //busca todas as salas pertencentes a um inventario
    .get("sala/idSala", systemSalaController.listarbens) // busca todos os bem pertencentes a uma sala
    .patch("sala/:idbem", systemSalaController.auditarBem) // audita um bem

export default router;


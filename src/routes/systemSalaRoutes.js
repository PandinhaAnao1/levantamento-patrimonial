import express from "express";
import systemSalaController from '../controllers/systemSalaController.js'
const router = express.Router();

router
    .get("/sala/:idSala", systemSalaController.listarbens) // busca todos os bem pertencentes a uma sala
    .put("/sala/:idbem", systemSalaController.auditarBem) // audita um bem

export default router;


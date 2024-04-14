import express from "express";
import SalaController from '../controllers/SalaController.js'
const router = express.Router();

router
    .get("/sala/:idSala", SalaController.listarbens) // busca todos os bem pertencentes a uma sala
    .post("/sala/:idbem", SalaController.auditarBem) // audita um bem

export default router;


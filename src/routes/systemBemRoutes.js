import express from "express";
import systemBemController from '../controllers/systemBemController.js'
const router = express.Router();

router
    .get("/bem/:idBem", systemBemController.listarDados) // Busca os dados de um bem expecifico
    .post("/bem", systemBemController.auditarBem) // audita um bem

export default router;
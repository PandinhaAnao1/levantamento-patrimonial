import express from "express";
import systemBemController from '../controllers/systemBemController.js'
const router = express.Router();

router
    .get("/bem", systemBemController.listarDados) // Busca os dados de um bem expecifico
    .putch("/bem/:idBem", systemBemController.auditarBem) // audita um bem

export default router;
import express from "express";
import systemBemController from '../controllers/systemBemController'
const router = express.Router();

router
    .get("bem/:idBem", systemBemController.listarDados) // Busca os dados de um bem expecifico
    .putch("bem/:idBem", systemBemController.auditarBem) // audita um bem

export default router;
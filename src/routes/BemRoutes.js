import express from "express";
import BemController from '../controllers/BemController.js'
const router = express.Router();

router
    .get("/bem/:id", BemController.listarDados) // Busca os dados de um bem expecifico
    .post("/bem", BemController.auditarBem) // audita um bem

export default router;
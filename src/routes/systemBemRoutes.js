import express from "express";
const router = express.Router();

router
    .get("bem/:idBem") // Busca os dados de um bem expecifico
    .putch("bem/:idBem") // audita um bem

export default router;
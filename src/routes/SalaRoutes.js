import express from "express";
import SalaController from '../controllers/SalaController.js'
const router = express.Router();

router
    .get("/sala_bens/:id", SalaController.listarbens) // busca todos os bem pertencentes a uma sala

export default router;
import express from "express";
import SalaController from '../controllers/SalaController.js'
const router = express.Router();

router
    .get("/sala/", SalaController.listarSalas) 
    .get("/sala/:id", SalaController.listarSalasPorId) 
    .post("/sala/", SalaController.cadastrarSalas) 
    .patch("/sala/:id", SalaController.atualizarSalas) 

export default router;
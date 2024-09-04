import express from "express";
import CampusController from '../controllers/campusController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
const router = express.Router();

router
    .get("/campus", CampusController.listarCampus)
    .get("/campus/:id", CampusController.listarCampusPorId) 
    .post("/campus", CampusController.cadastrarCampus) 
    .patch("/campus/:id", CampusController.atualizarCampus) 

export default router;
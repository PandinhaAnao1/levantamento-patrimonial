import express from "express";
import systemSalaController from '../controllers/systemSalaController.js'
const router = express.Router();
router.get("/sala/:id", systemSalaController.listarbens) // busca todos os bem pertencentes a uma sala
// .put("/sala/:idbem", systemSalaController.auditarBem) // audita um bem

//.get("/sala/:idInvetario", systemSalaController.listarSalas) //busca todas as salas pertencentes a um inventario
export default router;


import express from "express";
const router = express.Router();

router
    .get("sala/:idInvetario") //busca todas as salas pertencentes a um inventario
    .get("sala/idSala") // busca todos os bem pertencentes a uma sala
    .patch("sala/:idbem") // audita um bem

export default router


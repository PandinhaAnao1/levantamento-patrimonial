import { prisma } from "../configs/prismaClient.js";

class InventarioRepository {


  static async listarInventarios(filtro) {
    return await prisma.inventarios.findMany(filtro);
  }

  static async contarInventarios(filtro) {
    return await prisma.inventarios.count(filtro);
  }

  static async listarPorId(filtro) {
    return await prisma.salas.findMany(filtro);
  }
}

export default InventarioRepository;



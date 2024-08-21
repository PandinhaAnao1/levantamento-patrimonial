import { prisma } from "../configs/prismaClient.js";

class InventarioRepository {


  static async listarInventario(filtro) {
    return await prisma.inventario.findMany(filtro);
  }

  static async contarInventario(filtro) {
    return await prisma.inventario.count(filtro);
  }

  static async listarPorId(filtro) {
    return await prisma.inventario.findUnique(filtro);
  }

  static async criar(inventario) {
    return await prisma.inventario.create(inventario);
  }

  static async atualizar(inventario) {
    return await prisma.inventario.update(inventario);
  }

}

export default InventarioRepository;



import { prisma } from "../configs/prismaClient.js";

class InventarioRepository {

  static async listarSalas(){
    return await prisma.sala.findMany({
      select: {
        nome:true,
        id:true
      }
    });
  }

  static async createSala(insert){
    return await prisma.sala.create(insert);
  }

  static async insertBens(insert){
    return await prisma.bem.createMany(insert);
  }

  static async listar(filtro) {
    return await prisma.inventario.findMany(filtro);
  }

  static async contar(filtro) {
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



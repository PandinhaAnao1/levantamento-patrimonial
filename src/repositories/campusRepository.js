import { prisma } from "../configs/prismaClient.js"

class CampusRepository{
    static async listar(filtros){
        return await prisma.campus.findMany(filtros);
    }
    
    static async listarPorId(filtros) {
        return await prisma.campus.findFirst(filtros)
    }

    static async criar(filtros){
      return await prisma.campus.create(criarConta);
    }

    static async atualizar(filtros){
      return await prisma.campus.update(atualizarcampus);
    }


}





export default CampusRepository
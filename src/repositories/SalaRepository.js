import { prisma } from "../configs/prismaClient.js"

class SalaRepository{

    static async findById(filtro){
        return await prisma.itens.findMany(filtro)
    }
}

export default SalaRepository;
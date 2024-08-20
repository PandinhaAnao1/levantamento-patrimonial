import { prisma } from "../configs/prismaClient.js"

class SalaRepository{

    static async listarSalas(filtro){
        return await prisma.salas.findMany(filtro);
    }
}

export default SalaRepository;
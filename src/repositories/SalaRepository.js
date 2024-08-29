import { prisma } from "../configs/prismaClient.js"

class SalaRepository{

    static async filtrar(filtro){
        return await prisma.sala.findMany(filtro)
    }
    static async filtrarPorId(filtro){
        return await prisma.sala.findFirst(filtro)
    }
    static async cadastrar(filtro){
        return await prisma.sala.create(filtro)
    }
    static async atualizar(filtro){
        return await prisma.sala.update(filtro)
    }
    
}

export default SalaRepository;
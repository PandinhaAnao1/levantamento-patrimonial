import { prisma } from "../configs/prismaClient.js"

class inventarioRepository{

    async findAll(filtro){
        return await prisma.inventarios.findMany(filtro);

    }

    async findById(filtro){
        return await prisma.sala.findMany(filtro)

    }

}


export default new inventarioRepository()



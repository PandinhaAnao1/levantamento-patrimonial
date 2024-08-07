import {prisma} from '../configs/prismaClient.js'

class salaRepository{

    async findById(filtro){
        return await prisma.itens.findMany(filtro)
    }
}

export default new salaRepository()
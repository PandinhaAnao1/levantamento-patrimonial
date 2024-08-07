import { prisma } from "../configs/prismaClient.js"

class BemRepository{

    async findById(filtro){
        return await prisma.itens.findFirst(filtro)
    }

    async createBem(data){
        await prisma.item_adicionado.create(data);
    }

    async createHistorico(data){
        await prisma.historico.create(data)
    }
}

export default new BemRepository()
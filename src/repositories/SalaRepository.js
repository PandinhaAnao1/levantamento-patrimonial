class salaRepository{

    async findById(filtro){
        return await prisma.itens.findMany(filtro)
    }
}

export default new salaRepository()
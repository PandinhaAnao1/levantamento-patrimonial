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

    static createFilterSala(parametros){
        let filtro = {
            where: {
                ...(parametros.id && { id: parametros.id }),
                ...(parametros.inventario_id && { bem: {some:{ inventario_id: parametros.inventario_id }}}),
                ...(parametros.nome && { nome: {contains: parametros.nome }}),

            },select:{
              id:true,
              nome:true,
            }
        }
        return filtro;
      }
    
}

export default SalaRepository;
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
                ...(parametros.campus_id && { campus_id: parametros.campus_id }),
                ...(parametros.nome && { nome: {contains: parametros.nome }}),

            },select:{
              id:true,
              nome:true,
              campus_id:true
            }
        }
        return filtro;
      }
    
}

export default SalaRepository;
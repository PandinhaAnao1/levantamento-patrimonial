import { prisma } from "../configs/prismaClient.js"

class CampusRepository{
    static async listar(filtros){
        return await prisma.campus.findMany(filtros);
    }
    
    static async listarPorId(filtros) {
        return await prisma.campus.findFirst(filtros)
    }

    static async criar(filtros){
      return await prisma.campus.findFirst(filtros);
    }

    static async atualizar(filtros){
      return await prisma.campus.update(atualizarcampus);
    }

    static createFilterCampus(parametros){
      let filtro = {
          where: {
              ...(parametros.cidade && { cidade: {contains: parametros.cidade }}),
              ...(parametros.telefone && { telefone: parametros.telefone }),
              ...(parametros.nome && { nome: {contains: parametros.nome }}),
              ...(parametros.id && { id: parametros.id }),
              ...(parametros.bairro && { bairro: {contains: parametros.bairro }}),
              ...(parametros.rua && { rua: {contains: parametros.rua }}),
              ...(parametros.numoro_residencia && { numoro_residencia: {contains: parametros.numoro_residencia }}),




          },
          select:{
            id:true,
            cidade:true,
            telefone:true,
            nome:true,
            bairro:true,
            rua:true,
            numoro_residencia:true

          }
      }
      return filtro;

    }
}





export default CampusRepository
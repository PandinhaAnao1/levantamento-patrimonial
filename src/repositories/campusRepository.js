import { prisma } from "../configs/prismaClient.js"

class CampusRepository{
    static async listar(filtros){
        return await prisma.campus.findMany(filtros);
    }
    
    static async listarPorId(filtros) {
        return await prisma.campus.findFirst(filtros)
    }

    static async criar(filtros){
      return await prisma.campus.create(filtros);
    }

     
      static async buscarPorId(id) {
          return await prisma.campus.findUnique({
              where: { id: id }
          });
      }
  
      static async atualizar(atualizacao) {
          return await prisma.campus.update(atualizacao);
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
              ...(parametros.numero_residencial && { numero_residencial: {contains: parametros.numero_residencial }}),




          },
          select:{
            id:true,
            cidade:true,
            telefone:true,
            nome:true,
            bairro:true,
            rua:true,
            numero_residencial:true

          }
      }
      return filtro;

    }
}





export default CampusRepository
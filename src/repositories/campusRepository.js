import { prisma } from "../configs/prismaClient.js"

class CampusRepository{
    static async listar(filtros){
        return await prisma.campus.findMany(filtros);
    }
    
    static async listarPorId(filtros) {
        return await prisma.campus.findFirst(filtros)
    }

    static async criar(filtros){
      return await prisma.campus.create(criarConta);
    }

    static async atualizar(filtros){
      return await prisma.campus.update(atualizarcampus);
    }

    static createFilterUsuario(parametros){
      let filtro = {
          where: {
              ...(parametros.cidade && { cidade: {contains: parametros.cidade }}),
              ...(parametros.telefone && { telefone: parametros.telefone }),
              ...(parametros.nome && { nome: {contains: parametros.nome }}),
              ...(parametros.id && { id: parametros.id }),
              ...(parametros.bairro && { bairro: {contains: parametros.bairro }}),
              ...(parametros.rua && { rua: {contains: parametros.rua }}),
              ...(parametros.numero && { numero: {contains: parametros.numero }}),




          },select:{
            id:true,
            senha:false,
            nome:true,
            rua:true,
            bairro:true,
            telefone:true,
            numero:true,
            cidade:true


          }
      }
      return filtro;

    }
}





export default CampusRepository
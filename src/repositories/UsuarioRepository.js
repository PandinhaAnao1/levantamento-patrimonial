import { prisma } from "../configs/prismaClient.js"

class UsuarioRepository{

    static async login(filtro){
        /**
         * Função que ira procurar se o usuário exite dentro
         * do banco para poder realizar login na plataforma.
         *
         * @param {Object} filtro objeto com os filtros do prisma para encontrar o usuario.
         *
         * @return {Object} O retorno é um objeto do tipo prisma.
         */
        return await prisma.usuario.findUnique(filtro)
    }

    static async listarUsuarios(filtros){
        return await prisma.usuario.findMany(filtros);
    }
    
    static async listarUsuarioPorId(filtros) {
        return await prisma.usuario.findFirst(filtros)
    }

    static async criarUsuario(criarConta){
      return await prisma.usuario.findFirst(criarConta);
    }

    static async atualizar(atualizarUsuario){
      return await prisma.usuario.update(atualizarUsuario);
    }

    static async usuarioCadastrado(usuario_id){
      return await prisma.usuario.findFirst({
          where:{
              id: usuario_id
          },
          select:{
              id: true
          }
      })
    }

    static createFilterUsuario(parametros){
      let filtro = {
          where: {
              ...(parametros.status != undefined && { status: parametros.status }),
              ...(parametros.email && { email: {contains: parametros.email }}),
              ...(parametros.funcao && { funcao: parametros.funcao }),
              ...(parametros.nome && { nome: {contains: parametros.nome }}),
              ...(parametros.id && { id: parametros.id }),
          },select:{
            id:true,
            senha:false,
            nome:true,
            funcao:true,
            status:true,
            email:true}
      }
      return filtro;
    }

    static async userExist(email){
      return await prisma.usuario.findFirst({
          where:{
              email: email
          },
          select:{
              id: true
          }
      })
    }
}



export default UsuarioRepository
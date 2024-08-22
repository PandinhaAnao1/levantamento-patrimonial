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
        return await prisma.usuario.findFirst(filtros);
    }


    static async criarUsuario(criarConta){
      return await prisma.usuario.create(criarConta);
    }

}



export default UsuarioRepository
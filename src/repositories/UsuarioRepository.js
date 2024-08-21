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
        return await prisma.usuarios.findMany(filtros);
      }
    
    static async listarUsuarioPorId(filtros) {
        return await prisma.usuarios.findFirst(filtros);
    }


    static async criarUsuario(nome,email,senha){
      return await prisma.usuarios.create({
        usua_nome,
        usua_senha,
        usua_senha
      })
    }

}



export default UsuarioRepository
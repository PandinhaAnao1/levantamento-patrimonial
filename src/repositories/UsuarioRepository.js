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

    static async listarusuario(){
        return await prisma.usuario.findMany({
          select: {
            usua_id: true,
            usua_email: true,
            usua_senha: true,
            usua_funcao: true,
            usua_status: true,
            usua_nome: true,
          },
        });
      }
    
    static async listarUsuarioPorId(id) {
        return await prisma.usuario.findFirst({
          select: {
            usua_id: true,
            usua_email: true,
            usua_senha: true,
            usua_funcao: true,
            usua_status: true,
            usua_nome: true,
          },
          where: {
                usua_id: id,
                },
            }
        );
    }

}



export default UsuarioRepository
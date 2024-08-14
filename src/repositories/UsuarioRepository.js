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
        return await prisma.usuarios.findUnique(filtro)
    }

}

export default UsuarioRepository
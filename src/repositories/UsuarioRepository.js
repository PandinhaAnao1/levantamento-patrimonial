import { prisma } from "../configs/prismaClient.js"

class UsuarioRepository{

    static async login(credenciais){
        /**
         * Função que ira procurar se o usuário exite dentro
         * do banco para poder realizar login na plataforma.
         *
         * @param {String}   email   email é a credencial de identificação do usuário.
         * @param {String}   senha   senha é o segredo o usuário, ela deve vim criptografada.
         *
         * @return {Object} O retorno é um objeto do tipo prisma.
         */
        const {email, senhaHash} = credenciais
        return await prisma.usuario.findUnique({
            where: {
                usua_email: email,
                usua_senha: senhaHash,
            },
        })
    }

}

export default UsuarioRepository
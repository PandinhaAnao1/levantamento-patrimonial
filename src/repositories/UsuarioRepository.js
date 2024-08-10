import { prisma } from "../configs/prismaClient.js"

class UsuarioRepository{

    async login(filtro){
        return await prisma.usuario.findFirst(filtro)
    }


}

export default new UsuarioRepository()
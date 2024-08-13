import { prisma } from "../configs/prismaClient.js";

class contaRepository {
  async findFirst(id) {
    return await prisma.usuarios.findFirst({
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
    });
  }

  async findMany(){
    return await prisma.usuarios.findMany({
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


  

}


export default new contaRepository();

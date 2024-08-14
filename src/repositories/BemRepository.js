import { prisma } from "../configs/prismaClient.js"

class BemRepository{

    static async findAll(filtro){
        return await prisma.bens.findMany(filtro);
    }

    static async findById(filtro){
        return await prisma.bens.findUnique(filtro);
    }

    static async createBem(data){
        await prisma.bens.create(data);
    }

    static async createHistorico(data){
        await prisma.historico.create(data)
    }

    static createFilter(parametros){
        let filtro = {
            where: {
                ...(parametros.sala_id && { bens_sala_id: parametros.sala_id }),
                ...(parametros.bens_id && { bens_id: parametros.bens_id })
            },
            select: {
                bens_id:true,
                bens_sala_id:true,
                bens_nome:true,
                bens_tombo:true,
                bens_responsavel:true,
                bens_decricao:true,
                bens_valor:true,
                bens_estado:true,
                bens_ocioso:true,
                bens_encontrado:true,
            }
        }
        return filtro;
    }

    static async userExist(usua_id){
        return await prisma.usuarios.findFirst({
            where:{
                usua_id: usua_id
            },
            select:{
                usua_id: true
            }
        })
    }

    static async salaExist(sala_id){
        return await prisma.salas.findFirst({
            where:{
                sala_id: sala_id
            },
            select:{
                sala_id:true
            }
        })
    }

    static async inventarioExist(inve_id){
        return await prisma.inventarios.findFirst({
            where:{
                inve_id: inve_id
            },
            select:{
                inve_id:true
            }
        })
    }
}



export default BemRepository;
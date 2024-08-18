import { prisma } from "../configs/prismaClient.js"

class BemRepository{

    async findAll(filtro){
        return await prisma.bens.findMany(filtro);
    }

    async findById(filtro){
        return await prisma.bens.findUnique(filtro);
    }

    async createBem(data){
        return await prisma.bens.create(data);
    }

    async createHistorico(data){
        return await prisma.historico.create(data)
    }

    async updataBem(data){
        return await prisma.bens.update(data)
    }

    createFilter(parametros){
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

    async userExist(usua_id){
        return await prisma.usuarios.findFirst({
            where:{
                usua_id: usua_id
            },
            select:{
                usua_id: true
            }
        })
    }

    async getIds(bem_id){
        return await prisma.bens.findFirst({
            where: {
                bens_id: bem_id
            },
            select: {
                bens_sala_id: true,
                salas: {
                    select: {
                    sala_inve_id: true
                    }
                }
            }
        });
    }

    async salaExist(sala_id){
        return await prisma.salas.findFirst({
            where:{
                sala_id: sala_id
            },
            select:{
                sala_id:true
            }
        })
    }

    async inventarioExist(inve_id){
        return await prisma.inventarios.findFirst({
            where:{
                inve_id: inve_id
            },
            select:{
                inve_id:true
            }
        })
    }

    async bemJaFoiAuditado(bens_id){
        return await prisma.historico.findFirst({
            where:{
                hist_bens_id: bens_id
            },
            select:{
                hist_id:true
            }
        })
    }
}



export default new BemRepository();
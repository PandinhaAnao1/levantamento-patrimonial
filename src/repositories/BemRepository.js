import { prisma } from "../configs/prismaClient.js"

class BemRepository{

    async findAll(filtro){
        return await prisma.bem.findMany(filtro);
    }

    async findById(filtro){
        return await prisma.bem.findUnique(filtro);
    }

    async createBem(data){
        return await prisma.bem.create(data);
    }

    async createLevantamento(data){
        return await prisma.levantamento.create(data)
    }

    createFilter(parametros){
        let filtro = {
            where: {
                ...(parametros.sala_id && { sala_id: parametros.sala_id }),
                ...(parametros.inventario_id && { inventario_id: parametros.inventario_id }),
                ...(parametros.bem_id && { id: parametros.bem_id }),
                ...(parametros.nome && { nome: {contains: parametros.nome }}),
                ...(parametros.tombo && { tombo: parametros.tombo }),
                ...(parametros.responsavel && { responsavel: {contains: parametros.responsavel} }),
                ...(parametros.descricao && { descricao: {contains: parametros.descricao} }),
                ...(parametros.auditado && { auditado: parametros.auditado}),
            },
            select: {
                id:true,
                sala_id:true,
                inventario_id: true,
                nome:true,
                tombo:true,
                responsavel:true,
                descricao:true,
                auditado:true,
                valor:true,
            }
        }
        return filtro;
    }

    async userExist(usuario_id){
        return await prisma.usuario.findFirst({
            where:{
                id: usuario_id
            },
            select:{
                id: true
            }
        })
    }

    async getIds(bem_id){
        return await prisma.bem.findFirst({
            where: {
                id: bem_id
            },
            select: {
                inventario_id: true,
            }
        });
    }

    async salaExist(sala_id){
        return await prisma.sala.findFirst({
            where:{
                id: sala_id
            },
            select:{
                id:true
            }
        })
    }

    async inventarioExist(inventario_id){
        return await prisma.inventario.findFirst({
            where:{
                id: inventario_id
            },
            select:{
                id:true
            }
        })
    }

    async bemJaFoiAuditado(bem_id){
        return await prisma.levantamento.findFirst({
            where:{
                bem_id: bem_id
            },
            select:{
                id:true
            }
        })
    }
}



export default new BemRepository();
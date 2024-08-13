import { prisma } from "../configs/prismaClient.js"

class BemRepository{

    async findById(id){
        return await prisma.erp_pessoa_fornecedor.findUnique({
            where: { id },
            select: {
                bens_nome:true,
                bens_id:true,
                bens_tombo:true,
                bens_responsavel:true
                //  bens_decri__o:true,
            }
          });
        // return await prisma.bens.findFirst(filtro);
    }

    async findAll(filtro){
        return await prisma.bens.findMany(filtro);
    }

    async createBem(data){
        await prisma.item_adicionado.create(data);
    }

    async createHistorico(data){
        await prisma.historico.create(data)
    }

    createFilter(sala_id){
        let filtro = {
            where: {
                ...(sala_id && { bens_sala_id: sala_id }) // Adiciona o filtro se sala_id estiver presente
            },
            select: {
                bens_nome:true,
                bens_id:true,
                bens_tombo:true,
                bens_responsavel:true
                //  bens_decri__o:true,
            }
        }

        // if (nome) filtro.where.name = { contains: nome };
        // if (email) filtro.where.email = { contains: email };
        // if (sala_id) filtro.where.bens_sala_id = {equals : sala_id };
        console.log(filtro)
        return filtro;
    }
}

export default new BemRepository()
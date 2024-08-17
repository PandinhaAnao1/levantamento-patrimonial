import BemRepository from "../repositories/BemRepository.js"
import bemSchema from "../shemas/bemSchema.js";

class BemService{

    async listar(parametros){

        const schema = new bemSchema().listarSchema()
        parametros = schema.parse(parametros)

        const filtro = BemRepository.createFilter(parametros)
        const bens =  await BemRepository.findAll(filtro)
        if(bens.length == 0){
            throw new Error("Nem um registro encontrado");
        }
        return bens
    }

    async listarPorId(parametros){
        const schema = new bemSchema().listarPorIdSchema()
        parametros = schema.parse(parametros)

        const filtro = BemRepository.createFilter(parametros)
        const bem = await BemRepository.findById(filtro)

        if(!bem){
            throw new Error("Nem um registro encontrado");
        }
        return bem
    }

    async create(parametros){

        const schema = new bemSchema().createBensSchema()
        parametros = schema.parse(parametros)
        
        const salaExists = await BemRepository.salaExist(parametros.sala_id)

        if(!salaExists){
            throw new Error("O sala_id informado não existem");
        }
        
        const { sala_id, ...camposInsert } = parametros;
        const insertbem = {salas:{connect: { sala_id: sala_id }}, ...camposInsert };


        const bem =  await BemRepository.createBem({
            data: insertbem, 
            select: BemRepository.createFilter({}).select
        })

        return bem
    }

    async adicionarBem(parametros){

        const schema = new bemSchema().adicionarBemSchema()
        parametros = schema.parse(parametros)

        const usuarioExists = await BemRepository.userExist(parametros.usua_id)

        const salaExists = await BemRepository.salaExist(parametros.sala_id)

        const inventarioExists = await BemRepository.inventarioExist(parametros.inve_id)

        if(!usuarioExists || !salaExists || !inventarioExists){
            throw new Error("usuario, sala ou inventário não existem");
        }
        
        const { usua_id, inve_id, sala_id, ...camposInsert } = parametros;
        const insertbem = {salas:{connect: { sala_id: sala_id }}, ...camposInsert };


        const bem =  await BemRepository.createBem({
            data: insertbem, 
            select: BemRepository.createFilter({}).select
        })

        const historico = await BemRepository.createHistorico({
            data: {
                hist_usuarios_id: usua_id,
                hist_inventarios_id: inve_id,
                hist_salas_id: sala_id,
                hist_bens_id: bem.bens_id
            },
            select: {
                hist_id: true,
                hist_usuarios_id: true,
                hist_inventarios_id: true,
                hist_salas_id: true,
                hist_bens_id: true
            }

        })

        return {historico: historico, bem: bem}
    }

    async auditarBem(parametros){

        const schema = new bemSchema().auditarBemSchema()
        parametros = schema.parse(parametros)
                        
        const usuarioExists = await BemRepository.userExist(parametros.usua_id)

        const auditadoExists = await BemRepository.bemJaFoiAuditado(parametros.bens_id)

        const idsSalaInventario = await BemRepository.getIds(parametros.bens_id)

        if(!idsSalaInventario){
            throw new Error("bem inforamdo não existe");
        }

        const { bens_sala_id, salas } = idsSalaInventario;
        const sala_inve_id = salas.sala_inve_id;

        if(!usuarioExists){
            throw new Error("Usuario não existem");
        }

        if(bens_sala_id != parametros.sala_id || sala_inve_id != parametros.inve_id){
            throw new Error("O Bem não pertence a sala ou inventário informado");
        }

        if(auditadoExists){
            throw new Error("Bem já foi auditado.");
        }

        const { usua_id, inve_id, sala_id, bens_id, ...camposInsert } = parametros;

        await BemRepository.updataBem({
            where: {bens_id: bens_id},
            data: camposInsert,
        })

        const historico = await BemRepository.createHistorico({
            data: {
                hist_usuarios_id: usua_id,
                hist_inventarios_id: inve_id,
                hist_salas_id: sala_id,
                hist_bens_id: bens_id
            },
            select: {
                hist_id: true,
                hist_usuarios_id: true,
                hist_inventarios_id: true,
                hist_salas_id: true,
                hist_bens_id: true
            }
        })

        const filtro = BemRepository.createFilter({bens_id: bens_id})
        const bens =  await BemRepository.findById(filtro)

        return {historico: historico, bem: bens}


    }

}

export default new BemService();
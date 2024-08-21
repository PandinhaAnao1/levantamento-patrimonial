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
        
        const { sala_id, inventario_id, ...camposInsert } = parametros;
        const insertbem = {
            sala: { connect: { id: sala_id } },
            inventario: { connect: { id: inventario_id } },
            ...camposInsert
        };

        const bem =  await BemRepository.createBem({
            data: insertbem, 
            select: BemRepository.createFilter({}).select
        })

        return bem
    }

    async adicionarBem(parametros){

        const schema = new bemSchema().adicionarBemSchema()
        parametros = schema.parse(parametros)

        const usuarioExists = await BemRepository.userExist(parametros.usuario_id)

        const salaExists = await BemRepository.salaExist(parametros.sala_id)

        const inventarioExists = await BemRepository.inventarioExist(parametros.inventario_id)

        if(!usuarioExists || !salaExists || !inventarioExists){
            throw new Error("usuario, sala ou inventário não existem");
        }

        const { usuario_id, inventario_id, sala_id, nome, descricao, ...camposInsert } = parametros;
        const insertbem = {
            sala: { connect: { id: sala_id } },
            inventario: { connect: { id: inventario_id } },
            nome: nome,
            descricao: descricao
        };

        const bem =  await BemRepository.createBem({
            data: insertbem, 
            select: BemRepository.createFilter({}).select
        })

        const historico = await BemRepository.createHistorico({
            data: {
                usuario_id: usuario_id,
                inventario_id: inventario_id,
                sala_id: sala_id,
                bem_id: bem.id,
                data: new Date(),
                ...camposInsert
            },
            select: {
                id: true,
                usuario_id: true,
                inventario_id: true,
                sala_id: true,
                bem_id: true,
                estado: true,
                ocioso: true,
                imagem: true,
                data: true
            }
        })

        return {historico: historico, bem: bem}
    }

    async auditarBem(parametros){

        const schema = new bemSchema().auditarBemSchema()
        parametros = schema.parse(parametros)
                        
        const usuarioExists = await BemRepository.userExist(parametros.usuario_id)

        const auditadoExists = await BemRepository.bemJaFoiAuditado(parametros.bem_id)

        const idsBemInventario = await BemRepository.getIds(parametros.bem_id)

        if(auditadoExists){
            throw new Error("Bem já foi auditado.");
        }

        if(!idsBemInventario){
            throw new Error("Bem inforamdo não existe.");
        }
        
        if(!usuarioExists){
            throw new Error("Usuario inforamdo não existe.");
        }

        if(idsBemInventario.inventario_id != parametros.inventario_id){
            throw new Error("O Bem não pertence ao inventário informado.");
        }

        const historico = await BemRepository.createHistorico({
            data: {
                ...parametros,
                data: new Date()
            },
            select: {
                id: true,
                usuario_id: true,
                inventario_id: true,
                sala_id: true,
                bem_id: true,
                estado: true,
                ocioso: true,
                imagem: true
            }
        })

        const filtro = BemRepository.createFilter({bem_id: parametros.bem_id})
        const bens =  await BemRepository.findById(filtro)

        return {historico: historico, bem: bens}

    }

}

export default new BemService();
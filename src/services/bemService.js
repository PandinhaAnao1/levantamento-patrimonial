import BemRepository from "../repositories/BemRepository.js"

class bemService{

    async listar(parametros){
        const filtro = BemRepository.createFilter(parametros)
        const bens =  await BemRepository.findAll(filtro)
        if(bens.length == 0){
            throw new Error("Nem um registro encontrado");
        }
        return bens
    }

    async listarPorId(parametros){
        if(isNaN(parametros.bens_id)){
            console.log("chegou")
            throw new Error("id não informado, ou em formato incorreto");
        }

        const filtro = BemRepository.createFilter(parametros)
        const bem = await BemRepository.findById(filtro)

        if(!bem){
            throw new Error("Nem um registro encontrado");
        }
        return bem
    }

    async adicionarBem(parametros){

        let composObrigatorios = ['sala_id',
            'inve_id',
            'usua_id',
            'bens_nome',
            'bens_decricao',
            'bens_estado',
            'bens_ocioso']

        const composObrigatorio = composObrigatorios.filter(prop => !parametros.hasOwnProperty(prop));

        if(!composObrigatorio){
            throw new Error("Valores faltando ou incorretos");
        }

        const usuarioExists = await BemRepository.userExist(parametros.usua_id)

        const salaExists = await BemRepository.salaExist(parametros.sala_id)

        const inventarioExists = await BemRepository.inventarioExist(parametros.inve_id)

        if(!usuarioExists || !salaExists || !inventarioExists){
            throw new Error("usuario, sala ou inventario não existem");
        }
        
        const { usua_id, inve_id, sala_id, ...camposInsert } = parametros;
        const insertbem = {salas:{connect: { sala_id: sala_id }}, ...camposInsert };


        const bem =  await BemRepository.createBem({
            data: insertbem, 
            select: BemRepository.createFilter({}).select
        })

        await BemRepository.createHistorico({
            data: {
                hist_usuarios_id: usua_id,
                hist_inventarios_id: inve_id,
                hist_salas_id: sala_id,
                hist_bens_id: bem.bens_id
            }

        })

        return bem
    }

    async auditarBem(data){
        return await BemRepository.createHistorico(data)
    }

}

export default new bemService()
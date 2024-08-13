import BemRepository from "../repositories/BemRepository.js"

class bemService{

    async listar(parametros){
        const filtro = BemRepository.createFilter(parametros)
        return await BemRepository.findAll(filtro)
    }

    async listarPorId(parametros){
        const filtro = BemRepository.createFilter(parametros)
        return await BemRepository.findById(filtro)
    }

    async adicionarBem(parametros){

        const usuarioExists = await BemRepository.userExist(parametros.usua_id)

        const salaExists = await BemRepository.salaExist(parametros.sala_id)

        const inventarioExists = await BemRepository.inventarioExist(parametros.inve_id)

        if(!usuarioExists || !salaExists || !inventarioExists){
            throw new Error ("usuario, sala ou inventario não existem");
        }
        
        const { usua_id, inve_id, sala_id, ...camposInsert } = parametros;
        const insertbem = {salas:{connect: { sala_id: sala_id }}, ...camposInsert };


        const bem =  await BemRepository.createBem({
            data: insertbem, 
            select: BemRepository.createFilter({}).select
        })

        const insertHistorico = {
            hist_usuarios_id: usua_id,
            hist_inventarios_id: inve_id,
            hist_salas_id: sala_id,
            hist_bens_id: bem.bens_id
        }

        const historico = await BemRepository.createHistorico({
            data: insertHistorico,
            select: {
                hist_id:true
            }
        })

        return bem
    }

    async auditarBem(data){
        return await BemRepository.createHistorico(data)
    }

}

export default new bemService()
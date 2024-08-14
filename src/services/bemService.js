import { runInThisContext } from "vm"
import BemRepository from "../repositories/BemRepository.js"

class BemService{

    static async listar(parametros){
        const filtro = BemRepository.createFilter(parametros)
        return await BemRepository.findAll(filtro)
    }

    static async listarPorId(parametros){
        const filtro = BemRepository.createFilter(parametros)
        return await BemRepository.findById(filtro)
    }

    static async adicionarBem(parametros){

        const usuarioExists = await BemRepository.userExist(parametros.usua_id)

        const salaExists = await BemRepository.salaExist(parametros.sala_id)

        const inventarioExists = await BemRepository.inventarioExist(parametros.inve_id)

        if(!usuarioExists || !salaExists || !inventarioExists){
            throw new Error ("usuario, sala ou inventario não existem");
        }
        
        const { usua_id, inve_id, sala_id, ...camposInsert } = parametros;
        const insert = {salas:{connect: { sala_id: sala_id }}, ...camposInsert };

        const bem =  await BemRepository.createBem({data: insert, select: {bens_nome:true}})
        console.log(bem)

    }

    static async auditarBem(data){
        return await BemRepository.createHistorico(data)
    }

}

export default BemService;
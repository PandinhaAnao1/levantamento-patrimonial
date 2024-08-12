import { runInThisContext } from "vm"
import BemRepository from "../repositories/BemRepository.js"

class bemService{

    async listar(parametros){
        const filtro = BemRepository.createFilter(parametros)
        console.log(filtro)
        return await BemRepository.findAll(filtro)
    }

    async adicionarBem(data){
        return await BemRepository.createBem(data)
    }

    async auditarBem(data){
        return await BemRepository.createHistorico(data)
    }

}

export default new bemService()
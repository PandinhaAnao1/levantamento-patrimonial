import { runInThisContext } from "vm"
import BemRepository from "../repositories/BemRepository.js"

class bemService{

    async listarById(filtro){
        return await BemRepository.findById(filtro)
    }

    async adicionarBem(data){
        return await BemRepository.createBem(data)
    }

    async auditarBem(data){
        return await BemRepository.createHistorico(data)
    }

}

export default new bemService()
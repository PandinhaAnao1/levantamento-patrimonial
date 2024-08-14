import ContaRepository from "../repositories/ContaRepository.js";

class contaService{

    async listarPorId(id){
        return await ContaRepository.listar(id)

    }

}

export default new contaService()
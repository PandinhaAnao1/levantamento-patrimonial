import ContaRepository from "../repositories/ContaRepository.js";

class contaService{

    async findFirst(id){

        return await ContaRepository.findFirst(id)

    }

}

export default new contaService()
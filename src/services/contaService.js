
import ContaRepository from "../repositories/ContaRepository.js";

class contaService{

    async findFirst(id){

        return await ContaRepository.findFirst(id)

    }


    async findMany(){
        return await ContaRepository.findMany()
    }

}

export default new contaService()
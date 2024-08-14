
import ContaRepository from "../repositories/ContaRepository.js";

class contaService{

    async listarTodos(){
        return await ContaRepository.listarTodos()
    }

    async listarPorId(id){

        if(!usuariosExists){
            throw new Error ("usuario não existe");
        }

        return await ContaRepository.listar(id)
    }
}

export default new contaService()
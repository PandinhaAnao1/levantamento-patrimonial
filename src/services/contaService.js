import ContaRepository from "../repositories/ContaRepository.js";

class contaService{

    async listarTodos(){
        return await ContaRepository.listarTodos()
    }

    async listarPorId(id){
        const usuariosExists = await ContaRepository.listar(id)
        
        if(!usuariosExists){
            throw new Error ("usuario não existe");
        }

        return usuariosExists
    }
}

export default new contaService()
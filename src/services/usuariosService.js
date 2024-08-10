import SalaRepository from "../repositories/SalaRepository.js";

class UsuarioService{
    
    async listarPorIdSala(filtro){
        return await SalaRepository.findById(filtro)
    }
}

export default new salaService()
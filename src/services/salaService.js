import SalaRepository from "../repositories/SalaRepository.js";

class salaService{
    
    async listarPorIdSala(filtro){
        return await SalaRepository.findById(filtro)
    }
}

export default new salaService()
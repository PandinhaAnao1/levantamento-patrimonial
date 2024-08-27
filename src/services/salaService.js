import SalaRepository from "../repositories/SalaRepository.js";

class SalaService{
    
    static async listarPorIdSala(filtro){
        return await SalaRepository.findById(filtro)
    }
}

export default SalaService;
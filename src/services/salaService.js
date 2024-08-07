import { deflate } from "zlib";
import SalaRepository from "../repositories/SalaRepository";

class salaService{
    
    async listarPorIdSala(filtro){
        return await SalaRepository.findById(filtro)
    }
}

export default new salaService()
import SalaRepository from "../repositories/SalaRepository.js";
import {z} from "zod";

class SalaService{
    
    static async listar(filtro){
        return SalaRepository.listar(filtro)
    }
    static async listarPorId(filtro){
        return SalaRepository.listarPorId(filtro)
    }
    static async cadastrar(filtro){
        return SalaRepository.cadastrar(filtro)
    }
    static async atualizar(filtro){
        return SalaRepository.atualizar(filtro)
    }
}

export default SalaService;
import CampusRepository from "../repositories/campusRepository.js"
import campusSchema from "../shemas/bemSchema.js";
import {z} from "zod";

class CampusService{
    static async listar (parametros){
        parametros = campusSchema.listarCampus.parse(parametros);

        let filtro 
        
    }

    static listarPorId = async (req, res) => {
        return null
        
    }
    static cadastrar = async (req, res) => {
        return null
        
    }
    static atualizar = async (req, res) => {
        return null
        
    }
    static excluir = async (req, res) => {
        return null
        
    }
}

export default CampusService;
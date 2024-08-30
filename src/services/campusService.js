import { error } from "node:console";
import CampusRepository from "../repositories/campusRepository.js"
import campusSchema from "../shemas/campusSchema.js";
import {z} from "zod";

class CampusService{

    static async listar (parametros){
        parametros = campusSchema.listarCampus.parse(parametros);

        let filtro = CampusRepository.createFilterCampus(parametros)

        const campus = await CampusRepository.listar(filtro);

        if(campus.length == 0){
            throw new Error ("Nenhum campo encontrado");
        }
        return campus;
    }

    static async listarPorId(id){
        id = campusSchema.listarCampusPorId.parse({id});
        const filtro = CampusRepository.createFilterCampus(id)

        const campus = await CampusRepository.listarPorId(filtro);

        if(!campus){
            throw new Error (" Campus não encontrado");
        }
        
        return campus

    }
    static async cadastrar (cadastrarCampus){
        
        const {nome,cidade,bairro,rua,numero,telefone} = campusSchema.cadastrarCampus.parse(cadastrarCampus);
        const campusExist = await CampusRepository.criar(nome,cidade,bairro,rua,numero,telefone)
 
        if(campusExist){
            throw new Error ("Não foi possivel cadastrar o campus pois já existe um campus com esse nome cadastrado")
        }
    }
    static atualizar = async (req, res) => {
        return null
        
    }
    static excluir = async (req, res) => {
        return null
        
    }
}

export default CampusService;
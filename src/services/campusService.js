import { error } from "node:console";
import CampusRepository from "../repositories/campusRepository.js"
import campusSchema from "../shemas/campusSchema.js";
import {z} from "zod";

class CampusService{

    static async listar (parametros){
        console.log(parametros)
        parametros = campusSchema.listarCampus.parse(parametros);

        let filtro = CampusRepository.createFilterCampus(parametros)

        const campus = await CampusRepository.listar(filtro);

        if(campus.length == 0){
            throw new Error ("nenhum campus encontrado");
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
        
        const {nome,cidade,bairro,rua,numero_residencial,telefone} = campusSchema.cadastrarCampus.parse(cadastrarCampus);   
        const filtro = CampusRepository.createFilterCampus({nome, cidade})
        const campusExist = await CampusRepository.listar(filtro)
        console.log(campusExist)
        if(campusExist.length > 0){
            throw new Error ("Não foi possivel cadastrar o campus pois já existe um campus com esse nome cadastrado")
        }
        const campusCreate = await CampusRepository.criar({data:{nome:nome,
                                                                cidade:cidade,
                                                                bairro:bairro,
                                                                rua:rua,
                                                                numero_residencial:numero_residencial,
                                                                telefone:telefone}})
                                                                
        return campusCreate

    }
    static async atualizar(parametro) {

        parametro = campusSchema.atualizarCampus.parse(parametro);
    
        const { id, nome, telefone, bairro, rua, cidade, numero_residencial } = parametro;
    

        const campusExist = await CampusRepository.buscarPorId(id);
    
        if (campusExist == null) {
            throw new Error("Campus não existe");
        }
    

        let atualizacao = {
            where: { id: id },
            data: {
                nome: nome,
                telefone: telefone,
                bairro: bairro,
                rua: rua,
                cidade: cidade,
                numero_residencial: numero_residencial
            },
            select: {
                id: true,
                nome: true,
                telefone: true,
                rua: true,
                bairro: true,
                numero_residencial: true,
                cidade: true
            }
        };
    

        return await CampusRepository.atualizar(atualizacao);
    }
}        
export default CampusService;
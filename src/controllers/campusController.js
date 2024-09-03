import { z, ZodError } from "zod";
import CampusService from '../services/campusService.js'
import {sendResponse, sendError} from '../utils/mensages.js';
import campusSchema from "../shemas/campusSchema.js";

class UsuarioController {
    static listarCampus = async (req, res) => {
        try {
            const {nome, telefone, cidade, bairro, rua, numero_residencial} = req.query

            const paramentros = {

              nome: nome,
              telefone: telefone,
              cidade: cidade,
              bairro: bairro,
              rua: rua,
              numero_residencial: numero_residencial

            }

            const listarCampus = await CampusService.listar(paramentros);

          return sendResponse(res,200, {data: listarCampus});

          } catch (err) {
            console.error(err)
            if(err instanceof ZodError){
              return sendError(res,400,err.errors[0].message);
              
            }else if (err.message === "nenhum campo encontrado"){

            }else{
              return sendError(res,500,"Ocorreu um erro interno no servidor!");
            }
          }
    };
    
    static listarCampusPorId = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const campus = await CampusService.listarPorId(id)

            return sendResponse(res,200, {data: campus});
      
          } catch (err) {
              console.error(err)
            if(err instanceof ZodError){
              return sendError(res,400,err.errors[0].message);

            }else if (err.message === "campus não encontrado.") {
              return sendError(res,404,"campus não encontrado.");
      
            }else{
              return sendError(res,500,"Ocorreu um erro interno no servidor!");
            }
          }

    }
    static cadastrarCampus = async (req, res) => {
        try {
           const novoCampus = await CampusService.cadastrar(req.body);
          
          return sendResponse(res,200, {data: novoCampus});
      
          } catch (err) {
            console.error(err)
            if(err instanceof ZodError){
              return sendError(res,400,err.errors[0].message);
            
            }else if(err.message == "Não foi possivel cadastrar campus pois os dados já estão cadastrado." ){
              return sendError(res,404,["Não foi possivel cadastrar campus pois os dados já estão cadastrado."]);
      
            }else{
              return sendError(res,500,"Ocorreu um erro interno no servidor!");
            }
          }

    }
    static atualizarCampus = async (req, res) => {
        try {
          let id = req.params.id
          let novoCampus = {
            id: parseInt(id),
            ...req.body
          }

          const campus = await CampusService.atualizar(novoCampus)

            return sendResponse(res,200, {data:campus});
      
          } catch (err) {
            console.error(err)
            if(err instanceof ZodError){
              return sendError(res,400,err.errors[0].message);
            }else if(err.message == "Campus não existe." ){
              return sendError(res,404,["Campus não existe."]);
      
            }else{
              return sendError(res,500,"Ocorreu um erro interno no servidor!");
            }
          }

    }
    static excluirCampus = async (req, res) => {
        try {
            return sendResponse(res,200, {data: "teste chegou"});
      
          } catch (err) {
      
            if(err instanceof ZodError){
              return sendError(res,400,err.errors[0].message);
      
            }else{
              return sendError(res,500,"Ocorreu um erro interno no servidor!");
            }
          }

    }
}
export default UsuarioController;
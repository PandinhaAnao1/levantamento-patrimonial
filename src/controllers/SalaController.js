import SalaService from "../services/salaService.js";
import { ZodError } from "zod";
import {sendResponse, sendError} from '../utils/mensages.js';

class SalaController {

  static listarSalas = async (req, res) => {
    try{
      const {campus_id, nome} = req.query
      const parametros = {
        campus_id: parseInt(campus_id) ?? undefined,
        nome: nome ?? undefined
      }
      const salas = await SalaService.listar(parametros)
      return sendResponse(res,200, {data: salas});

    }catch(err){

        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);

        }else if(err.message == "Salas não encontradas." ){
          return sendError(res,404,["Salas não encontradas."]);

        }else{
          return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
      } 
  }


  static listarSalasPorId = async (req, res) => {
    try{
      const {id} = req.params
      const parametros = {
        id:parseInt(id)
      }
      const sala = await SalaService.listarPorId(parametros)
      return sendResponse(res,200, {data: sala});

    }catch(err){
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Sala não encontrada." ){
        return sendError(res,404,["Sala não encontrada."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  }


  static cadastrarSalas = async (req, res) => {
    try{
      const {nome, campus_id} = req.body

      const parametros = {
        nome:nome,
        campus_id:parseInt(campus_id)
      }
      const salaCriada = await SalaService.cadastrar(parametros)

      return sendResponse(res,201, {data: salaCriada});

    }catch(err){

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  }


  static atualizarSalas = async (req, res) => {
    try{
      const id = req.params.id

      const parametros = {
        nome: req.body.nome ?? undefined,
        id: parseInt(id),
        campus_id: req.body.campus_id ?? undefined
      }

      const salaAtualizada = await SalaService.atualizar(parametros)
      return sendResponse(res,201, {data: salaAtualizada});

    }catch(err){
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Sala não encontrada." ){
        return sendError(res,404,["Sala não encontrada."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  }
}


export default SalaController;
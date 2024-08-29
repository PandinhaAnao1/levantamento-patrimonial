import SalaService from "../services/salaService.js";
import { ZodError } from "zod";
import {sendResponse, sendError} from '../utils/mensages.js';

class SalaController {

  static listarSalas = async (req, res) => {
    try{
      const {inventario_id, nome} = req.query
      const parametros = {
        inventario_id: inventario_id,
        nome: nome
      }
      const salas = SalaService.listar(parametros)
      return sendResponse(res,200, {data: "teste chegou"});

    }catch(err){
      console.error(err)
        if(err instanceof ZodError){
          return sendError(res,400,err.errors[0].message);

        }else if(err.message == "Sala não encontrada." ){
          return sendError(res,404,["Sala não encontrada."]);

        }else{
          return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }
      } 
  }


  static listarSalasPorId = async (req, res) => {
    try{
      const {id} = req.parms
      const parametros = {
        id:parseInt(id)
      }
      const salas = SalaService.listarPorId(parametros)
      return sendResponse(res,200, {data: "teste chegou"});

    }catch(err){
      console.error(err)
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
      const nome = req.body.nome
      salaCriada = await SalaService.cadastrar({nome})

      return sendResponse(res,200, {data: "teste chegou"});

    }catch(err){
      console.error(err)
      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  }


  static atualizarSalas = async (req, res) => {
    try{
      const nome = req.body.nome
      const id = req.parms.id

      const parametros = {
        nome:nome,
        id:parseInt(id)
      }
      salaAtualizada = await SalaService.atualizar(parametros)
      return sendResponse(res,200, {data: "teste chegou"});

    }catch(err){
      console.error(err)
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
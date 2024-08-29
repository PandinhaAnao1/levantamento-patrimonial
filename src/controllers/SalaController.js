import SalaService from "../services/salaService.js";
import { ZodError } from "zod";
import {sendResponse, sendError} from '../utils/mensages.js';

class SalaController {

  static listarSalas = async (req, res) => {
    try{
      const {inventario_id, nome} = req.query
      const parametros = {
        inventario_id: parseInt(inventario_id),
        nome: nome
      }
      const salas = await SalaService.listar(parametros)
      return sendResponse(res,200, {data: salas});

    }catch(err){
      console.error(err)
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
      const salaCriada = await SalaService.cadastrar({nome})

      return sendResponse(res,200, {data: salaCriada});

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
      const id = req.params.id

      const parametros = {
        nome:nome,
        id:parseInt(id)
      }
      console.log(parametros)
      const salaAtualizada = await SalaService.atualizar(parametros)
      return sendResponse(res,200, {data: salaAtualizada});

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
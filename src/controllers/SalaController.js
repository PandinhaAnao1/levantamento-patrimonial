import SalaService from "../services/salaService.js";
import { z, ZodError } from "zod";
import {sendResponse, sendError} from '../utils/mensages.js';

class SalaController {

    static listarSalas = async (req, res) => {
    try{

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
    static atualizarSalas = async (req, res) => {
    try{

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
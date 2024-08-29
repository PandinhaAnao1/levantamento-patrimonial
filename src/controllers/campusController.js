import { z, ZodError } from "zod";
import CampusService from '../services/campusService.js'
import {sendResponse, sendError} from '../utils/mensages.js';

class UsuarioController {
    static listarCampus = async (req, res) => {
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
    static listarCampusPorId = async (req, res) => {
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
    static cadastrarCampus = async (req, res) => {
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
    static atualizarCampus = async (req, res) => {
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
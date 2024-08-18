import { error } from "node:console";
import InventarioService from "../services/inventarioService.js";
import {sendResponse, sendError} from "../utils/mensages.js";
import { ZodError } from "zod";
class InventarioController {
    static listarInventarios = async (req, res) => {
        try {

            const invetarios = await InventarioService.listarInventarios(req.query);
            const totalDeItens = await InventarioService.contarInventarios(filtro);
            
            return sendResponse(res,200, {
                data: invetarios,
                resultados:totalDeItens,
                totalPaginas: Math.ceil((data.total ?? 1)/10),
                limite: 10,
                pagina: req.query.pagina,

            }); 
            
        }catch (erro){
            if(erro instanceof ZodError){
                return sendError(res,400,erro.message);
            }

            return sendError(res,500,"Ocorreu um erro interno no servidor!");
    }
  }

    static listarInventarioPorId = async (req, res) => {
        try{

            const inventario = await InventarioService.listarInventarioPorId(req.params);
        
            return sendResponse(res,200, {data: inventario,});  
      
   
        }catch(erro){

            if(erro instanceof ZodError){
                return sendError(res,400,erro.message);
            }
            
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }

    }

    static criarInventario = async (req, res) => {
        try{

            const inventario = await InventarioService.criarInventario(req.body);
        
            return sendResponse(res,201, {data: inventario,});  
      
   
        }catch(erro){

            if(erro instanceof ZodError){
                return sendError(res,400,erro.message);
            }
            
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }

    }

    static atualizarInventario = async (req, res) => {

        try{
            
            let id = req.params;

            const inventario = await InventarioService.atualizarInvetario({id:id, ...req.body});
        
            return sendResponse(res,201, {data: inventario,});  
      
   
        }catch(erro){

            if(erro instanceof ZodError){
                return sendError(res,400,erro.message);
            }
            
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }

    }

}

export default InventarioController;
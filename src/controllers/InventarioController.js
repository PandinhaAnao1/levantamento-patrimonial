import InventarioService from "../services/InventarioService.js";
import {sendResponse, sendError} from "../utils/mensages.js";
import { ZodError, ZodIssueCode,array,z } from "zod";


class InventarioController {

    static importCSV = async (req, res) => {
        try{
            if (!req.file) {
                return res.status(400).send('Nenhum arquivo enviado.');
            }
            const arquivo = req.file
            const parametros = {
                nome: req.body.nome,
                campus_id: parseInt(req.body.campus_id)
            }
          
            const retorno = await InventarioService.importCSV(arquivo, parametros)
              
            return sendResponse(res,201, {data: retorno});  

        }catch(err){
            console.error(err)
            if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else if(err.message === "Campus não existe.") {
                return sendError(res, 404, ["Campus não existe."])

            }else if(err.message === "O nome do inventário já está em uso.") {
                return sendError(res, 404, ["O nome do inventário já está em uso."])

            }else if(err.message === "arquivo do tipo errado.") {
                return sendError(res, 404, ["arquivo do tipo errado."])

            }else if(err.message === "Estrutura do CSV está incorreta.") {
                return sendError(res, 404, "Estrutura do CSV está incorreta.")

            }else {
                return sendError(res,500,"Ocorreu um erro interno no servidor!");
            }
        }
            
    }

    static listarInventarios = async (req, res) => {
        try {

            const invetarios = await InventarioService.listarInventarios(req.query);
            const totalDeItens = await InventarioService.contarInventarios(req.query);
            
            return sendResponse(res,200, {
                data: invetarios,
                resultados:totalDeItens,
                totalPaginas: Math.ceil((totalDeItens ?? 1)/10),
                limite: 10,
                pagina: req.query.pagina,

            }); 
            
        }catch (error){
            if(error instanceof ZodError) {
                const customError = error.issues.find(issue => issue.params?.code === ZodIssueCode.custom);
                if (customError) {
                    let errors = error.errors[0];
                    return sendError(res,parseInt(errors.params?.staus),errors.message);
                } else {
                    return sendError(res,401,"Erro ao realizar consulta dos inventários!");
                }              
              }
        
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
    }
  }

    static listarInventarioPorId = async (req, res) => {
        try{
            const inventario = await InventarioService.listarInventarioPorId(req.params);
        
            return sendResponse(res,200, {data: inventario,});  
      
   
        }catch(error){

            if(error instanceof ZodError) {
                const customError = error.issues[0].code = 'custom' ? true : false;
                if (customError) {
                    let errors = error.errors[0];
                    return sendError(res,parseInt(errors.params?.status),errors.message);
                } else {
                    return sendError(res,401,"Erro ao buscar inventario");
                }              
              }

          
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }

    }

    static criarInventario = async (req, res) => {
        try{

            const inventario = await InventarioService.criarInventario(req.body);
        
            return sendResponse(res,201, {data: inventario,});  
      
   
        }catch(erro){
            console.log(erro)

            if(erro instanceof ZodError){
                return sendError(res,400,erro.errors[0].message);
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
            console.log(erro)

            if(erro instanceof ZodError){
                return sendError(res,400,erro.errors[0].message);
            }
            
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }

    }

}

export default InventarioController;
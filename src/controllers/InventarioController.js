import { error } from "node:console";
import InventarioService from "../services/inventarioService.js";
import {sendResponse, sendError} from "../utils/mensages.js";
class InventarioController {
    static listarInventarios = async (req, res) => {
        try {

            const invetario = await InventarioService.listarInventarios(req.query);
            const totalDeItens = await InventarioRepository.contarInventarios(filtro);

            
            return sendResponse(res,200, {
                data: data,
                resultados:totalDeItens,
                totalPaginas: Math.ceil((data.total ?? 1)/10),
                limite: 10,
                pagina: req.query.pagina ?? 1,

            }); 
            
        }catch (erro){
            console.log(erro)
            if(erro instanceof TypeError){
                return sendError(res,400,"Não existe nehum inventario com essas caracteristicas!");
            }
        return sendError(res,500,"Ocorreu um erro interno no servidor!")
    }
  }

  static listarInventarioPorId = async (req, res) => {
    try{

        let idInventario = parseInt(req.params.id);
        console.log(idInventario);

        const inventario = await InventarioService.listarInventarioPorId(idInventario);
        
        console.log(inventario);
        return res.status(200).json({
            data: [inventario]
        });
   
    }catch(erro){

        console.log(erro);
    }

}

}

export default InventarioController;
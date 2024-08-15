import { error } from "node:console";
import InventarioService from "../services/inventarioService.js";
import {sendResponse, sendError} from "../utils/mensages.js";
class InventarioController {
    static listarInventarios = async (req, res) => {
        try {

            const data = await InventarioService.listarInventarios(req.query)

            return sendResponse(res,200, {
                data:data.inventarios ?? [],
                resultados:data.total ?? 1,
                totalPaginas: Math.ceil((data.total ?? 1)/10),
                limite: 10,
                pagina: req.query.pagina ?? 1,

            }); 
            
        }catch (erro){
            console.log(erro)
            if(erro instanceof TypeError){
                return sendError();
                
                res.status(400).json([{
                    data:[],
                    erro: false,
                    code: 200,
                    resultados:0,
                    totalPaginas: 1,
                    limite: 10,
                    pagina: 1,
                    message:"Não existe nehum inventario com essas caracteristicas!"
                }])
            }
        return res.status(500).json([{
            data:[],
            resultados:0,
            totalPaginas: 1,
            limite: 10,
            pagina: 1,
            error: true, 
            code: 500, 
            message: "Ocorreu um erro interno no servidor!"
        }])
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
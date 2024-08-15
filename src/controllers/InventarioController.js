import { error } from "node:console";
import InventarioService from "../services/inventarioService.js";

class InventarioController {
    static listarInventarios = async (req, res) => {
        try {

            const data = await InventarioService.listarInventarios(req.query)

            return res.status(200).json({
                data:data.inventarios ?? [],
                erro: false,
                code: 200,
                resultados:data.total ?? 1,
                totalPaginas: Math.ceil((data.total ?? 1)/10),
                limite: 10,
                pagina: req.query.pagina ?? 1,
                message: "Inventarios encontrados com sucesso!"
                
            });
        }catch (erro){
            if(erro instanceof TypeError){
                return res.status(400).json([{
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
       


    }catch(err){
    }

}

}

export default InventarioController;
import { error } from "node:console";
import InventarioService from "../services/inventarioService.js";

class InventarioController {
    static listarInventarios = async (req, res) => {
        try {
            console.log(req.Params);

            const data = await InventarioService.listarInventarios(req.query)

            if(data.inventarios?.length === 0){
                return res.status(400).json([{
                    error: true,
                    code:400,
                    message:"NÃO FOI ENCONTRADO NENHUM INVENTARIO"
                }])
            }

            return res.status(200).json({
                data:data.inventarios ?? [],
                erro: false,
                code: 200,
                resultados:data.total ?? 1,
                totalPaginas: Math.ceil((data.total ?? 1)/10),
                limite: 10,
                pagina: req.query.pagina ?? 1

            });
    }catch (err){
        console.log(err);
        return res.status(500).json([{ 
            error: true, 
            code: 500, 
            message: "OCORREU UM ERRO INTERNO"
        }])
    }
  }

  static listarSalas = async (req, res) => {
    try{
        const idInventario = parseInt(req.params.id)

        if(!idInventario){
            return res.status(400).json({
                error: true,
                code: 400,
                message: "id do inventario não é valido"
            });
        }

        let filtro = {
            where:{
                sala_inve_id: parseInt(idInventario)
            },
            select:{
                sala_id: true,
                sala_Nome: true
            }
        }
                

        const salas = await InventarioService.listarById(filtro)


        if(salas.length === 0){
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Nem uma sala foi encontrada",
              });
        }else{
            return res.status(200).json({
                error: false,
                code: 200,
                message: "salas encontradas",
                data: salas
            });
        }


    }catch(err){
        console.log(err)
        return res.status(500).json({
            error: true,
            code: 500,
            message: "Erro interno do servido",
          });
    }

}

}

export default InventarioController;
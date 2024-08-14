import InventarioService from "../services/inventarioService.js";

class InventarioController {
    static listarInventarios = async (req, res) => {
        try {
            const {id, nome, data, concluido, campus} = req.params;
            let filtro = {
                where:{
                    inve_id: id ?? '',
                    inve_nome: nome ?? '',
                    inve_data: data ?? '',
                    inve_concluido: concluido ?? '',
                    inve_campus: campus ?? ''
                }
            }

            const unitExists = await InventarioService.listarInventarios(filtro)

            if(unitExists.length === 0){
                return res.status(400).json([{
                    error: true,
                    code:400,
                    message:"NÃO FOI ENCONTRADO NENHUM INVENTARIO"
                }])
            }

            return res.status(200).json(unitExists);
    }catch (err){
        console.error(err);
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
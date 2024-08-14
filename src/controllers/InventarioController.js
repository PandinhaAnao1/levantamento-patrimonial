import inventarioService from "../services/inventarioService.js";

class BemController {
    static listarInventarios = async (req, res) => {
        try {

            let filtro = {
                select:{
                inve_id: true,
                inve_nome: true,
                inve_data: true,
                inve_campus: true,
                inve_concluido: true,
                },
            }

            const unitExists = await inventarioService.listarAll(filtro)

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
                

        const salas = await inventarioService.listarById(filtro)


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

export default BemController;
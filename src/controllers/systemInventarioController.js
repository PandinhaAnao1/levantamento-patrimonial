import { prisma } from "../configs/prismaClient.js"

class systemBemController {
    static listarInventarios = async (req, res) => {
        try {
            const unitExists = await prisma.inventarios.findMany({
                select:{
                inve_id: true,
                inve_nome: true,
                inve_data: true,
                inve_campus: true,
                inve_concluido: true,
                },
            });

            if(unitExists.length === 0){
                return res.status(200).json([{
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
    }{

    }
  }

  static listarSalas = async (req, res) => {
    try{
        const idInventario = parseInt(req.params.idInventario)

        if(!idInventario){
            return res.status(400).json({
                error: true,
                code: 400,
                message: "id do inventario não é valido"
            });
        }


        const salas = await prisma.inventarios.findMany({
            where:{
                 inve_id: parseInt(idInventario)
            },
            select: {
                sala_invent: {
                    select: {
                        sala: {
                            select:{
                                Sala_id: true,
                                Sala_Nome: true
                            }
                        }
                    }
                }
            }
        })


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

export default systemBemController;
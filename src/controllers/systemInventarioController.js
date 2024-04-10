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

}

export default systemBemController;
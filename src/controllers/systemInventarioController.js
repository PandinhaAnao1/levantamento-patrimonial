// import { prisma } from "../configs/prismaClient.js";
// quando o prisma estiver funcionando é so descomentar

class systemBemController {
    static listarInventarios = (req, res) => {
        try{
            const unitExists = await prisma.system_InventarioRoutes.js.findMany({
                select{
                    inve_id,
                    inve_nome,
                    inve_data,
                    inve_campus,
                    inve_concluido,
                },
                
            })
                
            
        }return null
    }

    static criarInventario = (req, res) => {
        return null
    }
}

export default systemBemController;
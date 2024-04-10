import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class systemBemAdicionadoController {

    static adicionarBem = async (req, res) => {
        const {
            iten_nome,
            iten_tombo,
            iten_descrição,
            hist_estado_item,
            hist_item_ocioso
          } = req.body;
        
     
        try {
            const unitExists = await prisma.bemAdicionado.create({
                item_adicionado:{
                    iten_nome,
                    iten_tombo,
                    iten_descrição, 
                }

            })

     }   
    }
}

export default systemBemAdicionadoController;
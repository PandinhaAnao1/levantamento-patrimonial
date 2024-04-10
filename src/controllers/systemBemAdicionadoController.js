import { prisma } from "../configs/prismaClient.js"

class systemBemAdicionadoController {

    static adicionarBem = async (req, res) => {
        const {
            item_add_id,
            item_add_nome,
            item_add_tombo,
            item_add_descrição,
            item_add_estado,
            item_au_in_id,
            item_add_imagem,
            item_add_ocioso
          } = req.body;
        

     
        try {
            // select para cada au_inve_id e sala_id  (chaves estrangeiras)
            // tem que ter validação para todos os items 

            const unitExists = await prisma.bemAdicionado.create({
                item_adicionado:{
                    item_add_id,
                    item_add_nome,
                    item_add_tombo,
                    item_add_descrição,
                    item_add_estado,
                    item_au_in_id,
                    item_add_imagem,
                    item_add_ocioso

                }

            });
        return res.status(200).json(unitExists);
     }catch(err){
        console.error(err);
        return res.status(500).json([{
            error: true,
            code: 500,
            message: "OCORREU UM ERRO INTERNO"
        }])
     }  
    }
}

export default systemBemAdicionadoController;
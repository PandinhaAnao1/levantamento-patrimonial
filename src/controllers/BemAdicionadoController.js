import { prisma } from "../configs/prismaClient.js"

class systemBemAdicionadoController {

    static adicionarBem = async (req, res) => {
        
        console.log("pegou a funcao")

        const {
            item_add_id,
            item_add_nome,
            item_add_descricao,
            item_add_estado,
            item_au_in_id,
            item_add_imagem,
            item_add_sala_id,
            item_add_ocioso
          } = req.body;
        

     
        try {
            // select para cada au_inve_id e sala_id  (chaves estrangeiras)
            // tem que ter validação para todos os items (FALTA VALIDAÇÃO!!!!! falta a falidação do que não)

            const audior_inveExists = await prisma.auditor_inventario.findFirst({
                where:{
                    au_in_id: item_au_in_id
                },
                select:{
                    au_in_id: true
                }
            })

            const salaExists = await prisma.sala.findFirst({
                where:{
                    Sala_id: item_add_sala
                },
                select:{
                    item_add_sala:true
                }
            })

            //Corrijir o parse int, deixar apenas nesses atributos:
            //item_add_id,item_add_au_in_id,item_add_sala_id
            //O item add id deve ser retirado pois a chave primaria é auto increment
            //deve ser adicionado tambem ocioso com parser int pois ele é tyni int
            const unitExists = await prisma.bemAdicionado.create({
                item_adicionado:{
                    item_add_nome:parseInt(item_add_nome),
                    item_add_estado:(item_add_estado),
                    item_add_descricao:parseInt(item_add_descricao),
                    item_add_au_in_id:parseInt(item_add_au_in_id),
                    item_add_sala_id:parseInt(item_add_sala_id),
                    item_add_imagem:parseInt(item_add_imagem),
                    item_add_ocioso:parseInt(item_add_ocioso),
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
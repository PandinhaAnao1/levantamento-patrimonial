import { prisma } from "../configs/prismaClient.js"
class systemBemController {
    static listarDados = (req, res) => {
        return null
    } 
    // hist_iten_id
    // hist_au_in_id
    // hist_estado_item
    // hist_item_ocioso
    // hist_imagem
    // hist_encontrado
    // hist_sala_id 
    //SELECT * FROM auditor_inventario, itens, sala
    //SELECT 
	// au_in_id, iten_id,
    // Sala_id
	// FROM auditor_inventario, itens, sala
    // WHERE au_in_id = 1 AND iten_id = 1 AND Sala_id = 1;
    static auditarBem = async (req, res) => {
        console.log("Pegou")
        try{
            const{
                item,auditor,
                estado,ocioso,
                img,enctr,
                sala
            } = req.body
            console.log("Antes da consulta")
            existeItem = await prisma.itens.findFirst({
                where: {
                    iten_id: parseInt(item)
                },
                select:{
                    iten_id:true
                }
            })
            console.log("depois")
            console.log(existeItem)

        }catch(error){
            console.log("pego no catch")
            res.status(500).send(error)

        }
    }
}

export default systemBemController;
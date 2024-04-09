import { prisma } from "../configs/prismaClient.js"
class systemBemController {
    static listarDados = (req, res) => {
        return null
    } 
    static auditarBem = async (req, res) => {
        try{
            const{
                item,auditor,
                estado,ocioso,
                img,enctr,
                sala
            } = req.body
            const existeItem = await prisma.itens.findUnique({
                where: {
                    iten_id: parseInt(item)
                },
                select:{
                    iten_id:true
                }
            })
            const existeAuditor = await prisma.auditor_inventario.findUnique({
                where: {
                    au_in_id: parseInt(auditor)
                },
                select:{
                    au_in_id:true
                }
            })
            const existeSala = await prisma.sala.findUnique({
                where: {
                    Sala_id: parseInt(sala)
                },
                select:{
                    Sala_id:true
                }
            })
            if(existeAuditor && existeItem && existeSala){
                const historico = {
                    hist_iten_id:parseInt(item),
                    hist_au_in_id:parseInt(auditor),
                    hist_estado_item:estado,
                    hist_item_ocioso:parseInt(ocioso),
                    hist_imagem:img,
                    hist_encontrado:parseInt(enctr),
                    hist_sala_id:parseInt(sala)
                }
                const historicoInserido = 
                    await prisma.historico.create({
                        data: historico
                    })
                res.status(201).json({
                        "itemAuditado":historicoInserido,
                    })
                return;
            }
            res.status(400).json({
                "Mensage":"Ocorreu um erro ao tentar auditar um item"
            })
            return;
        }catch(error){
            res.status(500).send(error)
        }
    }
}

export default systemBemController;
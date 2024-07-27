import { prisma } from "../configs/prismaClient.js"
class systemBemController {

    static listarPorId = async (req, res) => {
        try {
            const userExists = await prisma.itens.findFirst({
                where: {
                    iten_id: parseInt(req.params.id),
                },
                select: {
                    iten_nome:true,
                    iten_id:true,
                    iten_tombo:true,
                    iten_responsavel:true,
                    //  iten_decri__o:true,
                },

            })
        
            
            return res.status(200).json(userExists);
            

        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Error interno do Servidor"}])
        }
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
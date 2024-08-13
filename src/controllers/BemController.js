import bemService from "../services/bemService.js";

class systemBemController {

    static listarbens = async (req, res) => {
        try {
            const { sala_id } = req.body;
            const userExists = await bemService.listar(sala_id)
        
            return res.status(200).json(userExists);
            
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Error interno do Servidor"}])
        }
    }

    static listarPorId = async (req, res) => {
        try {
            let bem_id =  parseInt(req.params.id)
            const userExists = await bemService.listarPorId(bem_id)
        
            return res.status(200).json(userExists);

        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Error interno do Servidor"}])
        }
    }

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
            let data = {
                item_adicionado:{
                    item_add_nome:parseInt(item_add_nome),
                    item_add_estado:(item_add_estado),
                    item_add_descricao:parseInt(item_add_descricao),
                    item_add_au_in_id:parseInt(item_add_au_in_id),
                    item_add_sala_id:parseInt(item_add_sala_id),
                    item_add_imagem:parseInt(item_add_imagem),
                    item_add_ocioso:parseInt(item_add_ocioso),
                }
            }

            const unitExists = await bemService.adicionarBem(data)

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
                    await bemService.auditarBem({
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
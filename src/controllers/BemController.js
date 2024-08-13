import bemService from "../services/bemService.js";

class systemBemController {

    static listarbens = async (req, res) => {
        try {
            const {sala_id} = req.body;
            const parametros = {
                sala_id: sala_id
            }
            const bensExists = await bemService.listar(parametros)

            if(bensExists.length == 0){
                return res.status(404).json({ error: true, code: 404, message: "Nem um registro encontrado"});

            }else{
                return res.status(200).json({ error: false, code: 200, message: "Registros encontrados", data: bensExists});

            }
        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Error interno do Servidor"}])
        }
    }

    static listarPorId = async (req, res) => {
        try {
            let bens_id =  parseInt(req.params.id)
            const parametros = {
                bens_id: parseInt(bens_id)
            }
            const bensExist = await bemService.listarPorId(parametros)

            if(!bensExist){
                return res.status(404).json({ error: true, code: 404, message: "Nem um registro encontrado"});

            }else{
                return res.status(200).json({ error: false, code: 200, message: "Registro encontrado", data: bensExist});

            }

        } catch (err) {
            console.error(err);
            return res.status(500).json([{ error: true, code: 500, message: "Error interno do Servidor"}])
        }
    }

    static adicionarBem = async (req, res) => {

        // Paramentros recebidos no req.body
        // sala_id,
        // inve_id,
        // user_id,
        // bens_nome,
        // bens_decricao,
        // bens_estado,
        // bens_ocioso,
        // bens_imagem,
        // bens_tombo
        // bens_responsavel
        // bens_valor
        
        try {

            const parametros = {
                ...req.body,
                bens_encontrado: true 
            };

            let composObrigatorios = ['sala_id',
                                        'inve_id',
                                        'usua_id',
                                        'bens_nome',
                                        'bens_decricao',
                                        'bens_estado',
                                        'bens_ocioso']

            const composObrigatorio = composObrigatorios.filter(prop => !parametros.hasOwnProperty(prop));

            if(!composObrigatorio){
                return res.status(400).json({ error: true, code: 400, message: "Valores faltando ou incorretos"});
            }

            const unitExists = await bemService.adicionarBem(parametros)

            return res.status(200).json(unitExists);

        }catch(err){
            console.error(err);

            if (err.message === 'usuario, sala ou inventario não existem') {
                return res.status(404).json({ error: true, code: 404, message: err.message});
            }

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
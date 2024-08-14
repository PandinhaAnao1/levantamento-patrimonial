import bemService from "../services/bemService.js";

class systemBemController {

    static listarbens = async (req, res) => {
        try {
            const {sala_id} = req.body;
            const parametros = {
                sala_id: parseInt(sala_id)
            }
            const bensExists = await bemService.listar(parametros)

            return res.status(200).json({ error: false, code: 200, message: "Registros encontrados", data: bensExists});

        } catch (err) {
            console.error(err);
             if(err.message === "Nem um registro encontrado") {
                return res.status(404).json({ error: true, code: 404, message: err.message});
            }
            
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
            return res.status(200).json({ error: false, code: 200, message: "Registro encontrado", data: bensExist});

        } catch (err) {
            console.error(err);

            if (err.message === "id não informado, ou em formato incorreto") {
                return res.status(400).json({ error: true, code: 400, message: err.message});

            }else if(err.message === "Nem um registro encontrado"){
                return res.status(404).json({ error: true, code: 404, message: err.message});
            }
            return res.status(500).json([{ error: true, code: 500, message: "Error interno do Servidor"}])
        }
    }

    static adicionarBem = async (req, res) => {
        
        try {
            const parametros = {
                sala_id: parseInt(req.body.sala_id) ?? null,
                inve_id: parseInt(req.body.inve_id) ?? null,
                usua_id: parseInt(req.body.usua_id) ?? null,
                bens_nome: req.body.bens_nome ?? null,
                bens_decricao: req.body.bens_decricao ?? null,
                bens_estado: req.body.bens_estado ?? null,
                bens_ocioso: req.body.bens_ocioso ?? null,
                bens_imagem: req.body.bens_imagem ?? null,
                bens_tombo: req.body.bens_tombo ?? null,
                bens_responsavel: req.body.bens_responsavel ?? "",
                bens_valor: req.body.bens_valor ?? null,
                bens_encontrado: true,
            };
            console.log(parametros)
            const unitExists = await bemService.adicionarBem(parametros)

            return res.status(201).json({ error: false, code: 201, message: "Bem adicionado", data: unitExists});

        }catch(err){
            console.error(err);

            if (err.message === 'usuario, sala ou inventario não existem') {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if (err.message === "Um parâmetro faltando ou é inválido.") {
                return res.status(400).json({ error: true, code: 400, message: err.message});
            }else{
                return res.status(500).json([{
                    error: true,
                    code: 500,
                    message: "OCORREU UM ERRO INTERNO"
                }])
            }
        }  
    }
    
    static auditarBem = async (req, res) => {
        try{
            const parametros = {
                bens_id: parseInt(req.body.bens_id) ?? null,
                sala_id: parseInt(req.body.sala_id) ?? null,
                inve_id: parseInt(req.body.inve_id) ?? null,
                usua_id: parseInt(req.body.usua_id) ?? null,
                bens_estado: req.body.bens_estado ?? null,
                bens_ocioso: req.body.bens_ocioso ?? null,
                bens_imagem: req.body.bens_imagem ?? null,
                bens_encontrado: true,
            };

            const unitExists = await bemService.auditarBem(parametros)
            return res.status(201).json({ error: false, code: 201, message: "Bem adicionado", data: unitExists});

        }catch(err  ){
            if (err.message === 'usuario, sala ou inventario não existem') {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }
            return res.status(500).send(error)
        }
    }
}

export default systemBemController;
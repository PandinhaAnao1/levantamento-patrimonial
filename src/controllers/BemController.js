import bemService from "../services/bemService.js";
import {z} from 'zod'

class systemBemController {

    static listarbens = async (req, res) => {
        try {
            const {sala_id} = req.body;
            const parametros = {
                sala_id: sala_id
            }
            const bensExists = await bemService.listar(parametros)

            return res.status(200).json({ error: false, code: 200, message: "Registros encontrados", data: bensExists});

        } catch (err) {
            console.error(err);
            if(err.message === "Nem um registro encontrado") {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if (err instanceof z.ZodError) {

                const errorMessages = err.issues.map((issue) => issue.message);
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: errorMessages
                })
            }else{
                return res.status(500).json([{
                    error: true,
                    code: 500,
                    message: "OCORREU UM ERRO INTERNO"
                }])
            }
        }
    }

    static listarPorId = async (req, res) => {
        try {
            let bens_id =  req.params.id
            const parametros = {
                bens_id: parseInt(bens_id)
            }

            const bensExist = await bemService.listarPorId(parametros)
            return res.status(200).json({ error: false, code: 200, message: "Registro encontrado", data: bensExist});

        } catch (err) {
            console.error(err);

            if(err.message === "Nem um registro encontrado"){
                return res.status(404).json({ error: true, code: 404, message: err.message});
            }else if (err instanceof z.ZodError) {

                const errorMessages = err.issues.map((issue) => issue.message);
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: errorMessages
                })

            }else {
                return res.status(500).json([{
                    error: true,
                    code: 500,
                    message: "OCORREU UM ERRO INTERNO"
                }])
            }
        }
    }
    // model bens {
    //     bens_id          Int         @id @unique(map: "bens_id_UNIQUE") @default(autoincrement())
    //     bens_sala_id     Int
    //     bens_nome        String      @db.VarChar(200)
    //     bens_tombo       String?     @db.VarChar(15)
    //     bens_responsavel String?     @db.VarChar(80)
    //     bens_decricao    String      @db.MediumText
    //     bens_estado      String?     @db.VarChar(30)
    //     bens_ocioso      Boolean?
    //     bens_imagem      String?     @db.VarChar(200)
    //     bens_encontrado  Boolean?
    //     bens_valor       Decimal?    @db.Decimal(10, 2)
    //     salas            salas       @relation(fields: [bens_sala_id], references: [sala_id], onDelete: NoAction, onUpdate: NoAction, map: "fk_itens_sala1")
    //     historico        historico[]
    //     @@index([bens_sala_id], map: "fk_itens_sala1_idx")
    //   }
    static createBem = async (req, res) => {
        try {
            const parametros = {
                sala_id: parseInt(req.body.sala_id),
                bens_nome: req.body.bens_nome,
                bens_tombo: req.body.bens_tombo,
                bens_decricao: req.body.bens_decricao ,
                bens_responsavel: req.body.bens_responsavel ?? "",
                bens_encontrado: false,
            };
            const unitExists = await bemService.adicionarBem(parametros)

            return res.status(201).json({ error: false, code: 201, message: "Bem adicionado", data: unitExists});

        }catch(err){
            console.error(err);

            if (err.message === "usuario, sala ou inventario não existem") {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: errorMessages
                })

            }else{
                return res.status(500).json([{
                    error: true,
                    code: 500,
                    message: "OCORREU UM ERRO INTERNO"
                }])
            }
        } 
    }

    static adicionarBem = async (req, res) => {
        
        try {
            const parametros = {
                sala_id: parseInt(req.body.sala_id) ,
                inve_id: parseInt(req.body.inve_id) ,
                usua_id: parseInt(req.body.usua_id) ,
                bens_nome: req.body.bens_nome ,
                bens_decricao: req.body.bens_decricao ,
                bens_estado: req.body.bens_estado ,
                bens_ocioso: req.body.bens_ocioso ,
                bens_imagem: req.body.bens_imagem ?? null,
                bens_responsavel: req.body.bens_responsavel ?? "",
                bens_encontrado: true,
            };
            const unitExists = await bemService.adicionarBem(parametros)

            return res.status(201).json({ error: false, code: 201, message: "Bem adicionado", data: unitExists});

        }catch(err){
            console.error(err);

            if (err.message === "usuario, sala ou inventario não existem") {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: errorMessages
                })

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
            console.error(err)
            if (err.message === "Usuario não existem") {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if (err.message === "O Bem não pertence a sala ou inventario informado") {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if(err.message === 'Bem já foi auditado.') {
                return res.status(404).json({ error: true, code: 404, message: err.message});

            }else if(err instanceof z.ZodError) {

                const errorMessages = err.issues.map((issue) => issue.message);
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: errorMessages
                })

            }else{
                return res.status(500).json([{
                    error: true,
                    code: 500,
                    message: "OCORREU UM ERRO INTERNO"
                }])

            }
        }
    }
}

export default systemBemController;
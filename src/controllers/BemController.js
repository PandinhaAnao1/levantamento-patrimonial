import bemService from "../services/bemService.js";
import {z} from 'zod';
import {sendResponse, sendError} from "../utils/mensages.js";

class BemController {

    static listarbens = async (req, res) => {
        try {
            const {sala_id, inventario_id, nome, tombo, responsavel, descricao} = req.body;
            const parametros = {
                sala_id: sala_id,
                inventario_id: inventario_id,
                nome: nome,
                tombo: tombo,
                responsavel: responsavel,
                descricao: descricao
            }
            const bensExists = await bemService.listar(parametros)

            return sendResponse(res,200,{data: bensExists})

        } catch (err) {
            console.error(err)
            if(err.message === "Nem um registro encontrado") {
                return sendError(res, 404, ["Nem um registro encontrado"])

            }else if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else{
                return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
            }
        }
    }

    static listarPorId = async (req, res) => {
        try {
            let bem_id =  req.params.id
            const parametros = {
                bem_id: parseInt(bem_id)
            }

            const bensExist = await bemService.listarPorId(parametros)
            return sendResponse(res,200,{data: bensExist})

        } catch (err) {
            console.error(err)
            if(err.message === "Nem um registro encontrado") {
                return sendError(res, 404, ["Nem um registro encontrado"])

            }else if (err instanceof z.ZodError) {

                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else {
                return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
            }
        }
    }

    static createBem = async (req, res) => {
        try {
            const parametros = {
                sala_id: parseInt(req.body.sala_id),
                inventario_id: parseInt(req.body.inventario_id),
                nome: req.body.nome,
                tombo: req.body.tombo,
                descricao: req.body.descricao ,
                responsavel: req.body.responsavel,
                valor: req.body.valor ?? null,
            };
            const bemCreate = await bemService.create(parametros)
            return sendResponse(res,201,{data: bemCreate})

        }catch(err){
            console.error(err)
            if (err.message === "O sala_id informado não existem") {
                return sendError(res, 404, ["O sala_id informado não existem"])

            }else if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else{
                return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
            }
        } 
    }

    static adicionarBem = async (req, res) => {
        
        try {
            const parametros = {
                sala_id: parseInt(req.body.sala_id),
                inventario_id: parseInt(req.body.inventario_id),
                usuario_id: parseInt(req.body.usuario_id),
                nome: req.body.nome,
                descricao: req.body.descricao,
                estado: req.body.estado,
                ocioso: req.body.ocioso,
                imagem: req.body.imagem ?? null,
                encontrado: true,
            };
            const bemAdicionado = await bemService.adicionarBem(parametros)

            return sendResponse(res,201,{data: bemAdicionado})

        }catch(err){
            console.error(err)
            if (err.message === "usuario, sala ou inventário não existem") {
                return sendError(res, 404, ["usuario, sala ou inventário não existem"])

            }else if (err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else{
                return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
            }
        }  
    }
    
    static auditarBem = async (req, res) => {
        try{
            const parametros = {
                bens_id: req.body.bens_id,
                sala_id: req.body.sala_id,
                inve_id: req.body.inve_id,
                usua_id: req.body.usua_id,
                bens_estado: req.body.bens_estado,
                bens_ocioso: req.body.bens_ocioso,
                bens_imagem: req.body.bens_imagem ?? null,
                bens_encontrado: true,
            };

            const bemAuditado = await bemService.auditarBem(parametros)
            return res.status(201).json({ error: false, code: 201, message: "Bem auditado", data: bemAuditado});

        }catch(err){
            if (err.message === "Usuario não existe") {
                return sendError(res, 404, ["Usuario não existe"])

            }else if (err.message === "bem inforamdo não existe") {
                return sendError(res, 404, ["bem inforamdo não existe"])

            }else if (err.message === "O Bem não pertence a sala ou inventário informado") {
                return sendError(res, 400, ["O Bem não pertence a sala ou inventário informado"])

            }else if(err.message === 'Bem já foi auditado.') {
                return sendError(res, 403, ['Bem já foi auditado.'])

            }else if(err instanceof z.ZodError) {
                const errorMessages = err.issues.map((issue) => issue.message);
                return sendError(res, 400, errorMessages)

            }else{
                return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
            }
        }
    }
}

export default BemController;
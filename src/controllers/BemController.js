import bemService from "../services/bemService.js";
import {z} from 'zod';
import {sendResponse, sendError} from "../utils/mensages.js";

class BemController {

    static listarbens = async (req, res) => {
        try {
            const {sala_id, inventario_id, nome, tombo, responsavel, descricao, auditado} = req.query;
            const parametros = {
                sala_id: sala_id,
                inventario_id: inventario_id,
                nome: nome,
                tombo: tombo,
                responsavel: responsavel,
                descricao: descricao,
                auditado: Boolean(auditado)
            }
            const bensExists = await bemService.listar(parametros)

            return sendResponse(res,200,{data: bensExists})

        } catch (err) {
            console.error(err)
            if(err.message === "Nem um registro encontrado.") {
                return sendError(res, 404, ["Nem um registro encontrado."])

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
            if(err.message === "Nem um registro encontrado.") {
                return sendError(res, 404, ["Nem um registro encontrado."])

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
                auditado: false,
            };
            const bemCreate = await bemService.create(parametros)
            return sendResponse(res,201,{data: bemCreate})

        }catch(err){
            if (err.message === "Sala ou inventário informado não existe.") {
                return sendError(res, 404, ["Sala ou inventário informado não existe."])

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
                imagem: req.body.imagem ?? null
            };
            const bemAdicionado = await bemService.adicionarBem(parametros)

            return sendResponse(res,201,{data: bemAdicionado})

        }catch(err){
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
                bem_id: req.body.bem_id,
                sala_id: req.body.sala_id,
                inventario_id: req.body.inventario_id,
                usuario_id: req.body.usuario_id,
                estado: req.body.estado,
                ocioso: req.body.ocioso,
                imagem: req.body.imagem ?? null
            };

            const bemAuditado = await bemService.auditarBem(parametros)
            return res.status(201).json({ error: false, code: 201, message: "Bem auditado", data: bemAuditado});

        }catch(err){
            if (err.message === "Usuario inforamdo não existe.") {
                return sendError(res, 404, ["Usuario inforamdo não existe."])

            }else if (err.message === "Bem inforamdo não existe.") {
                return sendError(res, 404, ["Bem inforamdo não existe."])

            }else if (err.message === "O Bem não pertence ao inventário informado.") {
                return sendError(res, 400, ["O Bem não pertence ao inventário informado."])

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
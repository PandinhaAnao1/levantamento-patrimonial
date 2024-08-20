import { skip } from "node:test";
import InvRepository from "../repositories/InventarioRepository.js";
import IvSchema from "../shemas/InventarioSchema.js";
import {z}  from "zod";

class InventarioService{
    
    static async contarInventarios(filtros){

        const {nome, data, concluido, campus, pagina} = IvSchema.listarSchema.parse(filtros);
        
        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { inve_nome: {contains: nome} }),
                ...(data && { inve_data: data }),
                ...(concluido && { inve_concluido: concluido }),
                ...(campus && { inve_campus: {contains: campus} }),
                
            }
        };

        const totalInventarios = await InvRepository.contarInventarios(filtro);

        if(!totalInventarios){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi contar inventarios com esse parâmetros!",
                code: z.ZodIssueCode.invalid_type,
            }]);
        }

        return totalInventarios;
        

    }
    static async listarInventarios(filtros){
        
        const {nome, data, concluido, campus, pagina} = IvSchema.listarSchema.parse(filtros);

        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { inve_nome: {contains: nome} }),
                ...(data && { inve_data: data }),
                ...(concluido && { inve_concluido: concluido }),
                ...(campus && { inve_campus: {contains: campus} }),
                
            }
        };
        
        const iventario = await InvRepository.listarInventarios(filtro);
    

        if(!iventario) {
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi possivel encontrar inventarios com esse parametros",
                code: z.ZodIssueCode.invalid_type,
            }]);
        }

        return iventario;
        
    }

    static async listarInventarioPorId(parametros){
        //Futuramente vou trocar essa logica vou colocar o esque de validaçã e transformação 
        //do zod
        let id = parametros.id;
        if(isNaN(id)){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"O id do inventario deve ser um numero!",
                code: z.ZodIssueCode.invalid_type,
            }]);
        }
        let zodId = IvSchema.listarPorIdSchema.parse({'id':parseInt(id)});

        let filtro = {
            where:{
                inve_id: zodId.id
            }
        }
        const inventario = await InvRepository.listarPorId(filtro);

        if(!inventario) {
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi possivel encontrar um inventario com esse id",
                code: z.ZodIssueCode.invalid_type,
            }]);
        };

        return inventario;
    }


    static async criarInventario(inventario){

        //Colar verificação se o inventario foi criado

        const {nome,data,campus} = IvSchema.criar.parse(inventario);

        let nvIventa = {
            inve_nome:nome,
            inve_data:data,
            inve_concluido:0,
            inve_campus:campus
        };


        const novoInventario = InvRepository.criar(nvIventa);


        return novoInventario;

    }


    static async atualizarInvetario(atualizacoes){

        //Colar verificação se o inventario foi atualizado

        const {nome, status} = IvSchema.atualizarSchema.parse(nome);
        
        let {idString} = atualizacoes.id;

        const {id} = IvSchema.listarPorId.parse(parseInt(idString));

        let inventarioAtulizado = {
            where: {
                inve_id: id,
            },
            data: {
                ...(nome && { inve_nome: nome}),
                ...(status && { inve_concluido: 1}),                
            },
        }

        const inventario = InvRepository.atualizar(inventarioAtulizado);

        return inventario;

    }
}

export default InventarioService;
import { skip } from "node:test";
import InvRepository from "../repositories/InventarioRepository.js";
import IvSchema from "../shemas/InventarioSchema.js";
import {z, ZodIssueCode}  from "zod";

class InventarioService{
    
    static async contarInventarios(filtros){

        const {nome, data, concluido, campus, pagina} = IvSchema.listarSchema.parse(filtros);

        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { nome: {contains: nome} }),
                ...(data && { data: data }),
                ...(concluido && { concluido: concluido }),
                ...(campus && { campus_id: campus }),
                
            }
        };

        const totalInventarios = await InvRepository.contar(filtro);

        if(!totalInventarios){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi contar inventários com esse parâmetros!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 404, // Adicionando um detalhe personalizado
                  },
            }]);
        }

        return totalInventarios;
        

    }
    static async listarInventarios(filtros){
        
        const {nome, data, concluido, campus, pagina} = IvSchema.listarSchema.parse(filtros);

        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { nome: {contains: nome} }),
                ...(data && { data: data }),
                ...(concluido && { concluido: concluido }),
                ...(campus && { campus_id: campus }),
                
            }
        };
        
        const iventario = await InvRepository.listar(filtro);
    
        if(!iventario) {
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi possível encontrar inventários com esse parâmetros",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 404, // Adicionando um detalhe personalizado
                  },
            }]);
        }

        return iventario;
        
    }

    static async listarInventarioPorId(parametros){
        //Futuramente vou trocar essa logica vou colocar o esquema de validação e transformação 
        //do zod

        let regex = /^[0-9]+$/;
        
        let idString = parametros.id;
        if(!regex.test(idString)){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"O id do inventario deve ser um numero!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 404, // Adicionando um detalhe personalizado
                  },

            }]);
        }
        const {id} = IvSchema.listarPorIdSchema.parse({'id':parseInt(idString)});

        let filtro = {
            where:{
                id: id
            }
        }
        const inventario = await InvRepository.listarPorId(filtro);

        if(!inventario) {
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi possivel encontrar um inventario com esse id",
                code: z.ZodIssueCode.custom,
                params:{
                    status: 404
                }
            }]);
        };

        return inventario;
    }


    static async criarInventario(inventario){

        
        const {nome,data,campus} = IvSchema.criar.parse(inventario);
        //Vou ter que espeara alguem criar a rota de listar campus por id para
        //concluir essa funcao pois vou precisar o listar campus por id
        let body = {
            data:{
                nome:nome,
                data:data,
                concluido:false,
                campus_id: campus
            }
        };


        const novoInventario = InvRepository.criar(body);


        return novoInventario;

    }


    static async atualizarInvetario(atualizacoes){

        let regex = /^[0-9]+$/;

        //Colar verificação se o inventario foi atualizado

        
        const  { id,  ... resto} = atualizacoes;
        //Corrigir o .id usar algma forma melhor
        if(!regex.test(id.id)){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"O id do inventario deve ser um numero!",
                code: z.ZodIssueCode.custom,
                params:{
                    status: 404
                }
            }]);
        }
        let numero  = {id:parseInt(id.id)};
        console.log(numero)
        const {nome, status} = IvSchema.atualizarSchema.parse(resto);

        // if(!status && status != null && status != undefined){
        //     throw new z.ZodError([{
        //         path: ["inventario"],
        //         message:"O inventario pode ser apenas atualizado para concluido!",
        //         code: z.ZodIssueCode.custom,
        //         params:{
        //             status: 404
        //         }
        //     }]);
        // }

        let inventarioAtulizado = {
            where: {
                id: numero.id,
            },
            data: {
                ...(nome && { nome: nome}),
                ...(status && { concluido: true}),                
            },
        }

        const inventario = InvRepository.atualizar(inventarioAtulizado);

        return inventario;

    }
}

export default InventarioService;

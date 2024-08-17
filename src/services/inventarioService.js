import { skip } from "node:test";
import InventarioRepository from "../repositories/InventarioRepository.js";
import {z}  from "zod";

class InventarioService{
    
    static async listarInventarios(filtros){
        
        const {id, nome, data, concluido, campus, pagina} = filtros;
        
        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { inve_nome: {contains: nome} }),
                ...(data && { inve_data: data }),
                ...(concluido && { inve_concluido: concluido }),
                ...(campus && { inve_campus: {contains: campus} }),
                
            }
        };
        
        const iventario = await InventarioRepository.listarInventarios(filtro);
    

        if(!iventario) {
            throw new z.ZodError([{
                message: "Inventário não encontrado!",
                path: ["inventario"], 
                code: z.ZodIssueCode.custom,
            }]);
        }

        return iventario;
        
    }

    static async listarInventarioPorId(id){

        if(!id) throw TypeError("O id enviado é invalido!");

        let filtro = {
            where:{
                inve_id: id
            }
        }
        const inventario =  await InventarioRepository.listarPorId(filtro);
        console.log(inventario);

        if(!inventario) throw TypeError(`Não foi possivel encontrar o inventario com o id: ${id}.`);

        return inventario;

    }


}

export default InventarioService;
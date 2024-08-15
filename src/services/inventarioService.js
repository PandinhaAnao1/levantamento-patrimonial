import { skip } from "node:test";
import InventarioRepository from "../repositories/InventarioRepository.js"

class InventarioService{
    
    static async listarInventarios(filtros){
        
        const {id, nome, data, concluido, campus, pagina} = filtros;
        
        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(id && { inve_id: id }),
                ...(nome && { inve_nome: {contains: nome} }),
                ...(data && { inve_data: data }),
                ...(concluido && { inve_concluido: concluido }),
                ...(campus && { inve_campus: {contains: campus} }),
                
            }
        };
        
        const iventario = await InventarioRepository.listarInventarios(filtro);
        const totalDeItens = await InventarioRepository.contarInventarios(filtro);
    

        if(!iventario && !totalDeItens || totalDeItens == 0) throw TypeError("Não foi possível encontrar nenhum inventario!");

        return {
            inventarios : iventario, 
            total: totalDeItens
        };
        
    }

    static async listarInventarioPorId(id){

        let filtro = {
            where:{
                id: id
            }
        }
        const inventario =  await InventarioRepository.listarPorId(filtro);

        if(!inventario) throw TypeError(`Não foi possivel encontrar o inventario com o id: ${id}.`);

    }


}

export default InventarioService;
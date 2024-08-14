import InventarioRepository from "../repositories/InventarioRepository.js"

class InventarioService{
    
    static async listarInventarios(filtros){
        const {id, nome, data, concluido, campus} = filtros;
        let filtro = {
            where: {
                ...(id && { inve_id: id }),
                ...(nome && { inve_nome: nome }),
                ...(data && { inve_data: data }),
                ...(concluido && { inve_concluido: concluido }),
                ...(campus && { inve_campus: campus })
            }
        };
        
        const iventario = await InventarioRepository.listarInventarios(filtro);

        if(!iventario) throw TypeError("Não foi possível encontrar nenhum inventario!");

        return iventario;
        
    }

    static async listarById(filtro){

        return await InventarioRepository.findById(filtro);

    }


}

export default InventarioService;
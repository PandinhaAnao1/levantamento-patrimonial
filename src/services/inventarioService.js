import InventarioRepository from "../repositories/InventarioRepository.js"

class InventarioService{
    
    static async listarInventarios(filtro){
        let filtro = {
            where:{
                inve_id: id ?? '',
                inve_nome: nome ?? '',
                inve_data: data ?? '',
                inve_concluido: concluido ?? '',
                inve_campus: campus ?? ''
            }
        }

        return await InventarioRepository.findAll(filtro);
        
    }

    static async listarById(filtro){

        return await InventarioRepository.findById(filtro);

    }


}

export default InventarioService;
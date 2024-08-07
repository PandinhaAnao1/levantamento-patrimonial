import InventarioRepository from "../repositories/InventarioRepository.js"

class inventarioService{

    async listarAll(filtro){

        return await InventarioRepository.findAll(filtro)
        
    }

    async listarById(filtro){

        return await InventarioRepository.findById(filtro)

    }


}

export default new inventarioService()
import InventarioRepository from "../repositories/InventarioRepository.js"

class InventarioService{

    static async listarAll(filtro){

        return await InventarioRepository.findAll(filtro)
        
    }

    static async listarById(filtro){

        return await InventarioRepository.findById(filtro)

    }


}

export default InventarioService
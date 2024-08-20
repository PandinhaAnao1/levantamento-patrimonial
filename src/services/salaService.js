import SalaRepository from "../repositories/SalaRepository.js";

class SalaService{
    
    static async listarPorIdSala(filtro){
        return await SalaRepository.findById(filtro);
    }
    static async listarSalas(filtros){

        const {id, id_inventario, nome} = filtros;
        let filtro = {
            where: {
                ...(id && { sala_id: id }),
                ...(nome && { sala_nome: nome }),
                ...(id_inventario && { sala_inve_id: id_inventario }),             
            }
        };

        let salas = await SalaRepository.listarSalas(filtro);

        if (!salas) throw TypeError ("Nehuma sala encontrada.");

        return salas;
    }
}

export default SalaService;
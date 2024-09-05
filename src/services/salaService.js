import SalaRepository from "../repositories/SalaRepository.js";
import salaSchema from "../shemas/salaSchema.js";

class SalaService{
    
    static async listar(parametros){
        const schema = new salaSchema().listarSchema()
        parametros = schema.parse(parametros)

        const filtro = SalaRepository.createFilterSala(parametros)

        const salas = await SalaRepository.filtrar(filtro)

        if (salas.length == 0){
            throw new Error("Salas não encontradas.");
        }

        return salas
    }


    static async listarPorId(parametros){
        const schema = new salaSchema().listarPorIdSchema()
        parametros = schema.parse(parametros)

        const filtro = SalaRepository.createFilterSala(parametros)

        const sala = await SalaRepository.filtrarPorId(filtro)

        if (sala == null){
            throw new Error("Sala não encontrada.");
        }
        
        return sala
    }


    static async cadastrar(parametros){
        console.log(parametros)
        const schema = new salaSchema().CriarSchema()
        parametros = schema.parse(parametros)

        const consulta = SalaRepository.createFilterSala(parametros)

        return SalaRepository.cadastrar({
            data:{nome:parametros.nome, 
                campus_id: parametros.campus_id},
            select:consulta.select
        })
    }


    static async atualizar(parametros){     
        console.log(parametros)   
        const schema = new salaSchema().atualizarSchema()
        parametros = schema.parse(parametros)
        const id = parametros.id

        const consulta = SalaRepository.createFilterSala({id})

        const sala = await SalaRepository.filtrarPorId(consulta)

        if (sala == null){
            throw new Error("Sala não encontrada.");
        }

        return await SalaRepository.atualizar({
            where: consulta.where,
            data:{
                nome: parametros.nome
            },
            select: consulta.select
        })

    }
}

export default SalaService;
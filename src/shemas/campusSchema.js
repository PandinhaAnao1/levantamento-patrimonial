import {z} from 'zod'

class campusSchema{

    static listarCampus = z.object({
        nome: z.string().trim().min(1).max(80).optional(),
        telefone: z.string().trim().min(1).max(80).optional(),
        cidade: z.string().trim().min(1).max(80).optional(),
        bairro: z.string().trim().min(1).max(80).optional(),
        rua: z.string().trim().min(1).max(80).optional(),

    });

    static listarCampusPorId = z.object({id:z.number().int().min(1).positive()});



    static cadastrarCampus = z.object({
        nome: z.string().min(1).trim().max(80),
        telefone: z.string().min(11).trim().max(80), 
        cidade: z.string().min(1).trim().max(200),
        bairro: z.string().min(1).trim().max(80),
        rua: z.string().min(1).trim().max(80)
    });


}
export default campusSchema;
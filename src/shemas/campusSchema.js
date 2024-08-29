import {z} from 'zod'

class campusSchema{

    static listarCampus = z.object({
        nome: z.string().trim().min(1).max(80).optional(),
        telefone: z.string().trim().min(1).max(80).optional(),
        cidade: z.string().trim().min(1).max(80).optional(),
        bairro: z.string().trim().min(1).max(80).optional(),
        rua: z.string().trim().min(1).max(80).optional(),

    });


}
export default campusSchema;
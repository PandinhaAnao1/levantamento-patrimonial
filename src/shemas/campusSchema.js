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
        telefone: z.string().min(1).trim().max(80), 
        cidade: z.string().min(1).trim().max(200),
        bairro: z.string().min(1).trim().max(80),
        rua: z.string().min(1).trim().max(80),
        numoro_residencia: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "inventario_id informado não é do tipo number",
        }).int({
            message: "numero residencial informado não é um número inteiro"
        }).positive({
            message: "residencial informado não é positivo"
        })),
    });

    static atualizarCampus = z.object({
        id: z.number().int().positive(),
        nome: z.string().min(1).max(80).default(null).optional(),
        telefone: z.number().int().positive(),
        rua: z.string().min(1).max(80).default(null).optional(),
        bairro: z.string().min(1).max(80).default(null).optional(),
        cidade: z.string().min(1).max(80).default(null).optional(),
        numoro_residencia: z.number().int().positive(),
    })


}
export default campusSchema;
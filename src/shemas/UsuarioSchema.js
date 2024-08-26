import {z} from 'zod';

class  UsuarioSchema{

    static login = z.object({
        email: z.string().trim().min(1).email(), 
        senha: z.string().trim().min(1).max(200),
    });

    
    static listarUsuarios = z.object({
        nome: z.string().trim().min(1).max(80).optional(),
        email: z.string().trim().min(1).max(80).optional(), 
        senha: z.string().trim().min(6).max(200).optional(),
        status: z.boolean().optional(),
        funcao: z.string().trim().min(1).max(80).optional()
    });

    static listarUsuarioPorId = z.object({id:z.number().int().min(1).positive()});


    static criarUsuario = z.object({
        nome: z.string().min(1).trim().max(80),
        email: z.string().min(1).trim().max(80), 
        senha: z.string().min(6).trim().max(200),
        status: z.boolean(),
        funcao: z.string().min(1).trim().max(80)
    });


    static atualizarUsuarioSchema = z.object({
        id: z.number().int().positive(),
        nome: z.string().trim().min(1).max(80).default(null).optional(),
        email: z.string().trim().min(1).max(80).default(null).optional(), 
        status: z.boolean().default(null).optional(),
        funcao: z.string().trim().min(1).max(80).default(null).optional()
    })
}

export default UsuarioSchema;
import {z} from 'zod';

class  UsuarioSchema{

    static login = z.object({
        email: z.string().min(1).email(), 
        senha: z.string().min(1).max(200),
    });

    
    static listarUsuarios = z.object({

        nome: z.string().min(1).max(80).optional(),
        status: z.string().min(1).optional(),
        funcao: z.string().min(1).optional(),


    });

    static listarUsuarioPorId = z.object({id:z.number().int().min(1).positive()});

}

export default UsuarioSchema;
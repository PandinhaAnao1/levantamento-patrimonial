import {z} from 'zod';

class  UsuarioSchema{

    static login = z.object({
        email: z.string().min(1).email(), 
        senha: z.string().min(1).max(30),
    });

    st
}

export default UsuarioSchema;
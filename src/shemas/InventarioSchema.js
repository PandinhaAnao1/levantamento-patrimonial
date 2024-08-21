import {z} from 'zod';

class InventarioSchema{

    static listarSchema = z.object({
        nome: z.string().min(1).optional(), 
        data: z.string().min(1).optional(),
        concluido: z.literal(true).optional(),
        campus: z.string().min(1).optional(),
        pagina: z.number().int().min(1).positive().optional()
    });

    static listarPorIdSchema = z.object({id:z.number().int().min(1).positive()});

    static criar = z.object({
        nome: z.string().min(1).max(80),
        data: z.date(),
        campus: z.string().min(1).max(100)
    });

    static atualizarSchema = z.object({
        id: z.number(),
        nome: z.string().min(1).max(80).optional(),
        concluido: z.literal(false).optional()
    });
}

export default InventarioSchema;
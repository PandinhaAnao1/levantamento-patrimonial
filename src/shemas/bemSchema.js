import {z} from 'zod'

class bemSchema{

    listarSchema(){
        return z.object({
            sala_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "sala_id informado não é do tipo number",
            }).int({
                message: "sala_id informado não é um número inteiro"
            }).positive({
                message: "sala_id informado não é positivo"
            })).nullable().optional(),
            inventario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "inventario_id informado não é do tipo number",
            }).int({
                message: "inventario_id informado não é um número inteiro"
            }).positive({
                message: "inventario_id informado não é positivo"
            })),
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim().optional(),
            tombo: z.string({invalid_type_error: "tombo informado não é do tipo string"}).trim().optional(),
            descricao: z.string({invalid_type_error: "descricao informado não é do tipo string"}).trim().optional(),
            responsavel: z.string({invalid_type_error: "responsavel informado não é do tipo string"}).trim().optional(),
            auditado: z.boolean().optional(),
        })
    }

    listarPorIdSchema(){
        return z.object({
            bem_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            }))
        })
    }

    createBensSchema(){
        return z.object({
            sala_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "sala_id informado não é do tipo number",
            }).int({
                message: "sala_id informado não é um número inteiro"
            }).positive({
                message: "sala_id informado não é positivo"
            })),
            inventario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "inventario_id informado não é do tipo number",
            }).int({
                message: "inventario_id informado não é um número inteiro"
            }).positive({
                message: "inventario_id informado não é positivo"
            })),
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim(),
            tombo: z.string({invalid_type_error: "tombo informado não é do tipo string"}).trim().nullable(),
            descricao: z.string({invalid_type_error: "descricao informado não é do tipo string"}).trim(),
            responsavel: z.string({invalid_type_error: "responsavel informado não é do tipo string"}).trim().nullable(),
            valor: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "valor informado não é do tipo number",
            }).positive({
                message: "valor informado não é positivo"
            })).nullable().optional(),
            auditado: z.boolean().default(false),
        })
    }

    adicionarBemSchema(){
        return z.object({
            sala_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "sala_id informado não é do tipo number",
            }).int({
                message: "sala_id informado não é um número inteiro"
            }).positive({
                message: "sala_id informado não é positivo"
            })),
            inventario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "inventario_id informado não é do tipo number",
            }).int({
                message: "inventario_id informado não é um número inteiro"
            }).positive({
                message: "inventario_id informado não é positivo"
            })),
            usuario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "usuario_id informado não é do tipo number",
            }).int({
                message: "usuario_id informado não é um número inteiro"
            }).positive({
                message: "usuario_id informado não é positivo"
            })),
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim(),
            descricao: z.string({invalid_type_error: "descricao informado não é do tipo string"}).trim(),
            estado: z.string({invalid_type_error: "estado informado não é do tipo string"}).trim(),
            ocioso: z.boolean({invalid_type_error: "ocioso informado não é do tipo boolean"}),
            imagem: z.string({invalid_type_error: "imagem informado não é do tipo string"}).trim().nullable().optional()
        })
    }

    auditarBemSchema(){
        return z.object({
            bem_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "bem_id informado não é do tipo number",
            }).int({
                message: "bem_id informado não é um número inteiro"
            }).positive({
                message: "bem_id informado não é positivo"
            })),
            sala_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "sala_id informado não é do tipo number",
            }).int({
                message: "sala_id informado não é um número inteiro"
            }).positive({
                message: "sala_id informado não é positivo"
            })),
            inventario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "inventario_id informado não é do tipo number",
            }).int({
                message: "inventario_id informado não é um número inteiro"
            }).positive({
                message: "inventario_id informado não é positivo"
            })),
            usuario_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "usuario_id informado não é do tipo number",
            }).int({
                message: "usuario_id informado não é um número inteiro"
            }).positive({
                message: "usuario_id informado não é positivo"
            })),
            estado: z.string({invalid_type_error: "estado informado não é do tipo string"}).trim(),
            ocioso: z.boolean({invalid_type_error: "ocioso informado não é do tipo boolean"}),
            imagem: z.string({invalid_type_error: "imagem informado não é do tipo string"}).trim().nullable().optional(),
        })
    }
}

export default bemSchema;
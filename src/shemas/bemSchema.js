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
            imagem: z.string({invalid_type_error: "imagem informado não é do tipo string"}).trim().nullable().optional(),
            encontrado: z.boolean().default(true),
        })
    }

    auditarBemSchema(){
        return z.object({
            bens_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "bens_id informado não é do tipo number",
            }).int({
                message: "bens_id informado não é um número inteiro"
            }).positive({
                message: "bens_id informado não é positivo"
            })),
            sala_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "sala_id informado não é do tipo number",
            }).int({
                message: "sala_id informado não é um número inteiro"
            }).positive({
                message: "sala_id informado não é positivo"
            })),
            inve_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "inve_id informado não é do tipo number",
            }).int({
                message: "inve_id informado não é um número inteiro"
            }).positive({
                message: "inve_id informado não é positivo"
            })),
            usua_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "usua_id informado não é do tipo number",
            }).int({
                message: "usua_id informado não é um número inteiro"
            }).positive({
                message: "usua_id informado não é positivo"
            })),
            bens_estado: z.string({invalid_type_error: "bens_estado informado não é do tipo string"}).trim(),
            bens_ocioso: z.boolean({invalid_type_error: "bens_ocioso informado não é do tipo boolean"}),
            bens_imagem: z.string({invalid_type_error: "bens_imagem informado não é do tipo string"}).trim().nullable().optional(),
            bens_encontrado: z.boolean().default(true),
        })
    }
}

export default bemSchema;
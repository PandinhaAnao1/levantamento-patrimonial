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
            })).nullable().optional()

        })
    }

    listarPorIdSchema(){
        return z.object({
            bens_id: z.preprocess((val) => Number(val), z.number({
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
            bens_nome: z.string({invalid_type_error: "bens_nome informado não é do tipo string"}),
            bens_tombo: z.string({invalid_type_error: "bens_tombo informado não é do tipo string"}),
            bens_decricao: z.string({invalid_type_error: "bens_decricao informado não é do tipo string"}),
            bens_responsavel: z.string({invalid_type_error: "bens_responsavel informado não é do tipo string"}),
            bens_encontrado: z.boolean().default(false),
            bens_valor: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "bens_valor informado não é do tipo number",
            }).positive({
                message: "bens_valor informado não é positivo"
            })),
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
            bens_nome: z.string({invalid_type_error: "bens_nome informado não é do tipo string"}),
            bens_decricao: z.string({invalid_type_error: "bens_decricao informado não é do tipo string"}),
            bens_estado: z.string({invalid_type_error: "bens_estado informado não é do tipo string"}),
            bens_ocioso: z.boolean({invalid_type_error: "bens_ocioso informado não é do tipo boolean"}),
            bens_imagem: z.string({invalid_type_error: "bens_imagem informado não é do tipo string"}).nullable().optional(),
            bens_responsavel: z.string({invalid_type_error: "bens_responsavel informado não é do tipo string"}).default(""),
            bens_encontrado: z.boolean().default(true),
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
            bens_estado: z.string({invalid_type_error: "bens_estado informado não é do tipo string"}),
            bens_ocioso: z.boolean({invalid_type_error: "bens_ocioso informado não é do tipo boolean"}),
            bens_imagem: z.string({invalid_type_error: "bens_imagem informado não é do tipo string"}).nullable().optional(),
            bens_encontrado: z.boolean().default(true),
        })
    }
}

export default bemSchema;
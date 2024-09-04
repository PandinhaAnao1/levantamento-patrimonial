import {z} from 'zod'

class salaSchema{
    listarSchema(){
        return z.object({
            campus_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            })).optional(),
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim().optional()
        })
    }

    listarPorIdSchema(){
        return z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            }))
        })
    }

    CriarSchema(){
        return z.object({
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim(),
            campus_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            })),
        })
    }

    atualizarSchema(){
        return z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            })),
            campus_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            })).optional(),
            nome: z.string({invalid_type_error: "nome informado não é do tipo string"}).trim().optional()
        })
    }
}

export default salaSchema
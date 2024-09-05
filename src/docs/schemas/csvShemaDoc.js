const csvSchemas = {

    createcsvRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: "Inventário criado com sucesso."
        }
        
    },

    // erros
    erro400csv: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 400,
                    message: "Requisição com sintaxe incorreta ou outros problemas.",
                    errors: ["O Zod encrontrou algum erro na requisição.", "arquivo do tipo errado.", "Estrutura do CSV está incorreta."],
                    data: []
                }
            }
        }
    },
    
    erro403csv: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 403,
                    message: "Sem permissão para atender a requisição.",
                    errors: ["O nome do inventário já está em uso."],
                    data: []
                }
            }
        }
    },

    erro404csv: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Campus não existe."],
                    data: []
                }
            }
        }
    },

    erro500: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 500,
                    message: "Servidor encontrou um erro interno.",
                    errors: ["OCORREU UM ERRO INTERNO"],
                    data: []
                }
            }
        }
    },
};

export default csvSchemas;
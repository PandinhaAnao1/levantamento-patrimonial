const salaSchemas = {

    atualizarSalaBody: {
        type: "object",
        example: {
            nome: "sala de confraternização atualizada"
        } 
    },

    atualizarSalaRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: {
                id: 49,
                nome: "sala de confraternização atualizada"
            }
        }
    },

    createSalaBody: {
        type: "object",
        example: {
            nome: "sala de confraternização"
        }
        
    },

    createSalaRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: {
                id: 49,
                nome: "sala de confraternização"
            }
        }
        
    },

    get_Sala: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: [
                {
                    id: 1,
                    nome: "teste"
                },
                {
                    id: 2,
                    nome: "Cantina de alimentação piso 1"
                },
                {
                    id: 3,
                    nome: "Laboratório de química do piso 2 sala 12"
                },
                {
                    id: 4,
                    nome: "Sala de pesquisa avançada em IA"
                },
                {
                    id: 5,
                    nome: "Sala de Reunião de grupos de Fábrica"
                }
            ]
        }
    },
    get_Sala_por_id: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: {
                    id: 1,
                    nome: "teste"
            }
        }
    },

    // erros
    erro400Sala: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 400,
                    message: "Requisição com sintaxe incorreta ou outros problemas.",
                    errors: ["O Zod encrontrou algum erro na requisição."],
                    data: []
                }
            }
        }
    },

    erro404listar: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Salas não encontradas."],
                    data: []
                }
            }
        }
    },

    erro404AtualizarListar: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Sala não encontrada."],
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

export default salaSchemas;

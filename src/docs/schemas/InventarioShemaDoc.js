const inventarioSchemas = {

    IventarioListar: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: [
                {
                    id: 1,
                    nome: "Inventario teste",
                    data: "2024-08-19T00:00:00.000Z",
                    concluido: true,
                    campus_id: 1
                },
            ],
            resultados: 2,
            totalPaginas: 1,
            limite: 10
        }
    },

    BemListarPorIdRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: {
                id: 21,
                sala_id: 4,
                inventario_id: 2,
                nome: "Computador i5 7500KF",
                tombo: "TB2345",
                responsavel: "Salomao Carvalho",
                descricao: "Labore maxime alias impedit vel doloremque nobis. Eos perferendis placeat ut voluptates nulla recusandae ratione non.",
                auditado: false,
                valor: "1132"
            }
        }
    },

    BemCriadoBody: {
        type: "object",
        example: {
            sala_id: 4,
            inventario_id: 2,
            nome: "Computador i5 7500KF",
            tombo: "TB2345",
            responsavel: "Salomao Carvalho",
            descricao: "Labore maxime alias impedit vel doloremque nobis. Eos perferendis placeat ut voluptates nulla recusandae ratione non.",
            auditado: false,
            valor: "1132"
        }

    },

    BemCriadoRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: [{
                bens_id: 1,
                bens_sala_id: 1,
                bens_nome: "Notebook Lenovo",
                bens_tombo: "TOMBO007",
                bens_responsavel: "Ana Silva",
                bens_decricao: "Notebook leve e portátil, processador Intel i5",
                bens_imagem: null,
                bens_valor: "1249.99",
                bens_estado: null,
                bens_ocioso: null,
                bens_encontrado: false
            }]
        }
    },

    BemAdicionarBody: {
        type: "object",
        example: {
            bem_id: 24,
            sala_id: 1,
            inventario_id: 2,
            usuario_id: 1,
            estado: "ruim",
            ocioso: true,
            imagem: null
        }

    },

    BemAdicionar_AuditarRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Bem auditado",
            data: {
                levantamento: {
                    id: 22,
                    usuario_id: 1,
                    inventario_id: 2,
                    sala_id: 1,
                    bem_id: 24,
                    estado: "ruim",
                    ocioso: true,
                    imagem: null
                },
                bem: {
                    id: 24,
                    sala_id: 4,
                    inventario_id: 2,
                    nome: "Computador i5 7500KF",
                    tombo: "TB2345",
                    responsavel: "Salomao Carvalho",
                    descricao: "Labore maxime alias impedit vel doloremque nobis. Eos perferendis placeat ut voluptates nulla recusandae ratione non.",
                    auditado: false,
                    valor: "1132"
                }
            }
        }
    },

    BemAuditarBody: {
        type: "object",
        example: {
            bem_id: 1,
            sala_id: 1,
            inventario_id: 2,
            usuario_id: 1,
            estado: "ruim",
            ocioso: true,
            imagem: null
        }

    },

    // erros
    erro400: {
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

    erro403: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 403,
                    message: "Sem permissão para atender a requisição.",
                    errors: ["Bem já foi auditado."],
                    data: []
                }
            }
        }
    },

    erro404Get: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Nem um registro encontrado"],
                    data: []
                }
            }
        }
    },

    erro404Create: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Sala ou inventário informado não existe."],
                    data: []
                }
            }
        }
    },

    erro404Adicionar: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["usuario, sala ou inventário não existem"],
                    data: []
                }
            }
        }
    },

    erro404Auditar: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Usuario não existe", "Bem inforamdo não existe"],
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

export default inventarioSchemas;

const bensRoutes = {
    "/bens": {
        get: {
            tags: ["Bens"],
            summary: "Lista todos os bens",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                sala_id: {
                                    type: "integer",
                                    description: "ID da sala onde o bem está.",
                                    example: 1
                                },
                                inventario_id: {
                                    type: "integer",
                                    description: "ID do inventário ao qual o bem pertence.",
                                    example: 1,
                                    required: true,
                                },
                                nome: {
                                    type: "string",
                                    description: "Nome do bem.",
                                    example: "a"
                                },
                                tombo: {
                                    type: "string",
                                    description: "Tombo do bem.",
                                    example: "TB2345"
                                },
                                responsavel: {
                                    type: "string",
                                    description: "Nome do responsável pelo bem.",
                                    example: "a"
                                },
                                descricao: {
                                    type: "string",
                                    description: "Descrição do bem.",
                                    example: "a"
                                },
                                auditado: {
                                    type: "boolean",
                                    description: "Informa se o bem está auditado ou não.",
                                    example: true
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Requisição bem-sucedida.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/BemListarRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400"
                    }                
                },
                "404": {
                    description: "Nenhum registro encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404Get"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        },
        post: {
            tags: ["Bens"],
            summary: "Cria um novo bem",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/BemCriadoBody"
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Bem criado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/BemCriadoRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400"
                    }                
                },
                "404": {
                    description: "O sala_id informado não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404Create"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    },
    "/bens/:id": {
        get: {
            tags: ["Bens"],
            summary: "Busca um bem pelo ID.",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "Filtra um bem pelo ID.",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Bem encontrado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/BemListarPorIdRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400"
                    }                
                },
                "404": {
                    description: "Nenhum registro encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404Get"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    },
    "/bens/adicionar": {
        post: {
            tags: ["Bens"],
            summary: "Cria um novo bem e já o audita.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/BemAdicionarBody"
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Bem criado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/BemAdicionar_AuditarRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400"
                    }                
                },
                "404": {
                    description: "Usuário, sala ou inventário não existem.",
                    content: {
                        $ref: "#/components/schemas/erro404Adicionar"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    },
    "/bens/auditar": {
        post: {
            tags: ["Bens"],
            summary: "Cria um novo bem e já o audita.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/BemAuditarBody"
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Bem criado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/BemAdicionar_AuditarRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400"
                    }                
                },
                "403": {
                    description: "O bem informado já foi auditado.",
                    content: {
                        $ref: "#/components/schemas/erro403"
                    }                
                },
                "404": {
                    description: "Usuário não existe ou bem informado não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404Auditar"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500"
                    }                
                },
            }
        }
    }
};

export default bensRoutes;

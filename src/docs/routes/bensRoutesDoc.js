const bensRoutes = {
    "/bens": {
        get: {
            tags: ["Bens"],
            summary: "Lista todos os bens",
            security: [{ BearerAuth: [] }],
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
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                
            }
        },
    },
    "/bens/:id": {
        get: {
            tags: ["Bens"],
            summary: "Busca um bem pelo ID dele.",
            security: [{ BearerAuth: [] }],
            parameters:  [
                {
                    name: "bens_id",
                    in: "query",
                    description: "Filtra um bem pelo ID.",
                    required: true,
                    schema: {
                        type: "Int"
                    }
                }
            ],
            responses: {
                
            }
        }
    },
    "/bens/create": {
        post: {
            tags: ["Bens"],
            summary: "Cria um novo bem",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "sala_id",
                    in: "query",
                    description: "ID da sala onde o bem se encontra.",
                    required: true,
                    schema: {
                        type: "Int"
                    }
                },
                {
                    name: "bens_nome",
                    in: "query",
                    description: "Nome do bem.",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "bens_descricao",
                    in: "query",
                    description: "Descrição do bem.",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "bens_tombo",
                    in: "query",
                    description: "ID CPALM do bem.",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },                
                {
                    name: "bens_responsavel",
                    in: "query",
                    description: "Pessoa responsavel pelo bem.",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "bens_valor",
                    in: "query",
                    description: "Categoria do bem para filtrar",
                    required: false,
                    schema: {
                        type: "decimal"
                    }
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/BemCriado"
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
                                $ref: "#/components/schemas/BemCriado"
                            }
                        }
                    }
                },
                "400": {
                    description: "Erro de solicitação inválida"
                },
                "401": {
                    description: "Não autorizado"
                },
                "500": {
                    description: "Erro interno do servidor"
                }
            }
        }
    }
    
};

export default bensRoutes;

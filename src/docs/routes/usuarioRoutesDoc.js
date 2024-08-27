const usuarioRoutes = {
    "/usuario": {
        get: {
            tags: ["Usuários"],
            summary: "Lista todos os usuario",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "nome",
                    in: "query",
                    description: "Nome do usuário.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "funcao",
                    in: "query",
                    description: "Função do usuário",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "status",
                    in: "query",
                    description: "Status da usuário, true ou false.",
                    schema: {
                        type: "boolean"
                    }
                },
                {
                    name: "email",
                    in: "query",
                    description: "Email do usuário",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Requisição bem-sucedida.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/get_usuario"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400usuario"
                    }                
                },
                "404": {
                    description: "Nenhum registro encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404usuario"
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
            tags: ["Usuários"],
            summary: "Lista todos os usuario",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/createUsuárioBody"
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Requisição bem-sucedida.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createUsuárioRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400usuario"
                    }                
                },
                "404": {
                    description: "Email já está em uso.",
                    content: {
                        $ref: "#/components/schemas/erro404usuarioCreate"
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
        "/usuario/{id}": {
            get: {
                tags: ["Usuários"],
                summary: "Lista todos os usuario",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "id do usuário",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Requisição bem-sucedida.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/get_usuario_por_id"
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Houve um erro em algum parâmetro do corpo da requisição.",
                        content: {
                            $ref: "#/components/schemas/erro400usuario"
                        }                
                    },
                    "404": {
                        description: "Nenhum registro encontrado.",
                        content: {
                            $ref: "#/components/schemas/erro404usuarioPorId"
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
        patch: {
            tags: ["Usuários"],
            summary: "Atualizar uma conta",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID do usuário",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/atualizarUsuarioBody"
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Usuário atualizado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/atualizarUsuarioRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400usuario"
                    }                
                },
                "404": {
                    description: "O usuário informado não foi encontrado.",
                    content: {
                        $ref: "#/components/schemas/erro404usuario"
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
}

export default usuarioRoutes;

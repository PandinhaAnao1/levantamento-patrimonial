const usuarioRoutes = {
    "/usuario": {
        get: {
            tags: ["Usuários"],
            summary: "Lista todos os usuario",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "sala_id",
                    in: "query",
                    description: "ID da sala onde o bem está.",
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "inventario_id",
                    in: "query",
                    description: "ID do inventário ao qual o bem pertence.",
                    required: true,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "nome",
                    in: "query",
                    description: "Nome do bem.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "tombo",
                    in: "query",
                    description: "Tombo do bem.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "responsavel",
                    in: "query",
                    description: "Nome do responsável pelo bem.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "descricao",
                    in: "query",
                    description: "Descrição do bem.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "auditado",
                    in: "query",
                    description: "Informa se o bem está auditado ou não.",
                    schema: {
                        type: "boolean"
                    }
                },
            ],
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
        patch: {
            tags: ["Usuários"],
            summary: "Atualizar uma conta",
            security: [{ bearerAuth: [] }],
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

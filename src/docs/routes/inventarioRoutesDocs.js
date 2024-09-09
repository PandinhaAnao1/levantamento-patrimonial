const inventarioRoutes = {
    "/inventarios": {
        get: {
            tags: ["Inventários"],
            summary: "Lista todos os Inventario",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "nome",
                    in: "query",
                    description: "Nome do inventario.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "data",
                    in: "query",
                    description: "A data que inventario foi criado.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "concluido",
                    in: "query",
                    description: "Filtra Se o inventario ja foi finalizado ou não.",
                    schema: {
                        type: "boolean"
                    }
                },
                {
                    name: "campus",
                    in: "query",
                    description: "ID do campus  que foi feito o inventario.",
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "pagina",
                    in: "query",
                    description: "ID da sala onde o bem está.",
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
                                $ref: "#/components/schemas/IventarioListar"
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
            tags: ["Inventários"],
            summary: "Lista todos os Inventario",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "nome",
                    in: "query",
                    description: "Nome do inventario.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "data",
                    in: "query",
                    description: "A data que inventario foi criado.",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "concluido",
                    in: "query",
                    description: "Filtra Se o inventario ja foi finalizado ou não.",
                    schema: {
                        type: "boolean"
                    }
                },
                {
                    name: "campus",
                    in: "query",
                    description: "ID do campus  que foi feito o inventario.",
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "pagina",
                    in: "query",
                    description: "ID da sala onde o bem está.",
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
                                $ref: "#/components/schemas/IventarioListar"
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
       
    }
};

export default inventarioRoutes;

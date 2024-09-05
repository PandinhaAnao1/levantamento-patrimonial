const csvRoutes = {
    "/inventarios/csv": {
        post: {
            tags: ["Import csv"],
            summary: "Criar um invetário e popular o banco com os dados do CSV",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                file: {
                                    type: "string",
                                    format: "binary",
                                    description: "Arquivo CSV a ser enviado"
                                },
                                campus_id: {
                                    type: "integer",
                                    description: "ID do campus associado ao inventário"
                                },
                                nome: {
                                    type: "string",
                                    description: "Nome do inventário a ser criado."
                                }
                            },
                            required: ["file", "campus_id","nome"]
                        }
                    }
                },
                required: true
            },
            responses: {
                "201": {
                    description: "Inventário criado com sucesso.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createcsvRes"
                            }
                        }
                    }
                },
                "400": {
                    description: "Houve um erro em algum parâmetro do corpo da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400csv"
                    }                
                },
                "403": {
                    description: "O nome do inventário já está em uso..",
                    content: {
                        $ref: "#/components/schemas/erro403csv"
                    }                
                },
                "404": {
                    description: "Campus não existe.",
                    content: {
                        $ref: "#/components/schemas/erro404csv"
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

export default csvRoutes;

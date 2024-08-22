const loginRoutes = {
    "/login": {
        post: {
            tags: ["Login"],
            summary: "Realiza o login do usuario e informa o token de acesso.",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    description: "Email do usuario.",
                                    example: "test123@gmail.com"
                                },
                                senha: {
                                    type: "string",
                                    description: "Senha do usuario",
                                    example: "senhatest"
                                },
                                required: ["email", "senha"]
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Requisição bem sucedida.",
                    content:{
                        $ref: "#/components/schemas/retornoLogin"
                    }
                },
                "400": {
                    description: "Ouve um erro em algum parametro do body da requisição.",
                    content: {
                        $ref: "#/components/schemas/erro400"
                    }                
                },
                "404": {
                    description: "Nem um registro encontrado.",
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
}

export default loginRoutes;
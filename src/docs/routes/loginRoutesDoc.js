const loginRoutes = {
    "/login": {
        post: {
            tags: ["Login"],
            summary: "Realiza o login do usuário e fornece o token de acesso.",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    description: "Email do usuário.",
                                    example: "emailExample@gmail.com"
                                },
                                senha: {
                                    type: "string",
                                    description: "Senha do usuário",
                                    example: "senhatest"
                                }
                            },
                            required: ["email", "senha"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Requisição bem-sucedida.",
                    content: {
                        $ref: "#/components/schemas/retornoLogin"
                    }
                },
                "401": {
                    description: "E-mail inválido ou senha não fornecida.",
                    content: {
                        $ref: "#/components/schemas/typeErrorLogin"
                    }                
                },
                "500": {
                    description: "Servidor encontrou um erro interno.",
                    content: {
                        $ref: "#/components/schemas/erro500Login"
                    }                
                },
            }
        },
    }
}

export default loginRoutes;

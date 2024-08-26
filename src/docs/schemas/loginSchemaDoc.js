const loginSchema = {
    retornoLogin: {
        "application/json": {
            schema: {
            type: "object",
                example: {
                    error: false,
                    code: 200,
                    message: "Requisição bem sucedida.",
                    errors: [],
                    data: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNzI0Mjg3Mjk4LCDjzZzLZ377MBSw4sHlw",
                        user: {
                            id: 1,
                            nome: "Desirê Carvalho",
                            email: "test123@gmail.com",
                            funcao: "auditor",
                            status: true
                        }
                    }
                }
            }
        }
    },

    typeErrorLogin: {
        "application/json": {
            schema: {
            type: "object",
                example: {
                    data: [],
                    error: true,
                    code: 401,
                    message: "Cliente sem credenciais para acessar o recurso solicitado.",
                    errors: [
                        {
                            "message": "Usuario não exite na base de dados verifique se o email esta correto!"
                        },
                        {
                            "message": "Senha informada esta incorreta!"
                        }
                    ]
                }
            }
        }
    },
    
    erro500Login: {
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
}

export default loginSchema;
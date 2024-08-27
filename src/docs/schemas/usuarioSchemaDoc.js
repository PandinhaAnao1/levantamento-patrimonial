const usuarioSchemas = {

    atualizarUsuarioRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: {
                id: 2,
                nome: "Lucas Ferreira",
                email: "lucasTest@gamil.com",
                funcao: "CPALM",
                status: true,
            }
        }
    },

    atualizarUsuarioBody: {
        type: "object",
        example: {
            nome: "Lucas Ferreira",
            email: "lucasTest@gamil.com",
            funcao: "CPALM",
            status: true,
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
                bens_sala_id:1,
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

    createUsuárioBody: {
        type: "object",
        example: {
            nome: "lucas",
            funcao: "CPALM",
            status: true,
            senha: "testesenha",
            email: "lucastestp@gmai.com"
        }
        
    },

    createUsuárioRes: {
        type: "object",
        example: {
            error: false,
            code: 201,
            message: "Requisição bem sucedida, recurso foi criado",
            errors: [],
            data: {
                id: 6,
                nome: "lucas",
                funcao: "CPALM",
                status: true,
                email: "lucastestp@gmai.com"
            }
        }
        
    },

    get_usuario: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data: [
                {
                    id: 1,
                    nome: "Adilson",
                    funcao: "auditor",
                    status: true,
                    email: "emailExample@gmail.com"
                },
                {
                    id: 2,
                    nome: "Márcio Oliveira",
                    funcao: "auditor",
                    status: true,
                    email: "Marly16@bol.com.br"
                }
            ]
        }
    },
    get_usuario_por_id: {
        type: "object",
        example: {
            error: false,
            code: 200,
            message: "Requisição bem sucedida.",
            errors: [],
            data:{
                    id: 1,
                    nome: "Adilson",
                    funcao: "auditor",
                    status: true,
                    email: "emailExample@gmail.com"
            }
        }
    },

    // erros
    erro400usuario: {
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

    erro404usuario: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Nem um usuário encontrado"],
                    data: []
                }
            }
        }
    },

    erro404usuarioPorId: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Usuario não encontrado."],
                    data: []
                }
            }
        }
    },

    erro404usuarioCreate: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    error: true,
                    code: 404,
                    message: "O recurso solicitado não foi encontrado no servidor.",
                    errors: ["Não foi possivel criar usuario pois email já está cadastrado."],
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

export default usuarioSchemas;

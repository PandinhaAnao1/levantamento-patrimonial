const bensSchemas = {

    listarBem: {
        type: "object",
        properties: {
            bens_id: {
                type: "integer",
                description: "ID do bem"
            },
            bens_sala_id: {
                type: "integer",
                description: "ID da sala onde o bem está localizado"
            },
            bens_nome: {
                type: "string",
                description: "Nome do bem"
            },
            bens_tombo: {
                type: "string",
                description: "Número de tombamento do bem"
            },
            bens_responsavel: {
                type: "string",
                description: "Responsável pelo bem"
            },
            bens_decricao: {
                type: "string",
                description: "Descrição do bem"
            },
            bens_valor: {
                type: "Decimal",
                description: "Valor do bem"
            },
            bens_estado: {
                type: "string",
                description: "Estado de conservação do bem"
            },
            bens_ocioso: {
                type: "boolean",
                description: "Indica se o bem está ocioso"
            },
            bens_encontrado: {
                type: "boolean",
                description: "Indica se o bem foi encontrado"
            }
        },
        example: {
            "error": false,
            "code": 200,
            "message": "Requisição bem sucedida.",
            "errors": [],
            "data": [{
            bens_id: 1,
            bens_sala_id: 1,
            bens_nome: "Notebook Lenovo",
            bens_tombo: "TOMBO007",
            bens_responsavel: "Ana Silva",
            bens_decricao: "Notebook leve e portátil, processador Intel i5",
            bens_valor: "1249.99",
            bens_estado: "em bom estado",
            bens_ocioso: false,
            bens_encontrado: true
            }]
        }
    },

    
    bensFiltro: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nome do usuário"
            },
            email: {
                type: "string",
                description: "Email do usuário"
            },
            grupo: {
                type: "string",
                description: "Nome de um grupo que o usuário faça parte"
            },
        },
        example: {
            name: "Computador",
            category: "Eletrônico",
            status: "Disponível"
        }
    },

    BemCriado: {
        type: "object",
        properties: {
            bens_id: {
                type: "integer",
                description: "ID do bem recém-criado"
            },
            bens_nome: {
                type: "string",
                description: "Nome do bem",
                example: "Notebook Lenovo"
            },
            bens_tombo: {
                type: "string",
                description: "Número de tombamento do bem",
                example: "TOMBO007"
            },
            bens_responsavel: {
                type: "string",
                description: "Responsável pelo bem",
                example: "Ana Silva"
            },
            bens_decricao: {
                type: "string",
                description: "Descrição do bem",
                example: "Notebook leve e portátil, processador Intel i5"
            },
            bens_valor: {
                type: "string",
                description: "Valor do bem",
                example: "1249.99"
            },
            bens_estado: {
                type: "string",
                description: "Estado de conservação do bem",
                example: "em bom estado"
            },
            bens_ocioso: {
                type: "boolean",
                description: "Indica se o bem está ocioso",
                example: false
            },
            bens_encontrado: {
                type: "boolean",
                description: "Indica se o bem foi encontrado",
                example: true
            }
        },
        example: {
            bens_id: 1,
            bens_nome: "Notebook Lenovo",
            bens_tombo: "TOMBO007",
            bens_responsavel: "Ana Silva",
            bens_decricao: "Notebook leve e portátil, processador Intel i5",
            bens_valor: "1249.99",
            bens_estado: "em bom estado",
            bens_ocioso: false,
            bens_encontrado: true
        }
    },

    UsuarioListagem: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID do usuário" },
            name: { type: "string", description: "Nome do usuário" },
            email: { type: "string", description: "Email do usuário" },
            site: { type: "string", description: "Site do usuário" },
            login: { type: "string", description: "Login do usuário" },
            password: { type: "string", description: "Senha do usuário" },
            system_unit_id: { type: "integer", description: "ID da unidade do usuário" },
            frontpage_id: { type: "integer", description: "ID da página inicial do usuário" },
            photo_path: { type: "string", description: "Caminho da foto do usuário" },
            active: { type: "string", description: "Status de atividade do usuário" },
            accepted_term_policy: { type: "string", description: "Aceitação dos termos de política" },
            accepted_term_policy_at: { type: "string", description: "Data de aceitação dos termos de política" },
            accepted_term_policy_data: { type: "string", description: "Dados de aceitação dos termos de política" },
            phone: { type: "string", description: "Telefone do usuário" },
            address: { type: "string", description: "Endereço do usuário" },
            about: { type: "string", description: "Sobre o usuário" },
            function_name: { type: "string", description: "Nome da função do usuário" },
            custom_code: { type: "string", description: "Código customizado do usuário" },
            otp_secret: { type: "string", description: "Segredo OTP do usuário" }
        },
        example: {
            id: 1,
            name: "João da Silva",
            email: "joao.silva@example.com",
            site: "http://exemplo.com",
            login: "joaosilva",
            password: "123456",
            system_unit_id: 1,
            frontpage_id: 10,
            photo_path: "/fotos/joaosilva.jpg",
            active: "Y",
            accepted_term_policy: "Y",
            accepted_term_policy_at: "2023-01-01",
            accepted_term_policy_data: "Termos aceitos em 2023-01-01",
            phone: "123456789",
            address: "Rua Exemplo, 123",
            about: "Usuário exemplo",
            function_name: "Administrador",
            custom_code: "12345",
            otp_secret: "abcdef123456"
        }
    },
    UsuarioDetalhes: {
        type: "object",
        properties: {
            id: { type: "integer", description: "ID do usuário" },
            name: { type: "string", description: "Nome do usuário" },
            email: { type: "string", description: "Email do usuário" },
            site: { type: "string", description: "Site do usuário" },
            login: { type: "string", description: "Login do usuário" },
            password: { type: "string", description: "Senha do usuário" },
            system_unit_id: { type: "integer", description: "ID da unidade do usuário" },
            frontpage_id: { type: "integer", description: "ID da página inicial do usuário" },
            photo_path: { type: "string", description: "Caminho da foto do usuário" },
            active: { type: "string", description: "Status de atividade do usuário" },
            accepted_term_policy: { type: "string", description: "Aceitação dos termos de política" },
            accepted_term_policy_at: { type: "string", description: "Data de aceitação dos termos de política" },
            accepted_term_policy_data: { type: "string", description: "Dados de aceitação dos termos de política" },
            phone: { type: "string", description: "Telefone do usuário" },
            address: { type: "string", description: "Endereço do usuário" },
            about: { type: "string", description: "Sobre o usuário" },
            function_name: { type: "string", description: "Nome da função do usuário" },
            custom_code: { type: "string", description: "Código customizado do usuário" },
            otp_secret: { type: "string", description: "Segredo OTP do usuário" }
        },
        example: {
            id: 1,
            name: "João da Silva",
            email: "joao.silva@example.com",
            site: "http://exemplo.com",
            login: "joaosilva",
            password: "123456",
            system_unit_id: 1,
            frontpage_id: 10,
            photo_path: "/fotos/joaosilva.jpg",
            active: "Y",
            accepted_term_policy: "Y",
            accepted_term_policy_at: "2023-01-01",
            accepted_term_policy_data: "Termos aceitos em 2023-01-01",
            phone: "123456789",
            address: "Rua Exemplo, 123",
            about: "Usuário exemplo",
            function_name: "Administrador",
            custom_code: "12345",
            otp_secret: "abcdef123456"
        }
    }

};

export default bensSchemas;

import bensRoutes from "../routes/bensRoutesDoc.js";
import bensSchemas from "../shemas/bensShemaDoc.js";

// Função para definir as URLs do servidor dependendo do ambiente

// Função para obter as opções do Swagger
const getSwaggerOptions = () => {
    return {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "API Levantamento Patrimonial",
                version: "1.0-alpha",
                description: "API AUTH Levantamento Patrimonial\n\nÉ necessário autenticar com token JWT antes de utilizar a maioria das rotas, faça isso na rota /login com um email e senha válido.",
            },
            tags: [
                {
                    name: "login",
                    description: "Rotas para autenticação"
                },
                {
                    name: "Usuários",
                    description: "Rotas para gestão de usuários"
                },
                {
                    name: "Inventários",
                    description: "Rotas para gestão de Inventários"
                },
                {
                    name: "Salas",
                    description: "Rotas para gestão de Salas"
                },
                {
                    name: "Bens",
                    description: "Rotas para gestão de Bens"
                },
            ],
            paths: {
                ...bensRoutes,
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                },
                schemas: {
                    ...bensSchemas
                }
            },
            security: [{
                bearerAuth: []
            }]
        },
        apis: ["./src/routes/*.js"]
    };
};

export default getSwaggerOptions;

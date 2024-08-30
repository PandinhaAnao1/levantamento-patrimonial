import bensRoutes from "../routes/bensRoutesDoc.js";
import bensSchemas from "../schemas/bensShemaDoc.js";
import loginRoutes from "../routes/loginRoutesDoc.js";
import loginSchema from "../schemas/loginSchemaDoc.js";
import usuarioRoutes from "../routes/usuarioRoutesDoc.js";
import usuarioSchemas from "../schemas/usuarioSchemaDoc.js";
import salaRoutes from "../routes/salaRoutesDoc.js";
import salaSchemas from "../schemas/salaSchemaDoc.js";

// Função para definir as URLs do servidor dependendo do ambiente
const getServersInCorrectOrder = () => {
    const devUrl = { url: process.env.SWAGGER_DEV_URL || "http://localhost:3000" };
    const prodUrl = { url: process.env.SWAGGER_PROD_URL || "http://localhost:3000" };

    if (process.env.NODE_ENV === "production") return [prodUrl, devUrl];
    else return [devUrl, prodUrl];
};

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
            servers: getServersInCorrectOrder(),
            tags: [
                {
                    name: "Login",
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
                    name: "Sala",
                    description: "Rotas para gestão de Salas"
                },
                {
                    name: "Bens",
                    description: "Rotas para gestão de Bens"
                },
            ],
            paths: {
                ...bensRoutes,
                ...loginRoutes,
                ...usuarioRoutes,
                ...salaRoutes,
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
                    ...bensSchemas,
                    ...loginSchema,
                    ...usuarioSchemas,
                    ...salaSchemas,
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

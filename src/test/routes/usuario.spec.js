import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import exp from "constants";
import {postLogin} from "../auth.js";


let token;

describe('Teste de Autenticação', () => {

    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            email:"emailExample@gmail.com",
            senha:"senhatest"
        })
        token = req.body.data.token
    })

    it("1-Deve deve retornar um erro quando o usuario não existir", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            email:"usuarioNaoExiste@gmail.com",
            senha:"senhatest"
        })
        expect(req.status).toBe(401)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Cliente sem credenciais para acessar o recurso solicitado.")
        expect(req.body.errors[0].message).toEqual("Usuario não exite na base de dados verifique se o email esta correto!")
    })

    it("1-Deve deve retornar um erro quando a senha estiver errada", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            email:"emailExample@gmail.com",
            senha:"senhaErrada"
        })
        expect(req.status).toBe(401)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Cliente sem credenciais para acessar o recurso solicitado.")
        expect(req.body.errors[0].message).toEqual("Senha informada esta incorreta!")
    })
});

describe('get usuario', () => {

    it(" Deve retornar um array com os dados das contas", async () => {
        const req = await request(app)
        .get('/usuario')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        
        console.log(req.body)

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.message).toEqual("Registros encontrados");
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].email).toBeDefined()
        expect(req.body.data[0].senha).toBeDefined()
        expect(req.body.data[0].funcao).toBeDefined()
        expect(req.body.data[0].status).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
        
    })



    it("Deve retornar um objeto com os dados de apenas uma conta", async () => {
        const req = await request(app)
        .get('/usuario/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.email).toBeDefined();
        expect(req.body.data.senha).toBeDefined();
        expect(req.body.data.funcao).toBeDefined();
        expect(req.body.data.status).toBeDefined();
        expect(req.body.data.nome).toBeDefined();

    })

    it("Deve retornar um error se algum id da conta não existir", async () => {

        const req = await request(app)
        .get('/usuario/10101010010101010')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("usuario não existe")

    })
    
})


describe('patch usuários', () => {
    it("1-deve adicionar um bem e retornar o bem criado.", async () => {
        const req = await request(app)
        .patch('/usuario/2')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome:"Leonardo",
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.status).toBeDefined()
        expect(req.body.data.funcao).toBeDefined()
    })

    it("1-deve retornar um erro casa o usuário não exista.", async () => {
        const req = await request(app)
        .patch('/usuario/20909090')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome:"Leonardo",
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("1-deve retornar um erro quando os tipos dos dados não forem os corretos.(nome)", async () => {
        const req = await request(app)
        .patch('/usuario/20909090')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome:123,
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

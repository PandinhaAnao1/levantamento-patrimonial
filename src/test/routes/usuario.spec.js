import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';

let token;
let usuario_criado = null

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

    it("1-Deve retornar um erro quando o usuario não existir", async () => {
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

describe('get usuários', () => {
    it("1-deve retornar uma lista com os usuários filtrados.", async () => {
        const req = await request(app)
        .get('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            email:'a',
            nome:"a",
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
        expect(req.body.data[0].status).toBeDefined()
        expect(req.body.data[0].funcao).toBeDefined()
    })

    it("1-deve retornar uma lista com os usuários filtrados com status como false.", async () => {
        const req = await request(app)
        .get('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            status:false
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
        expect(req.body.data[0].status).toBeDefined()
        expect(req.body.data[0].funcao).toBeDefined()
    })

    it("2-deve retornar um erro quando nenhum usuário for encontrado", async () => {
        const req = await request(app)
        .get('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            email:'usuario não deve existir',
            nome:"a",
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro quando os tipos dos dados não forem os corretos.(status)", async () => {
        const req = await request(app)
        .get('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            email: "a",
            nome:"a",
            funcao:"auditor",
            status:"tru"
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

describe('get usuários por id', () => {
    it("1-deve retornar um usuário.", async () => {
        const req = await request(app)
        .get('/usuario/1')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.status).toBeDefined()
        expect(req.body.data.funcao).toBeDefined()
    })

    it("2-deve retornar um erro quando nem um usuario for encontrado.", async () => {
        const req = await request(app)
        .get('/usuario/89898981')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro quando o id passado não estiver no formato correto.", async () => {
        const req = await request(app)
        .get('/usuario/n21')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

describe('create usuários', () => {
    it("1-deve retornar um usuário.", async () => {
        const req = await request(app)
        .post('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome: faker.name.findName(),
            funcao: "CPALM",
            status: true,
            senha: "testesenha",
            email: faker.internet.email()
        })
        console.log(req.body)
        usuario_criado = req.body.data.id

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.status).toBeDefined()
        expect(req.body.data.funcao).toBeDefined()
    })

    it("2-deve retornar um erro quando o email já estiver em uso.", async () => {
        const req = await request(app)
        .post('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome: faker.name.findName(),
            funcao: "CPALM",
            status: true,
            senha: "testesenha",
            email: "emailExample@gmail.com"
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro quando o id passado não estiver no formato correto.", async () => {
        const req = await request(app)
        .post('/usuario')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome: true,
            funcao: "CPALM",
            status: true,
            senha: "testesenha",
            email: faker.internet.email()
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})


describe('patch usuários', () => {
    it("1-deve atualizar os dados de um usuário.", async () => {
        const req = await request(app)
        .patch(`/usuario/${usuario_criado}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome: faker.name.findName(),
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

    it("2-deve retornar um erro casa o usuário não exista.", async () => {
        const req = await request(app)
        .patch('/usuario/20909090')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            nome: faker.name.findName(),
            funcao:"auditor",
            status:true
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro quando os tipos dos dados não forem os corretos.(nome)", async () => {
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

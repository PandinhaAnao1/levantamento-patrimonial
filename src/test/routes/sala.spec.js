import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';

let sala_id = null
let token = null

describe('Autenticação', () => {
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
});

describe('get salas', () => {
    it("1-Deve retornar um array com os dados das sala.", async () => {
        const req = await request(app)
        .get('/sala')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            inventario_id:1
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
    })

    it("2-Deve retornar um sala que contenha os seguintes parâmetros.", async () => {
        const req = await request(app)
        .get('/sala')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            inventario_id: 1,
            nome:"a",
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
    })

    it("3-Deve retornar um error se o id do inventário não existir.", async () => {
        const req = await request(app)
        .get('/sala')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            inventario_id:18980,
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("4-Deve retornar um error se o nome não for um string.", async () => {
        const req = await request(app)
        .get('/sala')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            nome:4564
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("5-Deve retornar um objeto com os dados de apenas uma sala.", async () => {
        const req = await request(app)
        .get('/sala/1')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.id).toBeDefined()
    })

    it("6-Deve retornar um error se o id da sala não existir.", async () => {
        const req = await request(app)
        .get('/sala/1010101011010')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("7-Deve retornar um error se o id da sala for uma String.", async () => {
        const req = await request(app)
        .get('/sala/string')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

describe('post cadastrar sala', () => {
    it("1-deve cradastrar uma retornar ela.", async () => {
        const req = await request(app)
        .post('/sala')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "nome": faker.commerce.productName(),
        })

        sala_id = parseInt(req.body.data.id)

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.nome).toBeDefined()
    })

    it("2-deve retornar um erro se o nome da sala não for uma string.", async () => {
        const req = await request(app)
        .post('/sala')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "nome": 83748,
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

describe('Atualizar uma sala', () => {
    it("1-deve criar um bem e retornar ele.", async () => {
        const req = await request(app)
        .patch(`/sala/${sala_id}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "nome": faker.commerce.productName(),
        })
        console.log(req.body)
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.nome).toBeDefined()
    })

    it("2-deve retornar um erro ao informar um id da sala que não existe.", async () => {
        const req = await request(app)
        .patch('/sala/234324')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "nome": faker.commerce.productName(),
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro ao informar o nome como um number.", async () => {
        const req = await request(app)
        .patch('/sala/:id')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "nome": 8907,
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})
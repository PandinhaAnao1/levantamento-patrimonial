import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';

let sala_id = 1
let bem_id = null
let token = null

describe('Autenticação', () => {
    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            email:"test123@gmail.com",
            senha:"senhatest"
        })
        token = req.body.data.token
    })
});

describe('get bens', () => {
    it("1-Deve retornar um array com os dados dos bens.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            inventario_id:1
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].sala_id).toBeDefined()
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
        expect(req.body.data[0].tombo).toBeDefined()
        expect(req.body.data[0].responsavel).toBeDefined()
    })
    // ...(parametros.nome && { nome: {contains: parametros.nome }}),
    // ...(parametros.tombo && { tombo: parametros.tombo }),
    // ...(parametros.responsavel && { responsavel: {contains: parametros.responsavel} }),
    // ...(parametros.descricao && { descricao: {contains: parametros.descricao} }),
    // ...(parametros.auditado && { auditado: parametros.auditado}),
    it("2-Deve retornar um erro quando um pametro passado estiver no formato errado.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            sala_id:sala_id,
            inventario_id: 1,
            nome:"a",
            tombo:"TB2345",
            responsavel:"a",
            descricao:"a",
            auditado: true
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].sala_id).toBeDefined()
        expect(req.body.data[0].sala_id).toBe(sala_id)
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
        expect(req.body.data[0].tombo).toBeDefined()
        expect(req.body.data[0].responsavel).toBeDefined()
    })

    it("3-Deve retornar um error se o id da sala não existir.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            inventario_id:1,
            sala_id:1000000
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("4-Deve retornar um error se o id da sala não for um number.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            inventario_id:1,
            sala_id:"n"
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("5-Deve retornar um objeto com os dados de apenas um bem.", async () => {
        const req = await request(app)
        .get('/bens/1')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.tombo).toBeDefined()
        expect(req.body.data.responsavel).toBeDefined()
    })

    it("6-Deve retornar um error se o id do bem não existir.", async () => {
        const req = await request(app)
        .get('/bens/1010101011010')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("7-Deve retornar um error se o id do bem for uma String.", async () => {
        const req = await request(app)
        .get('/bens/string')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

describe('post adicinar bem já auditando ele', () => {
    it("1-deve adicionar um bem e retornar o bem criado.", async () => {
        const req = await request(app)
        .post('/bens/criar/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
                "sala_id":1,
                "inventario_id":1,
                "usuario_id":1,
                "nome": faker.commerce.productName(),
                "descricao": faker.lorem.text(),
                "estado":"bom",
                "ocioso":false,
                "imagem":faker.image.imageUrl()
        })

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data.bem).toBeInstanceOf(Object)
        expect(req.body.data.bem.id).toBeDefined()
        expect(req.body.data.bem.nome).toBeDefined()
        expect(req.body.data.bem.tombo).toBeDefined()
        expect(req.body.data.bem.responsavel).toBeDefined()
    })

    it("2-deve retornar error ao tentar adicionar um bem sem um dos campos obrigatórios.", async () => {
        const req = await request(app)
        .post('/bens/criar/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
                "sala_id":1,
                "inventario_id":1,
                "usuario_id":null,
                "nome": faker.commerce.productName(),
                "descricao": faker.lorem.text(),
                "estado":"bom",
                "ocioso":false,
                "imagem":faker.image.imageUrl()
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("3-deve retornar error ao tentar adicionar um bem com uma sala_id que não existe.", async () => {
        const req = await request(app)
        .post('/bens/criar/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
                "sala_id":100000,
                "inventario_id":1,
                "usuario_id":1,
                "nome": faker.commerce.productName(),
                "descricao": faker.lorem.text(),
                "estado":"bom",
                "ocioso":false,
                "imagem":faker.image.imageUrl()
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })
})

describe('post criar bem', () => {
    it("1-deve criar um bem e retornar ele.", async () => {
        const req = await request(app)
        .post('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
                "sala_id":sala_id,
                "inventario_id":1,
                "nome": faker.commerce.productName(),
                "descricao": faker.lorem.text(),
                "tombo": "TB987",
                "responsavel": faker.name.findName(),
                "valor": faker.random.number()
        })

        bem_id = req.body.data.id

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined()
        expect(req.body.data.nome).toBeDefined()
        expect(req.body.data.tombo).toBeDefined()
        expect(req.body.data.responsavel).toBeDefined()
    })

    it("2-deve retornar um erro ao informar uma sala que não existe.", async () => {
        const req = await request(app)
        .post('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
                "sala_id":10000000,
                "inventario_id":1,
                "nome": faker.commerce.productName(),
                "descricao": faker.lorem.text(),
                "imagem":faker.image.imageUrl(),
                "tombo": "TB987",
                "responsavel": faker.name.findName(),
                "valor": faker.random.number(),
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro ao informar o nome como um number.", async () => {
        const req = await request(app)
        .post('/bens')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
                "sala_id":sala_id,
                "inventario_id":1,
                "nome": 1000,
                "descricao": faker.lorem.text(),
                "imagem":faker.image.imageUrl(),
                "tombo": "TB987",
                "responsavel": faker.name.findName(),
                "valor": faker.random.number(),
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })
})

describe('auditar bens', () => {
    it("1-deve auditar um bem e retornar o bem auditado e o histórico inserido.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "bem_id":parseInt(bem_id),
            "sala_id":sala_id,
            "inventario_id":1,
            "usuario_id":1,
            "estado":"ruim",
            "ocioso":true,
            "imagem":faker.image.imageUrl(),
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Bem auditado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bem.id).toBeDefined()
        expect(req.body.data.bem.nome).toBeDefined()
        expect(req.body.data.bem.tombo).toBeDefined()
        expect(req.body.data.bem.responsavel).toBeDefined()
        expect(req.body.data.levantamento.bem_id).toBeDefined()
        expect(req.body.data.levantamento.sala_id).toBeDefined()
        expect(req.body.data.levantamento.inventario_id).toBeDefined()
        expect(req.body.data.levantamento.usuario_id).toBeDefined()
    })

    it("2-deve retornar error ao tentar auditar um bem com uma sala_id que não existe.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "bem_id":2,
            "sala_id":10000,
            "inventario_id":1,
            "usuario_id":1,
            "estado":"ruim",
            "ocioso":true,
            "imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("3-deve retornar error ao tentar auditar um bem com um usuario_id que não existe.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "bem_id":1,
            "sala_id":sala_id,
            "inventario_id":1,
            "usuario_id":1000000,
            "estado":"ruim",
            "ocioso":true,
            "imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("4-deve retornar error ao tentar auditar um bem com um bem_id que não existe.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "bem_id":100000000000,
            "sala_id":sala_id,
            "inventario_id":1,
            "usuario_id":1,
            "estado":"ruim",
            "ocioso":true,
            "imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("5-deve retornar error ao tentar auditar um bem com uma sala_id em formato incorreto.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "bem_id":2,
            "sala_id":"String",
            "inventario_id":1,
            "usuario_id":1,
            "estado":"ruim",
            "ocioso":true,
            "imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("6-deve retornar error ao tentar auditar um bem que já foi auditado.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send({
            "bem_id":1,
            "sala_id":sala_id,
            "inventario_id":1,
            "usuario_id":1,
            "estado":"ruim",
            "ocioso":true,
            "imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(403)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Sem permissão para atender a requisição.")
    })
})
import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';

let sala_id = 1
let bens_id = null

describe('get bens', () => {
    it("1-Deve retornar um array com os dados dos bens.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].bens_sala_id).toBeDefined()
        expect(req.body.data[0].bens_id).toBeDefined()
        expect(req.body.data[0].bens_nome).toBeDefined()
        expect(req.body.data[0].bens_tombo).toBeDefined()
        expect(req.body.data[0].bens_responsavel).toBeDefined()
    })

    it("2-Deve retornar um array com os dados dos bens de uma sala.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        .send({
            sala_id:sala_id
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].bens_sala_id).toBeDefined()
        expect(req.body.data[0].bens_sala_id).toBe(sala_id)
        expect(req.body.data[0].bens_id).toBeDefined()
        expect(req.body.data[0].bens_nome).toBeDefined()
        expect(req.body.data[0].bens_tombo).toBeDefined()
        expect(req.body.data[0].bens_responsavel).toBeDefined()
    })

    it("3-Deve retornar um error se o id da sala não existir.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        .send({
            sala_id:1000000
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("4-Deve retornar um error se o id da sala não for um number.", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        .send({
            sala_id:"n"
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("5-Deve retornar um objeto com os dados de apenas um bem.", async () => {
        const req = await request(app)
        .get('/bens/1')
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bens_nome).toBeDefined()
        expect(req.body.data.bens_id).toBeDefined()
        expect(req.body.data.bens_tombo).toBeDefined()
        expect(req.body.data.bens_responsavel).toBeDefined()
    })

    it("6-Deve retornar um error se o id do bem não existir.", async () => {
        const req = await request(app)
        .get('/bens/1010101011010')
        .set("Accept", "aplication/json")
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("7-Deve retornar um error se o id do bem for uma String.", async () => {
        const req = await request(app)
        .get('/bens/string')
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
        .set("Accept", "aplication/json")
        .send({
                "sala_id":1,
                "inve_id":1,
                "usua_id":1,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_estado":"bom",
                "bens_ocioso":false,
                "bens_imagem":faker.image.imageUrl(),
                "bens_tombo": null,
                "bens_responsavel": faker.name.findName(),
                "bens_valor": null 
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data.bem).toBeInstanceOf(Object)
        expect(req.body.data.bem.bens_id).toBeDefined()
        expect(req.body.data.bem.bens_nome).toBeDefined()
        expect(req.body.data.bem.bens_tombo).toBeDefined()
        expect(req.body.data.bem.bens_responsavel).toBeDefined()
    })

    it("2-deve retornar error ao tentar adicionar um bem sem um dos campos obrigatórios.", async () => {
        const req = await request(app)
        .post('/bens/criar/auditar')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":1,
                "inve_id":1,
                "usua_id":null,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_estado":"bom",
                "bens_ocioso":false,
                "bens_imagem":faker.image.imageUrl(),
                "bens_responsavel": faker.name.findName(),
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("3-deve retornar error ao tentar adicionar um bem com uma sala_id que não existe.", async () => {
        const req = await request(app)
        .post('/bens/criar/auditar')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":100000,
                "inve_id":1,
                "usua_id":1,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_estado":"bom",
                "bens_ocioso":false,
                "bens_imagem":faker.image.imageUrl(),
                "bens_tombo": null,
                "bens_responsavel": faker.name.findName(),
                "bens_valor": null 
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
        .set("Accept", "aplication/json")
        .send({
                "sala_id":sala_id,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_imagem":faker.image.imageUrl(),
                "bens_tombo": faker.random.uuid(),
                "bens_responsavel": faker.name.findName(),
                "bens_valor": faker.random.number(),
        })

        bens_id = req.body.data.bens_id

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bens_id).toBeDefined()
        expect(req.body.data.bens_nome).toBeDefined()
        expect(req.body.data.bens_tombo).toBeDefined()
        expect(req.body.data.bens_responsavel).toBeDefined()
    })

    it("2-deve retornar um erro ao informar uma sala que não existe.", async () => {
        const req = await request(app)
        .post('/bens')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":10000000,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_imagem":faker.image.imageUrl(),
                "bens_tombo": faker.random.uuid(),
                "bens_responsavel": faker.name.findName(),
                "bens_valor": faker.random.number(),
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar um erro ao informar o bens_nome como um number.", async () => {
        const req = await request(app)
        .post('/bens')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":sala_id,
                "bens_nome": 1000,
                "bens_decricao": faker.lorem.text(),
                "bens_imagem":faker.image.imageUrl(),
                "bens_tombo": faker.random.uuid(),
                "bens_responsavel": faker.name.findName(),
                "bens_valor": faker.random.number(),
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
        .set("Accept", "aplication/json")
        .send({
            "bens_id":parseInt(bens_id),
            "sala_id":sala_id,
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem":faker.image.imageUrl(),
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Bem auditado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bem.bens_id).toBeDefined()
        expect(req.body.data.bem.bens_nome).toBeDefined()
        expect(req.body.data.bem.bens_tombo).toBeDefined()
        expect(req.body.data.bem.bens_responsavel).toBeDefined()
        expect(req.body.data.historico.hist_bens_id).toBeDefined()
        expect(req.body.data.historico.hist_salas_id).toBeDefined()
        expect(req.body.data.historico.hist_inventarios_id).toBeDefined()
        expect(req.body.data.historico.hist_usuarios_id).toBeDefined()
    })

    it("2-deve retornar error ao tentar auditar um bem com uma sala_id que não existe.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":2,
            "sala_id":10000,
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("2-deve retornar error ao tentar auditar um bem com um usua_id que não existe.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":1,
            "sala_id":sala_id,
            "inve_id":1,
            "usua_id":1000000,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("2-deve retornar error ao tentar auditar um bem com um bens_id que não existe.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":100000000000,
            "sala_id":sala_id,
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

    it("3-deve retornar error ao tentar auditar um bem com uma sala_id em formato incorreto.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":2,
            "sala_id":"String",
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it("4-deve retornar error ao tentar auditar um bem que já foi auditado.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":1,
            "sala_id":sala_id,
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem": faker.image.imageUrl()
        })
        expect(req.status).toBe(403)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Sem permissão para atender a requisição.")
    })
})
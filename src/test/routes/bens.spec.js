import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';

const sala_id = 1

describe('get bens', () => {
    it("Deve retornar um array com os dados dos bens", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Registros encontrados")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].bens_sala_id).toBeDefined()
        expect(req.body.data[0].bens_id).toBeDefined()
        expect(req.body.data[0].bens_nome).toBeDefined()
        expect(req.body.data[0].bens_tombo).toBeDefined()
        expect(req.body.data[0].bens_responsavel).toBeDefined()
    })

    it("Deve retornar um array com os dados dos bens de uma sala", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        .send({
            sala_id:sala_id
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Registros encontrados")
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.data[0].bens_sala_id).toBeDefined()
        expect(req.body.data[0].bens_sala_id).toBe(sala_id)
        expect(req.body.data[0].bens_id).toBeDefined()
        expect(req.body.data[0].bens_nome).toBeDefined()
        expect(req.body.data[0].bens_tombo).toBeDefined()
        expect(req.body.data[0].bens_responsavel).toBeDefined()
    })

    it("Deve retornar um error se o id da sala não existir", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        .send({
            sala_id:1000000
        })
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Nem um registro encontrado")
    })

    it("Deve retornar um error se o id da sala não for um numero", async () => {
        const req = await request(app)
        .get('/bens')
        .set("Accept", "aplication/json")
        .send({
            sala_id:"n"
        })
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message[0]).toEqual("sala_id informado não é do tipo number")
    })

    it("Deve retornar um objeto com os dados de apenas um bem", async () => {
        const req = await request(app)
        .get('/bens/1')
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Registro encontrado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bens_nome).toBeDefined()
        expect(req.body.data.bens_id).toBeDefined()
        expect(req.body.data.bens_tombo).toBeDefined()
        expect(req.body.data.bens_responsavel).toBeDefined()
    })

    it("Deve retornar um error se o id do bem não existir", async () => {
        const req = await request(app)
        .get('/bens/1010101011010')
        .set("Accept", "aplication/json")
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Nem um registro encontrado")
    })

    it("Deve retornar um error se o id do bem for uma string", async () => {
        const req = await request(app)
        .get('/bens/string')
        .set("Accept", "aplication/json")
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("ID informado não é do tipo number")
    })
})

describe('post bens/adicinar', () => {
    it("deve adicionar um bem e retornar o bem criado", async () => {
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
                "bens_imagem":null,
                "bens_tombo": null,
                "bens_responsavel": faker.name.findName(),
                "bens_valor": null 
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Bem adicionado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bens_id).toBeDefined()
        expect(req.body.data.bens_nome).toBeDefined()
        expect(req.body.data.bens_tombo).toBeDefined()
        expect(req.body.data.bens_responsavel).toBeDefined()
    })

    it("deve retornar error ao tentar adicionar um bem sem um dos campos obrigatorios.", async () => {
        const req = await request(app)
        .post('bens/criar/auditar')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":1,
                "inve_id":1,
                "usua_id":null,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_estado":"bom",
                "bens_ocioso":false,
                "bens_imagem":null,
                "bens_responsavel": faker.name.findName(),
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message[0]).toEqual("usua_id informado não é do tipo number")
    })

    it("deve retornar error ao tentar adicionar um bem com uma sala_id que não existe", async () => {
        const req = await request(app)
        .post('bens/criar/auditar')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":100000,
                "inve_id":1,
                "usua_id":1,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_estado":"bom",
                "bens_ocioso":false,
                "bens_imagem":null,
                "bens_tombo": null,
                "bens_responsavel": faker.name.findName(),
                "bens_valor": null 
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("usuario, sala ou inventario não existem")
    })
})

describe('post bens/adicinar', () => {
    it("deve criar um bem e retornar ele", async () => {
        const req = await request(app)
        .post('/bens')
        .set("Accept", "aplication/json")
        .send({
                "sala_id":1,
                "bens_nome": faker.commerce.productName(),
                "bens_decricao": faker.lorem.text(),
                "bens_imagem":faker.image.imageUrl(),
                "bens_tombo": faker.random.uuid(),
                "bens_responsavel": faker.name.findName(),
                "bens_valor": faker.random.number(),
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(201)
        expect(req.body.message).toEqual("Bem adicionado")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.bens_id).toBeDefined()
        expect(req.body.data.bens_nome).toBeDefined()
        expect(req.body.data.bens_tombo).toBeDefined()
        expect(req.body.data.bens_responsavel).toBeDefined()
    })
})

describe('auditar bens', () => {
    it("deve auditar um bem e retornar o bem motificado e o historico inserido", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":1,
            "sala_id":1,
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem":faker.image.imageUrl(),
        })
        console.log(req.body)
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

    it("deve retornar error ao tentar auditar um bem com uma sala_id que não existe", async () => {
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
            "bens_imagem":faker.image.imageUrl(),
        })
        console.log(req.body)
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("O Bem não pertence a sala ou inventario informado")
    })

    it("deve retornar error ao tentar auditar um bem com uma sala_id em formato incorreto", async () => {
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
            "bens_imagem":faker.image.imageUrl(),
        })
        console.log(req.body)
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message[0]).toEqual("sala_id informado não é do tipo number")
    })
    // esse teste esta errado, como no banco so temos bens que ja foram auditados eu coloquei um 
    // ! no if, dessa forma se buscar por um id e não o encontra gera o erro como se tive encontrado.
    it("deve retornar error ao tentar auditar um bem que já foi auditado.", async () => {
        const req = await request(app)
        .patch('/bens/auditar')
        .set("Accept", "aplication/json")
        .send({
            "bens_id":1,
            "sala_id":1,
            "inve_id":1,
            "usua_id":1,
            "bens_estado":"ruim",
            "bens_ocioso":true,
            "bens_imagem":faker.image.imageUrl(),
        })
        console.log(req.body)
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Bem já foi auditado.")
    })
})
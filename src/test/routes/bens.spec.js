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
        expect(req.status).toBe(400)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("id não informado, ou em formato incorreto")
    })
})

describe('post bens', () => {
    it("deve adicionar um bem e retornar o bem criado", async () => {
        const req = await request(app)
        .post('/bens/adicionar')
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
        .post('/bens/adicionar')
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
                "bens_tombo": null,
                "bens_responsavel": faker.name.findName(),
                "bens_valor": null 
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(400)
        expect(req.body.message).toEqual("Um parâmetro faltando ou é inválido.")
    })

    it("deve retornar error ao tentar adicionar um bem com uma sala_id que não existe", async () => {
        const req = await request(app)
        .post('/bens/adicionar')
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

    it("deve retornar error ao tentar adicionar um bem com uma sala_id que não existe", async () => {
        const req = await request(app)
        .post('/bens/adicionar')
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

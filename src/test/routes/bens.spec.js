import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'

const sala_id = 1

describe('bens', () => {
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
})
import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'

describe('inventario', () => {
    it("Deve retornar um array com os dados dos invetarios", async () => {
        const req = await request(app)
        .get('/inventarios')
        .set("Accept", "aplication/json")
        console.log(req.body[0].inve_campus)
        expect(req.status).toBe(200)
        expect(req.body).toBeInstanceOf(Array)
        expect(req.body[0].inve_campus).toEqual('Campus Vilhena')
        expect(req.body).toHaveLength(2)
    })

    it("Deve retornar um array com os dados de um invetario", async () => {
        const req = await request(app)
        .get('/inventarios/1/salas')
        .set("Accept", "aplication/json")
        console.log(req.body)
        expect(req.status).toBe(200)
        // expect(req.body.data.sala_invent).toHaveLength(1)
    })
})


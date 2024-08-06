import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'

describe('inventario', () => {
    it("Deve retornar um array com os dados dos invetarios", async () => {
        const req = await request(app)
        .get('/inventario')
        .set("Accept", "aplication/json")
        console.log(req.body)
        expect(req.status).toBe(200)
        expect(req.body).toBeInstanceOf(Array)
    })

    it("Deve retornar um array com os dados de um invetario", async () => {
        const req = await request(app)
        .get('/inventario_salas/1')
        .set("Accept", "aplication/json")
        console.log(req.body)
        expect(req.status).toBe(200)
        // expect(req.body).toHaveLength(1)
    })
})

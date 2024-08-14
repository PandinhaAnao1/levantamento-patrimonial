import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import exp from "constants";

describe('contas', () => {
    it(" Deve retornar um array com os dados das contas", async () => {
        const req = await request(app)
        .get('/contas')
        .set("Accept", "aplication/json")
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.message).toEqual();
        expect(req.body.data[0].usua_id).toBeDefined()
        expect(req.body.data[0].usua_email).toBeDefined()
        expect(req.body.data[0].usua_senha).toBeDefined()
        expect(req.body.data[0].usua_funcao).toBeDefined()
        expect(req.body.data[0].usua_status).toBeDefined()
        expect(req.body.data[0].usua_nome).toBeDefined()
        
    })

    it("Deve retornar um objeto com os dados de apenas uma conta", async () => {
        const req = await request(app)
        .get('/contas/1')
        .set("Accept", "aplication/json")
        expect(req.body.error.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Object)
         expect(req.body.data[0].usua_id).toBeDefined();
         expect(req.body.data[0].usua_email).toBeDefined();
         expect(req.body.data[0].usua_senha).toBeDefined();
         expect(req.body.data[0].usua_funcao).toBeDefined();
         expect(req.body.data[0].usua_status).toBeDefined();
         expect(req.body.data[0].usua_nome).toBeDefined();

    })
    
})

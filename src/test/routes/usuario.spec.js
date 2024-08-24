import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js'
import exp from "constants";
import {postLogin} from "../auth.js";



describe('usuario', () => {
    let token;
    it("00 - Deve autenticar", async () => {
        const res = await postLogin(request(app)).expect(200);
        expect(res.body?.data?.token).toBeTruthy();
        token = res.body?.data?.token;
    });
    it(" Deve retornar um array com os dados das contas", async () => {
        const req = await request(app)
        .get('/usuario')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        
        console.log(req.body)

        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Array)
        expect(req.body.data.length).toBeGreaterThan(0)
        expect(req.body.message).toEqual("Registros encontrados");
        expect(req.body.data[0].id).toBeDefined()
        expect(req.body.data[0].email).toBeDefined()
        expect(req.body.data[0].senha).toBeDefined()
        expect(req.body.data[0].funcao).toBeDefined()
        expect(req.body.data[0].status).toBeDefined()
        expect(req.body.data[0].nome).toBeDefined()
        
    })



    it("Deve retornar um objeto com os dados de apenas uma conta", async () => {
        const req = await request(app)
        .get('/usuario/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.email).toBeDefined();
        expect(req.body.data.senha).toBeDefined();
        expect(req.body.data.funcao).toBeDefined();
        expect(req.body.data.status).toBeDefined();
        expect(req.body.data.nome).toBeDefined();

    })

    it("Deve retornar um error se algum id da conta não existir", async () => {

        const req = await request(app)
        .get('/usuario/10101010010101010')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(404)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("usuario não existe")

    })
    
})

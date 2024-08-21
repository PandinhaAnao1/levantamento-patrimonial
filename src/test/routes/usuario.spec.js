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
        expect(req.body.data[0].usua_id).toBeDefined()
        expect(req.body.data[0].usua_email).toBeDefined()
        expect(req.body.data[0].usua_senha).toBeDefined()
        expect(req.body.data[0].usua_funcao).toBeDefined()
        expect(req.body.data[0].usua_status).toBeDefined()
        expect(req.body.data[0].usua_nome).toBeDefined()
        
    })



    it("Deve retornar um objeto com os dados de apenas uma conta", async () => {
        const req = await request(app)
        .get('/usuario/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data.usua_id).toBeDefined();
        expect(req.body.data.usua_email).toBeDefined();
        expect(req.body.data.usua_senha).toBeDefined();
        expect(req.body.data.usua_funcao).toBeDefined();
        expect(req.body.data.usua_status).toBeDefined();
        expect(req.body.data.usua_nome).toBeDefined();

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

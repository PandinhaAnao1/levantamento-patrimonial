import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js';
import {postLogin} from '../auth.js';
describe('inventario', () => {
    const req = request(app);
    let token;
    it("Deve autenticar", async () => {
        const res = await postLogin(req).expect(200);
        expect(res.body?.data?.token).toBeTruthy();
		token = res.body?.data?.token;
    });

    it("Deve retornar um array com os dados dos invetarios", async () => {
        const req = await request(app)
        .get('/inventarios')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`)
        console.log(req.body)
        expect(req.status).toBe(200)
        expect(req.body).toBeInstanceOf(Array)
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


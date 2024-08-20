import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js';
import {postLogin} from '../auth.js';


describe.only('Inventario', () => {
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
        .set("Authorization", `Bearer ${token}`);

        expect(req.status).toBe(200);
        expect(req.body).toBeInstanceOf(Object);
        expect(req.body.data.length).toBeGreaterThan(1);
        expect(req.body.data).toBeInstanceOf(Array);
        expect(req.body.error).toEqual(false);
        expect(req.body.errors).toBeInstanceOf(Array);
        expect(req.body.errors).toEqual([]);
    });

    it("Deve testar se o primeiro item contem todos os atributos de um inventario", async () => {
        const req = await request(app)
        .get('/inventarios')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);

        expect(req.status).toBe(200);
        expect(req.body.data.length).toBeGreaterThan(1);
        expect(req.body.data).toBeInstanceOf(Array);
        expect(req.body.data[0]).toBeInstanceOf(Object);
        expect(req.body.data[0].inve_id).toBeDefined();
        expect(req.body.data[0].inve_nome).toBeDefined();
        expect(req.body.data[0].inve_data).toBeDefined();
        expect(req.body.data[0].inve_concluido).toBeDefined();
        expect(req.body.data[0].inve_campus).toBeDefined();
    });

    it("Deve testar a listagem por id dos inventarios", async () => {
        const req = await request(app)
        .get('/inventarios/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeDefined();
        expect(req.body.data.inve_nome).toBeDefined();
        expect(req.body.data.inve_data).toBeDefined();
        expect(req.body.data.inve_concluido).toBeDefined();
        expect(req.body.data.inve_campus).toBeDefined();
    });

    it("Deve testar a listagem por id dos inventarios com o id errado", async () => {
        const req = await request(app)
        .get('/inventarios/1000')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(400);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeUndefined();
        expect(req.body.data.inve_nome).toBeUndefined();
        expect(req.body.data.inve_data).toBeUndefined();
        expect(req.body.data.inve_concluido).toBeUndefined();
        expect(req.body.data.inve_campus).toBeUndefined();
    });
    it("Deve testar a listagem por id dos inventarios com o id errado", async () => {
        const req = await request(app)
        .get('/inventarios/1000')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(400);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeUndefined();
        expect(req.body.data.inve_nome).toBeUndefined();
        expect(req.body.data.inve_data).toBeUndefined();
        expect(req.body.data.inve_concluido).toBeUndefined();
        expect(req.body.data.inve_campus).toBeUndefined();
    });

})


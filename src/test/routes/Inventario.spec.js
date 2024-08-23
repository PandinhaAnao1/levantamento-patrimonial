import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js';
import {postLogin} from '../auth.js';


describe.only('Inventario GET', () => {
    let token;
    it.only("00 - Deve autenticar", async () => {
        const res = await postLogin(request(app)).expect(200);
        expect(res.body?.data?.token).toBeTruthy();
		token = res.body?.data?.token;
    });

    it("01 - Deve retornar um array com os dados dos invetarios", async () => {
        const req = await request(app)
        .get('/inventarios')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        console.log(req.body)

        expect(req.status).toBe(200);
        expect(req.body).toBeInstanceOf(Object);
        expect(req.body.data.length).toBeGreaterThan(1);
        expect(req.body.data).toBeInstanceOf(Array);
        expect(req.body.error).toEqual(false);
        expect(req.body.errors).toBeInstanceOf(Array);
        expect(req.body.errors).toEqual([]);
    });

    it("02 - Deve testar se o primeiro item contem todos os atributos de um inventario", async () => {
        const req = await request(app)
        .get('/inventarios')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);

        expect(req.status).toBe(200);
        expect(req.body.data.length).toBeGreaterThan(1);
        expect(req.body.data).toBeInstanceOf(Array);
        expect(req.body.data[0]).toBeInstanceOf(Object);
        expect(req.body.data[0].id).toBeDefined();
        expect(req.body.data[0].nome).toBeDefined();
        expect(req.body.data[0].data).toBeDefined();
        expect(req.body.data[0].concluido).toBeDefined();
        expect(req.body.data[0].campus_id).toBeDefined();
    });

    it.only("03 - Deve testar a listagem por id dos inventarios", async () => {
        const req = await request(app)
        .get('/inventarios/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        console.log(req.body)
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.nome).toBeDefined();
        expect(req.body.data.data).toBeDefined();
        expect(req.body.data.concluido).toBeDefined();
        expect(req.body.data.campus).toBeDefined();
    });

    it("04 - Deve testar a listagem por id dos inventarios com o id errado", async () => {
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

    it("05 - Deve testar a listagem por id como string do inventarios", async () => {
        const req = await request(app)
        .get('/inventarios/texto')
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

    it("06 - Deve testar se a query de nome funcionario funciona", async () => {
    
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        console.log(req.body);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeDefined();
        expect(req.body.data.inve_nome).toBeDefined();
        expect(req.body.data.inve_data).toBeDefined();
        expect(req.body.data.inve_concluido).toBeDefined(); 
    });

    it("07 - Deve testar se a query de nome não funciona", async () => {
        
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
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

    it("08 - Deve testar se a query de concluido funcionario funciona", async () => {
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeDefined();
        expect(req.body.data.inve_nome).toBeDefined();
        expect(req.body.data.inve_data).toBeDefined();
        expect(req.body.data.inve_concluido).toBeDefined(); 
    });

    it("09 - Deve testar se a query de campus funcionario funciona", async () => {
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeUndefined();
        expect(req.body.data.inve_nome).toBeUndefined();
        expect(req.body.data.inve_data).toBeUndefined();
        expect(req.body.data.inve_concluido).toBeUndefined();
        expect(req.body.data.inve_campus).toBeUndefined();
    }); 
    it("08 - Deve testar se a query de campus funcionario funciona", async () => {
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeDefined();
        expect(req.body.data.inve_nome).toBeDefined();
        expect(req.body.data.inve_data).toBeDefined();
        expect(req.body.data.inve_concluido).toBeDefined(); 
    });

    it("07 - Deve testar se a query de concluido funcionario funciona", async () => {
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
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

    //colocar teste para query



    
});


describe("Inventario POST",() => {
    it.skip("01 - Deve testar se um iventario foi criado com sucesso", async () => {
        const req = await request(app)
        .post('/inventarios')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        send({
            "nome": "Usuario do levantamento",
            "data": z.date(),
            "campus": z.string().min(1).max(100)
        });
        expect(req.status).toBe(201);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeUndefined();
        expect(req.body.data.inve_nome).toBeUndefined();
        expect(req.body.data.inve_data).toBeUndefined();
        expect(req.body.data.inve_concluido).toBeUndefined();
        expect(req.body.data.inve_campus).toBeUndefined();
    });

});


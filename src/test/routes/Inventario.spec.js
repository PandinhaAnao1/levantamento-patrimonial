import request from "supertest";
import { describe, expect, it, test } from '@jest/globals';
import app from '../../app.js';
import {postLogin} from '../auth.js';


describe('Inventario GET', () => {
    let token;
    it("00 - Deve autenticar", async () => {
        const res = await postLogin(request(app)).expect(200);
        expect(res.body?.data?.token).toBeTruthy();
		token = res.body?.data?.token;
    });

    it("01 - Deve retornar um array com os dados dos invetarios", async () => {
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

    it("03 - Deve testar a listagem por id dos inventarios", async () => {
        const req = await request(app)
        .get('/inventarios/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.nome).toBeDefined();
        expect(req.body.data.data).toBeDefined();
        expect(req.body.data.concluido).toBeDefined();
        expect(req.body.data.campus_id).toBeDefined();
    });

    it("04 - Deve testar a listagem por id dos inventarios com o id errado fora do limite", async () => {
        const req = await request(app)
        .get('/inventarios/1000')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(404);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeUndefined();
        expect(req.body.data.nome).toBeUndefined();
        expect(req.body.data.data).toBeUndefined();
        expect(req.body.data.concluido).toBeUndefined();
        expect(req.body.data.campus_id).toBeUndefined();
    });

    it("05 - Deve testar a listagem por id como string do inventarios", async () => {
        const req = await request(app)
        .get('/inventarios/texto')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(404);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeUndefined();
        expect(req.body.data.nome).toBeUndefined();
        expect(req.body.data.data).toBeUndefined();
        expect(req.body.data.concluido).toBeUndefined();
        expect(req.body.data.campus_id).toBeUndefined();
    });

    it("06 - Deve testar se a query de nome inventario funciona", async () => {
    
        const req = await request(app)
        .get('/inventarios?nome=Inventário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Array);
        expect(req.body.data.length).toBeGreaterThan(0);
        expect(req.body.data[0].id).toBeDefined();
        expect(req.body.data[0].nome).toBeDefined();
        expect(req.body.data[0].data).toBeDefined();
        expect(req.body.data[0].concluido).toBeDefined();
        expect(req.body.data[0].concluido).toBeDefined();
        expect(req.body.data[0].campus_id).toBeDefined(); 
    });

    it("07 - Deve testar se a query de nome não funciona", async () => {
        
        const req = await request(app)
        .get('/inventarios?nome=nome que nao existe')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(401);
        expect(req.body.data).toBeInstanceOf(Array);
        expect(req.body.data).toEqual([]);    
    }); 

    //Rever essa forma de consultar os item concluidos
    it.skip("08 - Deve testar se a query de concluido funcionario funciona", async () => {
        const req = await request(app)
        .get('/inventarios?concluido=true')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.nome).toBeDefined();
        expect(req.body.data.data).toBeDefined();
        expect(req.body.data.concluido).toBeDefined(); 
    });

    it.skip("09 - Deve testar se a query de concluido funcionario funciona", async () => {
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(400);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeUndefined();
        expect(req.body.data.nome).toBeUndefined();
        expect(req.body.data.data).toBeUndefined();
        expect(req.body.data.concluido).toBeUndefined();
        expect(req.body.data.campus_id).toBeUndefined();
    });
    
    it.skip("10 - Deve testar se a query de campus", async () => {
        const req = await request(app)
        .get('/inventarios?campus=2')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.inve_id).toBeDefined();
        expect(req.body.data.inve_nome).toBeDefined();
        expect(req.body.data.inve_data).toBeDefined();
        expect(req.body.data.campus_id).toBeDefined(); 
    });
    it.skip("11 - Deve testar se a query de campus não funciona", async () => {
        const req = await request(app)
        .get('/inventarios?nome=Inventário+de+Mobiliário')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`);
        expect(req.status).toBe(200);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeUndefined();
        expect(req.body.data.nome).toBeUndefined();
        expect(req.body.data.data).toBeUndefined();
        expect(req.body.data.concluido).toBeUndefined();
        expect(req.body.data.campus_id).toBeUndefined();
    }); 


    //colocar teste para query



    
});


describe("Inventario POST",() => {
    let token;
    it("00 - Deve autenticar", async () => {
        const res = await postLogin(request(app)).expect(200);
        expect(res.body?.data?.token).toBeTruthy();
		token = res.body?.data?.token;
    });

    it("01 - Deve testar se um iventario foi criado com sucesso", async () => {
        let novoInventario = {
            "nome": "Usuario do levantamento",
            "data": new Date(),
            "campus": 1,
            "concluido": false
        };
        const req = await request(app)
        .post('/inventarios')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`)
        .send(novoInventario);
        expect(req.status).toBe(201);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.nome).toBeDefined();
        expect(req.body.data.data).toBeDefined();
        expect(req.body.data.concluido).toBeDefined();
        expect(req.body.data.campus_id).toBeDefined();
        expect(req.body.data.nome).toEqual(novoInventario.nome);
        //expect(req.body.data.data).toEqual(novoInventario.data);
        //Corrigir esse teste e questões das datas
        expect(req.body.data.concluido).toEqual(novoInventario.concluido);
        expect(req.body.data.campus_id).toEqual(novoInventario.campus);
    });

});


describe("Inventario PATCH",() => {
    let token;
    it("00 - Deve autenticar", async () => {
        const res = await postLogin(request(app)).expect(200);
        expect(res.body?.data?.token).toBeTruthy();
		token = res.body?.data?.token;
    });

    it("01 - Deve testar se um iventario atualizado o nome com sucesso", async () => {
        let novoInventario = {
            "nome": "Inventario atualizado",
        };
        const req = await request(app)
        .patch('/inventarios/1')
        .set("Accept", "aplication/json")
        .set("Authorization", `Bearer ${token}`)
        .send(novoInventario);
        expect(req.status).toBe(201);
        expect(req.body.data).toBeInstanceOf(Object);
        expect(req.body.data.id).toBeDefined();
        expect(req.body.data.nome).toBeDefined();
        expect(req.body.data.data).toBeDefined();
        expect(req.body.data.concluido).toBeDefined();
        expect(req.body.data.campus_id).toBeDefined();
        expect(req.body.data.nome).toEqual(novoInventario.nome);
    });

});


import request from "supertest";
import { describe, expect, it, buffer} from '@jest/globals';
import app from '../../app.js'
import path from "path";
import fs from "fs";
import faker from 'faker-br';
import FormData from "form-data";
import concat from 'concat-stream';

//https://medium.com/@linuk/unit-testign-rest-api-file-upload-with-jest-supertest-and-mz-in-node-ecbab9814aef
let sala_id = 1
let token = null

describe('Autenticação', () => {
    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            email:"emailExample@gmail.com",
            senha:"senhatest"
        })
        token = req.body.data.token
    })
});
// describe('post import csv', () => {
//     it("1-deve ler o csv e armazenar seus dados no banco de dados", async () => {
//         // Ensure you have defined `buffer` properly before this line
//         const buffer = Buffer.from('your csv data here'); // Example of how you might define buffer

//         const req = await request(app)
//             .post('/inventarios/csv')
//             .set("Authorization", `Bearer ${token}`)
//             .set("Accept", "application/json")  // Corrected typo
//             .field('campus_id', 1)
//             .field('nome', "teste inventario")
//             .attach('arquivo', buffer, '../arquivos/correto.csv');  // Ensure buffer contains CSV data

//         console.log(req.status);

//         expect(req.status).toBe(201);
//         expect(req.body.error).toBe(false);
//         expect(req.body.message).toEqual("Inventário criado com sucesso.");
//         expect(req.body.data).toBeInstanceOf(Object);
//         expect(req.body.data.id).toBeDefined();
//         expect(req.body.data.nome).toBeDefined();
//         expect(req.body.data.tombo).toBeDefined();
//         expect(req.body.data.responsavel).toBeDefined();
//     });
// });

describe('post import csv', () => {
    it('1-deve ler o csv e armazenar seus dados no banco de dados', async () => {
        const form = new FormData();
        const filePath = path.resolve(__dirname, '../arquivos/correto.csv');
        form.append('file', fs.createReadStream(filePath));
        form.append('campus_id', 1);
        form.append('nome', "inventario teste90");


        const formBuffer = await new Promise((resolve, reject) => {
            form.pipe(concat({ encoding: 'buffer' }, resolve));
        });
        
        console.log(formBuffer)

        const response = await request(app)
            .post('/inventarios/csv')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', form.getHeaders()['content-type']) // Define o cabeçalho Content-Type corretamente
            .send(formBuffer);

        console.log(response.body)

        expect(response.status).toBe(201);
        expect(response.body.error).toBe(false);
        expect(response.body.message).toEqual('Inventário criado com sucesso.');
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.nome).toBeDefined();
        expect(response.body.data.tombo).toBeDefined();
        expect(response.body.data.responsavel).toBeDefined();
    });
});
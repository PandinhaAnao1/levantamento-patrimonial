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
//     it('1-deve ler o csv e armazenar seus dados no banco de dados', async () => {
//         const form = new FormData();
//         const filePath = path.resolve(__dirname, '../arquivos/correto.csv');
//         form.append('file', fs.createReadStream(filePath));
//         form.append('campus_id', 1);
//         form.append('nome', "inventario teste90");


//         const formBuffer = await new Promise((resolve, reject) => {
//             form.pipe(concat({ encoding: 'buffer' }, resolve));
//         });
        
//         console.log(formBuffer)

//         const response = await request(app)
//             .post('/inventarios/csv')
//             .set('Authorization', `Bearer ${token}`)
//             .set('Accept', 'application/json')
//             .set('Content-Type', form.getHeaders()['content-type']) // Define o cabeçalho Content-Type corretamente
//             .send(formBuffer);

//         console.log(response.body)

//         expect(response.status).toBe(201);
//         expect(response.body.error).toBe(false);
//         expect(response.body.message).toEqual('Inventário criado com sucesso.');
//         expect(response.body.data).toBeInstanceOf(Object);
//         expect(response.body.data.id).toBeDefined();
//         expect(response.body.data.nome).toBeDefined();
//         expect(response.body.data.tombo).toBeDefined();
//         expect(response.body.data.responsavel).toBeDefined();
//     });
// });


describe('POST /inventarios/csv - upload a new documentation file', () => {
    const filePath = path.resolve(__dirname, '../arquivos/correto.csv');
    const filePathErrado = path.resolve(__dirname, '../arquivos/estruturaErrada.csv');
    const filePathTypeErrado = path.resolve(__dirname, '../arquivos/tipoErrado.png');


    it('Inventário criado com sucesso. Dados de bens salvos.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', 1)
                .field('nome', faker.name.findName())
                .attach('file', filePath);
            
        expect(res.status).toBe(201)
    })

    it('Deve retornar um erro quando o nome do inventário já estiver em uso.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', 1)
                .field('nome', "Inventário teste")
                .attach('file', filePath);
            
        expect(res.status).toBe(403)
        expect(res.body.message).toEqual("Sem permissão para atender a requisição.");
    })

    it('Deve retornar um erro quando o campus_id não existir.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', 19879789)
                .field('nome', faker.name.findName())
                .attach('file', filePath);
            
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.");
    })

    it('Deve retornar um erro quando o arquivo for do tipo errado.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', 1)
                .field('nome', faker.name.findName())
                .attach('file', filePathTypeErrado);
            
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
    })

    it('Deve retornar um erro quando o csv estiver no formato errado.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', 1)
                .field('nome', faker.name.findName())
                .attach('file', filePathErrado);
            
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
    })

    it('Deve retornar um erro se não enviar um arquivo.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', 1)
                .field('nome', faker.name.findName())
            
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
    })

    it('Deve retornar um erro se um parametro não for do tipo correto.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/inventarios/csv')
                .field('campus_id', "string")
                .field('nome', true)
                .attach('file', filePathErrado);
            
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.");
    })

})

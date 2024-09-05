import request from "supertest";
import {describe, expect, it, test} from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';
import { NOMEM } from "dns";


let token;
let campus_criado = null

describe('Teste de Autenticação', () => {

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

describe('get campus', () => {
    it("1-Deve retornar uma lista com todos os campus filtrados", async () =>{
        const req = await request(app)
        .get('/campus')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .query({
            nome:'campus vilhena',
            telefone:'98765-4321',
            cidade:'vilhena',
            bairro:'ifro',
            rua:'ifro'
        })
        expect(req.body.error).toEqual(false)
        expect(req.status).toBe(200)
        expect(req.body.message).toEqual("Requisição bem sucedida.")
        expect(req.body.data).toBeInstanceOf(Object)
        expect(req.body.data[0].nome).toBeDefined()
        expect(req.body.data[0].cidade).toBeDefined()
        expect(req.body.data[0].rua).toBeDefined()
        expect(req.body.data[0].bairro).toBeDefined()
        expect(req.body.data[0].telefone).toBeDefined()
    })

    it("2-deve retornar um erro quando nenhum campus for encontrado", async () => {
        const req = await request(app)
        .get('/campus')
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .query({
            nome:'campus não deve existir jamais',
            telefone:'903434659249280432374298',
            cidade:'camaroesdonorte',
            bairro:'a',
            rua:'a'
        })
        expect(req.body.error).toEqual(true)
        expect(req.status).toBe(404)
        expect(req.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })

it("3-deve retornar um erro quando os tipos de dados não forem os corretos (nome)", async () => {
  const req = await request(app)
    .get("/campus")
    .set("Authorization", `Bearer ${token}`)
    .set("Accept", "application/json")
    .query({
        nome:null,
    });


  expect(req.status).toBe(400);


  expect(req.body.error).toEqual(true);
  expect(req.body.message).toEqual(
    "Requisição com sintaxe incorreta ou outros problemas."
  );
});


    
})



})
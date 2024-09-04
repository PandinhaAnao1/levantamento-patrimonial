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
        .set("Accept", "aplication/json")
        .query({
            nome:'campus vilhena',
            cidade:'vilhena',
            rua:'ifro',
            bairro:'ifro',
            telefone:'98765-4321',
            numero_residencial:7171,
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
        expect(req.body.data[0].numero_residencial).toBeDefined()
    })
})



})
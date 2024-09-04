import request from "supertest";
import {describe, expect, it, test} from '@jest/globals';
import app from '../../app.js'
import faker from 'faker-br';

let token;
let campus_criado = null

describe('Teste de Autenticação', () => {

    it("1-Deve chamar a rota de autenticação e pegar o token", async () =>{
        const req = await(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            email:"emailExample@gmail.com",
            senha: "senhatest"
        })
        token = req.body.data.token
    })

    

})
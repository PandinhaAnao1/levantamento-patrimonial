import { describe, expect, it, test } from "@jest/globals";
import  request from "supertest";
import app from "../../app.js"

describe("Sala", () =>{
    it("Busca todos os bems pertencentes a uma sala", async() =>{
    const req = await request(app)
    .get("/salas/1/bens")
    .set("Accept","aplication/json")
    console.log(req.body)
    expect(req.status).toBe(200)
    })
    
});

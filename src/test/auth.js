// A ideia é que já que toda rota exige autenticação, para ficar mais fácil
// Aqui vai já fazer isso

export const postLogin = (req) => {
	return req
	.post("/login")
    .send({
        email: 'usuario1@example.com', 
        senha: 'senha123'
    })
	.set("Accept", "aplication/json");
};

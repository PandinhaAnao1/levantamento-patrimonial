// A ideia é que já que toda rota exige autenticação, para ficar mais fácil
// Aqui vai já fazer isso

export const postLogin = (req) => {
	return req
	.post("/login")
    .send({
        email: 'emailExample@gmail.com', 
        senha: 'senhatest'
    })
	.set("Accept", "aplication/json");
};

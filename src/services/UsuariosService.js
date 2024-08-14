import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsuarioService{
    
    static async login(login){
        /**
        * Função que ira gerenciar a realização do login do usuario
        * usando  senha e email, essa função ira retornar o usuario e o 
        * token para realizar a autenticação
        *
        * @param {Object}   login   objeto que sera desconstruido em email e senha para fazer a autenticação
        * @param {String}   email   email é a credencial de identificação do usuário.
        * @param {String}   senha   senha é o segredo o usuário, ela deve vim criptografada.
        *
        * @return {Object} O retorno é um objeto do javascript com os dados de usuario e token.
        */
        const PRIVATE_KEY = '1010FFF'

        const {email, senha} = login 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(!emailRegex.test(email) && senha == null || senha == undefined) throw new TypeError("E-mail inválido e senha não fornecida.");
        
        try{
            const senhaHash = senha;
            //await bcrypt.hash(senha, 10);
            const usuario = await UsuarioRepository.login({email, senhaHash});
            console.log("Usuario: "+ usuario)
            if(usuario == null || usuario == undefined) throw new ReferenceError("Usuario não exite na base de dados!"); 
            const jwtConfig = {
                expiresIn: '4d',  
                algorithm: 'HS256', 
              };

            const token = jwt.sign({ data: {'_id': usuario.usua_id} }, PRIVATE_KEY, jwtConfig); 
        
            return {
                'user':usuario,
                'token':token
            }
        }catch(error){
            throw new Error("Erro desconhecido opereção não ocorreu!");
        }
    }
}

export default UsuarioService;
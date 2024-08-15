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
        
        if(!emailRegex.test(email) || !senha || !email) throw new TypeError("E-mail inválido ou senha não fornecida.");
        
        const senhaHash = senha;
        const flitros = {
            where: {
                usua_email: email,
                usua_senha: senhaHash,
            },
        }
        //await bcrypt.hash(senha, 10);
        const usuario = await UsuarioRepository.login(flitros);
        if(usuario == null || usuario == undefined) throw new ReferenceError("Usuario não exite na base de dados!"); 
        const jwtConfig = {  expiresIn: '4d',    algorithm: 'HS256', };

        const token = jwt.sign({ data: {'_id': usuario.usua_id} }, PRIVATE_KEY, jwtConfig);
        
        return {
            'user':usuario,
            'token':token
        }
    }

    static async listarUsuarios(){
        return await ContaRepository.listarTodos()
    }

    static async listarUsuarioPorId(id){

        if(!usuariosExists){
            throw new Error ("usuario não existe");
        }

        return await ContaRepository.listar(id)
    }
}

export default UsuarioService;
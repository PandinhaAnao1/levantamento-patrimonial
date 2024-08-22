import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from 'bcrypt';
import UsuarioSchema from "../shemas/UsuarioSchema.js";
import {z} from "zod";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
        

        const {email, senha} = UsuarioSchema.login.parse(login);

        const SALT = process.env.SALT;
        const JWT = process.env.PRIVATE_KEY;
        
        const senhaHash = bcrypt.hash(senha, bcrypt.genSalt(SALT));

        const flitros = {
            where: {
                email: email,
                senha: senhaHash,
            },
        }
        const usuario = await UsuarioRepository.login(flitros);

        if(usuario){ 
            throw new z.ZodError([{
                path: ["usuario"],
                message:"Usuario não exite na base de dados!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 400, // Adicionando um detalhe personalizado
                  },
            }]);  
        }; 

        const jwtConfig = {  expiresIn: '4d',    algorithm: 'HS256', };

        const token = jwt.sign({ data: {'_id': usuario.usua_id} }, JWT, jwtConfig);
        
        return { 
            data:{
                token: token,
                usuario: usuario, 
            }
        }
    }

    static async listarUsuarios(){
        return await ContaRepository.listarTodos()
    }

    static async listarUsuarioPorId(id){
        const usuariosExists = await ContaRepository.listar(id)
        
        if(!usuariosExists){
            throw new Error ("usuario não existe");
        }

        return usuariosExists
    }
}

export default UsuarioService;
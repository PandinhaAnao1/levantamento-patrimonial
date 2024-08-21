import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from 'bcrypt';
import UsuarioSchema from "../shemas/UsuarioSchema.js";
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

        const {email, senha} = UsuarioSchema.login.parse(login); 
                
        const senhaHash = senha;
        const flitros = {
            where: {
                usua_email: email,
                usua_senha: senhaHash,
            },
            select:{
                usua_id: true,
                usua_nome: true,
                usua_email: true,
                usua_senha: false,
                usua_funcao: true,
                usua_status: true,
            }
        }
        //await bcrypt.hash(senha, 10);
        const usuario = await UsuarioRepository.login(flitros);
        if(usuario == null || usuario == undefined) throw new ReferenceError("Usuario não exite na base de dados!"); 
        const jwtConfig = {  expiresIn: '4d',    algorithm: 'HS256', };

        const token = jwt.sign({ data: {'_id': usuario.usua_id} }, PRIVATE_KEY, jwtConfig);
        
        return { usuario, token}
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
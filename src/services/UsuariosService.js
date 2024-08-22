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
                email: email,
                senha: senhaHash,
            },
            select:{
                id: true,
                nome: true,
                email: true,
                senha: false,
                funcao: true,
                status: true,
            }
        }
        //await bcrypt.hash(senha, 10);
        const usuario = await UsuarioRepository.login(flitros);
        if(usuario == null || usuario == undefined) throw new ReferenceError("Usuario não exite na base de dados!"); 
        const jwtConfig = {  expiresIn: '4d',    algorithm: 'HS256', };

        const token = jwt.sign({ data: {'_id': usuario.id} }, PRIVATE_KEY, jwtConfig);
        
        return { usuario, token}
    }

    static async listarUsuarios(parametros){

        const {nome,funcao,status} = UsuarioSchema.listarUsuarios.parse(parametros);

        let filtro = {
            where: {
                ...(nome && { nome: {contains: nome} }),
                ...(funcao && { funcao: funcao }),
                ...(status && { status: status })
            }
        };

        const usuarios = await UsuarioRepository.listarUsuarios(filtro);

        if(!usuarios){
            throw new z.ZodError([{
                path: ["usuarios"],
                message:"Não exite usario com esse parametro",
                code: z.ZodIssueCode.invalid_type,
            }]);
        }
        return usuarios;


    }

    static async listarUsuarioPorId(parametros){
        
        const {id} = UsuarioSchema.listarUsuarioPorId.parse({id:parametros});
        
        
        let filtro = {
            where: {
                ...(id && { id: id }),
            }
        };
        
        const usuario = await UsuarioRepository.listarUsuarioPorId(filtro);

        
        if(!usuario){
            throw new Error ("usuario não existe");
        }

        return usuario
    }

    static async criarUsuario(criarConta){
        const {nome,email,senha} = UsuarioSchema.criarUsuario.parse(criarConta);
        
        let criacao = {
            nome:nome,
            email:email,
            senha:senha

        };

        const novaConta = UsuarioRepository.criarUsuario(criacao);

        return novaConta;


    }

}

export default UsuarioService;
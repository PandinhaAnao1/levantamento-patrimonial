import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from 'bcrypt';
import UsuarioSchema from "../shemas/UsuarioSchema.js";
import {z, ZodError} from "zod";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

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

        const JWT = process.env.PRIVATE_KEY;

        const flitros = {
            where: {
                email: email,
            },
        }
        const usuario = await UsuarioRepository.login(flitros);

        if(!usuario){ 
            throw new z.ZodError([{
                path: ["usuario"],
                message:"Usuario não exite na base de dados verifique se o email esta correto!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 401, // Adicionando um detalhe personalizado
                  },
            }]);  
        };
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            throw new z.ZodError([{
                path: ["usuario"],
                message:"Senha informada esta incorreta!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 401, // Adicionando um detalhe personalizado
                  },
            }]);  
        }

        const jwtConfig = {  expiresIn: '4d',    algorithm: 'HS256', };

        const token = jwt.sign({ data: {'_id': usuario.id} }, JWT, jwtConfig);
        
        return { 
            data:{
                token: token,
                usuario: usuario, 
            }
        }
    }

    static async listarUsuarios(parametros){

        const {nome,funcao,status} = UsuarioSchema.listarUsuarios.parse(parametros);

        let filtro = {
            select:{
                "senha":false,
                "nome":true,
                "funcao":true,
                "status":true
                
              },
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

    static async criarUsuario(criarConta) {
        
        
        const { nome, email, senha, funcao, status } = UsuarioSchema.criarUsuario.parse(criarConta);
        const usuarioExist = UsuarioService.listarUsuarios({email:email});


        if(usuarioExist){
            throw new z.ZodError([{
                path: ["usuario"],
                message:"Não foi possivel criar usuario pois email já está cadastrado",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 409, // Adicionando um detalhe personalizado
                  },
            }]);
        }
        
        const saltRounds = 10;
        
        const senhaHashed = await bcrypt.hash(senha, saltRounds);
    
      
        let criacao = {
            data: {
                nome: nome,
                email: email,
                senha: senhaHashed,  
                funcao: funcao,
                status: true
            }
        };
    
        // Salvando o novo usuário no repositório
        const novaConta = await UsuarioRepository.criarUsuario(criacao);
    
        return novaConta;
    }


    static async atualizarUsuario(parametro){

        parametro = UsuarioSchema.atualizarUsuarioSchema.parse(parametro);

        const {id, nome, status, email, funcao} = parametro;

        const usuarioExiste = await UsuarioRepository.usuarioCadastrado(id);

        if(usuarioExiste == null){
            throw new Error ("Usuário não existe.")
        }

        let atualizacao = {
            where:{ id: id },
            data:{ 
                nome:nome,
                status:status,
                email:email,
                funcao:funcao},
            select:{
                id:true,
                nome:true,
                status:true,
                email:true,
                funcao:true
            }
        }

        return await UsuarioRepository.atualizar(atualizacao);
    }
}

export default UsuarioService;
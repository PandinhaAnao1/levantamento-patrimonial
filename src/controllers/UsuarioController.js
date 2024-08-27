import { z, ZodError, ZodIssueCode } from "zod";
import UsuarioService from '../services/UsuariosService.js'
import {sendResponse, sendError} from '../utils/mensages.js';
class UsuarioController {

    static async login(req,res){
        /**
        * Controller da rota de login, rota com o proposito de fazer o login 
        * para que funcione deacordo o usuario deve enviar a senha e email no
        * corpo da requisição para que seja procurado no banco de dados se esse usuario exite.
        *
        * @param {Object}   req   esse é o objeto http contendo a requisição para a api.
        * @param {Object}   res   esse é o objeto que a api ira usar para responde ao usuario.
        *
        * @return {Object}        o retorno é o objeto res com dados inseridos.
        */
        
        try{
            const usuario =  await UsuarioService.login(req.body);

            return sendResponse(res,200, {...usuario});
        }catch(err){
    
            //colocar a verificacao se o usuario esta ativo
            if(err instanceof ZodError) {
              const customError = err.issues.find(issue => issue.code === z.ZodIssueCode.custom);
              console.error(customError)
              if (customError) {
                let errors = err.errors[0];
                return sendError(res,parseInt(errors.params?.status),errors.message);
              }              
            }      
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }  
    }
    
  static listarUsuario = async (req, res) => {
    try {

      const {nome, funcao, status, email} = req.query

      const paramentros = {
        nome: nome,
        funcao: funcao,
        status: status === 'false' ? false : (status === 'true' ? true : status),
        email: email
      }

      const listaUsuarios = await UsuarioService.listarUsuarios(paramentros);
      return sendResponse(res,200, {data: listaUsuarios});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if (err.message === "Nem um usuário encontrado") {
        return sendError(res,404,"Nem um usuário encontrado");

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
    }
  };

  static listarUsuarioPorId = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const usuario = await UsuarioService.listarUsuarioPorId(id)

      return sendResponse(res,200, {data: usuario});

    } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if (err.message === "Usuario não encontrado.") {
        return sendError(res,404,"Usuario não encontrado.");

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");

      }
    }
  };

  static criarUsuario = async(req, res) => {
     try {

      const novoUsuario = await UsuarioService.criarUsuario(req.body);

      return sendResponse(res,201, {data:novoUsuario});
      
     } catch (err) {

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Não foi possivel criar usuario pois email já está cadastrado." ){
        return sendError(res,404,["Não foi possivel criar usuario pois email já está cadastrado."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
     }
  }

  static atualizarUsuario = async (req, res) => {
    try{
      let id = req.params.id
      let novoUsuario = {
        id: parseInt(id),
        ...req.body
      }
      
      const usuario = await UsuarioService.atualizarUsuario(novoUsuario)

      return sendResponse(res,201, {data: usuario});
      
    }catch(err){

      if(err instanceof ZodError){
        return sendError(res,400,err.errors[0].message);

      }else if(err.message == "Usuário não existe." ){
        return sendError(res,404,["Usuário não existe."]);

      }else{
        return sendError(res,500,"Ocorreu um erro interno no servidor!");
      }
  }
  }
}

export default UsuarioController;
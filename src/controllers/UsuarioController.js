import { ZodError } from "zod";
import { prisma } from "../configs/prismaClient.js"
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
            const data =  await UsuarioService.login(req.body);

            return sendResponse(res,200, {
              data:
              {
                  user: data.usuario,
                  token: data.token
              }});
        }catch(error){
            console.log(error);
            //colocar a verificacao se o usuario esta ativo
            if(error instanceof ZodError) return sendError(res,401,error.message);
                        
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }  
    }
    
  static listarUsuario = async (req, res) => {
    try {

      const listaContas = await UsuarioService.listarUsuarios(req.query);
      return res.status(200).json({ error: false, code: 200, message: "Registros encontrados", data: listaContas});

    } catch (err) {
      console.error(err);
      return res.status(500).json([
        {
          error: true,
          code: 500,
          message: "OCORREU UM ERRO INTERNO",
        },
      ]);
    }
  };

  static listarUsuarioPorId = async (req, res) => {
    try {
      console.log("aqui");
      const id_conta = parseInt(req.params.id);
      const unitExists = await UsuarioService.listarUsuarioPorId(id_conta)

      return res.status(200).json({ error: false, code: 200, message: "Registros encontrados", data: unitExists});
    } catch (err) {
      if (err.message === 'usuario não existe') {
        return res.status(404).json({ error: true, code: 404, message: err.message});
    }
      console.error(err);
      return res.status(500).json([
        {
          error: true,
          code: 500,
          message: "OCORREU UM ERRO INTERNO",
        },
      ]);
    }
  };

  static criarUsuario = async(req, res) => {
     try {

      const novoUsuario = await UsuarioService.criarUsuario(req.body);

      return sendResponse(res,201, {data:novoUsuario});
      
     } catch (erro) {
      console.log(erro)
      
      if(erro instanceof ZodError){
        
      }

      return sendError(res,500,"Ocorreu um erro interno no servidor!");

     }
  }

  static atualizarUsuario = (req, res) => {
    return null; // atualiza todos os campos
  };
}

export default UsuarioController;
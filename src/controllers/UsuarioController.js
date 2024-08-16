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

            })
            res.status(200).json({"token":data.token,"user":data.user})
        }catch(error){
            console.log(error);
            if(error instanceof TypeError) return sendError(res,401,error.message);
            
            if(error instanceof ReferenceError) return sendError(res,401,error.message);
            
            return sendError(res,500,"Ocorreu um erro interno no servidor!");
        }  
    }
    
  static listarUsuario = async (req, res) => {
    try {

      const lista_contas = await UsuarioService.listarUsuarios();

      return res.status(200).json({ error: false, code: 200, message: "Registros encontrados", data: lista_contas});

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
      console.log(id_conta);
      const unitExists = await UsuarioService.listarUsuarioPorId(id_conta)

      if (unitExists === null) {
        return res.status(400).json([
          {
            error: true,
            code: 400,
            message: "NÃO FOI ENCONTRADO NENHUM INVENTARIO",
          },
        ]);
      }

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

  static criarUsuario = (req, res) => {
    return null; // criar a conta com todos os dados
  };

  static atualizarUsuario = (req, res) => {
    return null; // atualiza todos os campos
  };
}

export default UsuarioController;
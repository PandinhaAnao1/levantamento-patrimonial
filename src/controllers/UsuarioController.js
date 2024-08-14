import { prisma } from "../configs/prismaClient.js"
import UsuarioRepository from '../services/UsuariosService.js'
import messages from '../utils/mensages.js';
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
            const data =  await UsuarioRepository.login(req.body);    
            res.status(200).json({"token":data.token,"user":data.user})
        }catch(error){
            if(error instanceof TypeError) return res.status(401).json(messages.httpCodes[401]);
            if(error instanceof ReferenceError) return res.status(401).json(messages.httpCodes[401]);
            return res.status(401).json(messages.httpCodes[401]);
        }  
    }
    
    static listarUsuarios = (req, res) => {
        return null // listar todas as contas
    }

    static listarUsuariosId = async (req, res) => {
        try {
            const id_conta = parseInt(req.params.id)
            console.log(id_conta)
            const unitExists = await prisma.usuario.findFirst({
                select: {
                    usua_id: true,
                    usua_email: true,
                    usua_senha: true,
                    usua_funcao: true,
                    usua_status: true,
                    usua_nome: true,
                },
                where: {
                    usua_id: id_conta
                }
            });

            if (unitExists === null) {
                return res.status(200).json([{
                    error: true,
                    code: 400,
                    message: "NÃO FOI ENCONTRADO NENHUM INVENTARIO"
                }])
            }

            return res.status(200).json(unitExists);
        } catch (err) {
            console.error(err);
            return res.status(500).json([{
                error: true,
                code: 500,
                message: "OCORREU UM ERRO INTERNO"
            }])
        }
    }

    static criarUsuario = (req, res) => {
        return null // criar a conta com todos os dados
    }

    static atualizarUsuario = (req, res) => {
        return null // atualiza todos os campos
    }
}

export default UsuarioController;
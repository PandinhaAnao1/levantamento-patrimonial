import { prisma } from "../configs/prismaClient.js"
import UsuarioRepository from '../services/UsuariosService.js'
import messages from '../utils/mensages.js';
class UsuarioController {

    static async login(req,res){
        try{
            const data =  await UsuarioRepository.login(req.body);    
            res.status(200).json({"token":data.token,"user":data.user})
        }catch(error){
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
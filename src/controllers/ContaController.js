import { prisma } from "../configs/prismaClient.js"

class ContaController {

    static listarContas = (req, res) => {
        return null
    }

    static listarPorId = async (req, res) => {
        try {
            console.log("aqui")
            const id_conta = parseInt(req.params.id)
            console.log(id_conta)
            const unitExists = await prisma.usuario.findFirst({
                select:{
                usua_id: true,
                usua_email: true,
                usua_senha: true,
                usua_funcao: true,
                usua_status: true,
                usua_nome: true,
                },
                where:{
                    usua_id:id_conta
                }
            });

            if(unitExists === null){
                return res.status(200).json([{
                    error: true,
                    code:400,
                    message:"NÃO FOI ENCONTRADO NENHUM INVENTARIO"
                }])
            }

            return res.status(200).json(unitExists);
    }catch (err){
        console.error(err);
        return res.status(500).json([{ 
            error: true, 
            code: 500, 
            message: "OCORREU UM ERRO INTERNO"
        }])
    }{

    }
    }

    static criarConta = (req, res) => {
        return null
    }

    static atualizarConta = (req, res) => {
        return null
    }
}

export default ContaController;
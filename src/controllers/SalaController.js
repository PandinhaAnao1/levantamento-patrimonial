import {prisma} from '../configs/prismaClient.js'

class systemSalaController {
    static listarSalas = (req, res) => {
        return null
    }
    

    static listarbens = async (req, res) => {
   
        try {
            const id = req.params.id;
            

            const itemExiste = await prisma.itens.findMany({
                where: {
                    iten_sala_id: parseInt(id)
                },

                select: {
                    iten_id: true,
                    iten_nome: true,
                    iten_tombo: true,
                }
            })

            if (itemExiste.length === 0) {
                return res.status(400).json([{
                    error: true,
                    code: 400,
                    message: "Nenhum item encontrado"
                }])
            } else {
                return res.status(200).json(
                    {
                        error: false,
                        code: 200,
                        message: "itens encontrado",
                        data: itemExiste
                    }
                )
            }
        } catch {
            return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
    
        }
    }

    static auditarBem = (req, res) => {
        return null
    }
}


export default systemSalaController;
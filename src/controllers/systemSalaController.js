import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class systemSalaController {
    static listarSalas = async (req, res) => {
        const idInventario = req.params.idInventario

        const salas = await prisma.inventarios.findMany({
            where:{
                 inve_id: parseInt(idInventario)
            },
            select: {

                sala_invent: {
                    select: {
                        sala: {
                            select:{
                                Sala_id: true,
                                Sala_Nome: true
                            }
                        }
                    }
                }
            }
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Usuários encontrados",
            data: salas
          });
  
    }

    static listarbens = (req, res) => {
        return null
    }

    static auditarBem = (req, res) => {
        return null
    }
}

export default systemSalaController;
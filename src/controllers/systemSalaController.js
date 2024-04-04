import { PrismaClient } from '@prisma/client'
import { count } from 'console'
const prisma = new PrismaClient()

class systemSalaController {
    static listarSalas = async (req, res) => {
        try{
            const idInventario = req.params.idInventario
    
            if(!idInventario){
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: "id do inventario não foi fornescido"
                });
            }
    
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

            if(salas){
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: "Nem uma sala foi encontrada",
                  });
            }else{
                return res.status(200).json({
                    error: false,
                    code: 200,
                    message: "Usuários encontrados",
                    data: salas
                });
            }
    

        }catch{
            return res.status(500).json({
                error: true,
                code: 500,
                message: "Erro interno do servido",
              });
        }
  
    }

    static listarbens = (req, res) => {
        return null
    }

    static auditarBem = (req, res) => {
        return null
    }
}

export default systemSalaController;
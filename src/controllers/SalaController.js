import SalaService  from '../services/salaService.js';

class SalaController {

    static listarBensSalas = async (req, res) => {
   
        try {
            const id = req.params.id;

            let filtro = {
                where: {
                    iten_sala_id: parseInt(id)
                },

                select: {
                    iten_id: true,
                    iten_nome: true,
                    iten_tombo: true,
                }
            }

            const itemExiste = await SalaService.listarPorIdSala(filtro)

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
}


export default SalaController;
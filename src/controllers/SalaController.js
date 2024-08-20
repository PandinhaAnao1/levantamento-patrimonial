import SalaService  from '../services/salaService.js';

class SalaController {

    static listarSalas = async (req, res) => {
   
        try {
            let query = req.query;
            const salas = await SalaService.listarSalas(query);
            return res.status(200).json(salas);
            
        } catch (error){
            if(error instanceof TypeError) return res.status(400).json({Message:error.message});

            return res.status(500).json({Message:"Erro interno no servidor."})
    
        }
    }
}


export default SalaController;
import { prisma } from "../configs/prismaClient.js";
import contaService from "../services/contaService.js";

class ContaController {
  static listarContas = async (req, res) => {
    try {

      const lista_contas = await contaService.listarTodos();

      return res.status(200).json({ lista_contas });

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

  static listarPorId = async (req, res) => {
    try {
      console.log("aqui");
      const id_conta = parseInt(req.params.id);
      console.log(id_conta);
      const unitExists = await contaService.listarPorId(id_conta);

      if (unitExists === null) {
        return res.status(200).json([
          {
            error: true,
            code: 400,
            message: "NÃO FOI ENCONTRADO NENHUM INVENTARIO",
          },
        ]);

  


      }

      return res.status(200).json(unitExists);
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

  static criarConta = (req, res) => {
    return null; // criar a conta com todos os dados
  };

  static atualizarConta = (req, res) => {
    return null; // atualiza todos os campos
  };
}

export default ContaController;

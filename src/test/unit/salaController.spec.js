import SalaController from '../../controllers/SalaController.js'
import {describe, expect} from '@jest/globals';

jest.mock('../../services/salaService.js', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    cadastrar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    atualizar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Controller listarbens', () => {
    
    it('1-Deve retornar um status 500 ao chamar a rota de listar', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: { nome: "laboratório 1" } };

        await SalaController.listarSalas(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('2-Deve retornar um status 500 ao chamar a rota de listar por id', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {params:{id: 1} };

        await SalaController.listarSalasPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('3-Deve retornar um status 500 ao chamar a rota de criar', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockCreate = {
            nome: "Laboratório de informatica",
        }

        const req = { body: mockCreate };

        await SalaController.cadastrarSalas(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('4-Deve retornar um status 500 ao chamar a rota de atualizar', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockAtualizar = {
            nome: "Sala de química",
        }

        const req = {body: mockAtualizar};

        await SalaController.atualizarSalas(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
});
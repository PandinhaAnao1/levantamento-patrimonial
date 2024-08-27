import usuarioController from '../../controllers/UsuarioController.js';
import {describe, expect} from '@jest/globals';

jest.mock('../../services/UsuariosService.js', () => ({
    login: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarUsuarios: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarUsuarioPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    criarUsuario: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    atualizarUsuario: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Controller listarbens', () => {
    
    it('1-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: { nome: "lucas" } };

        await usuarioController.listarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('2-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = {params:{id: 1} };

        await usuarioController.listarUsuarioPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('3-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockCreate = {
            nome: "lucas Teste",
            funcao: "CPALM",
            status: true,
            senha: "testesenha",
            email: "emailTest@gmail.com"
        }

        const req = { body: mockCreate };

        await usuarioController.criarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('4-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockAdicionar = {
            nome: "lucas Teste",
            funcao: "CPALM",
            status: true,
            senha: "testesenha",
            email: "emailTest@gmail.com"
        }

        const req = {body: mockAdicionar};

        await usuarioController.atualizarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({code: 500, 
                data: [], 
                error: true, 
                errors: [{"message": "Ocorreu um erro interno no servidor!"}], 
                message: "Servidor encontrou um erro interno."})
        );
    });
    it('5-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockAuditar = {
            senha: "testesenha",
            email: "emailTest@gmail.com"
        }

        const req = {body: mockAuditar};

        await usuarioController.login(req, res);

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
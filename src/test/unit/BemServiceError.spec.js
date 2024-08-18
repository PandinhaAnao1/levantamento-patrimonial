import BemController from '../../controllers/BemController.js';
import {describe, expect, test} from '@jest/globals';
import bemService from '../../services/bemService.js'
import bensRepository from '../../repositories/BemRepository.js';
import { z } from 'zod';
import faker from 'faker-br';
import { builtinModules } from 'module';

jest.mock('../../repositories/BemRepository', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    createBem: jest.fn(),
    createHistorico: jest.fn(),
    updataBem: jest.fn(),
    userExist: jest.fn(),
    getIds: jest.fn(),
    salaExist: jest.fn(),
    inventarioExist: jest.fn(),
    bemJaFoiAuditado: jest.fn(),
    createFilter: jest.fn()
}));

jest.mock('../../services/bemService.js', () => ({
    listar: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    listarPorId: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    create: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    adicionarBem: jest.fn().mockRejectedValue(new Error('Erro interno do serviço')),
    auditarBem: jest.fn().mockRejectedValue(new Error('Erro interno do serviço'))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Controller listarbens', () => {
    
    it('1-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: { sala_id: 1 } };

        await BemController.listarbens(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 500,
                data:[],
                error: true,
                errors: ["OCORREU UM ERRO INTERNO"],
                message: "Servidor encontrou um erro interno."
            })
        );
    });
    it('2-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const req = { body: { sala_id: 1 }, params:{id: 1} };

        await BemController.listarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 500,
                data:[],
                error: true,
                errors: ["OCORREU UM ERRO INTERNO"],
                message: "Servidor encontrou um erro interno."
            })
        );
    });
    it('3-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockCreate = {
            sala_id:1,
            bens_nome:"test",
            bens_decricao:"teste de insert",
            bens_tombo: "testetomb",
            bens_valor: 200 
        }

        const req = { body: mockCreate };

        await BemController.createBem(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 500,
                data:[],
                error: true,
                errors: ["OCORREU UM ERRO INTERNO"],
                message: "Servidor encontrou um erro interno."
            })
        );
    });
    it('4-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockAdicionar = {
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_nome:"test",
            bens_decricao:"teste de insert",
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_tombo: null,
            bens_responsavel: null,
            bens_valor: null 
        }

        const req = {body: mockAdicionar};

        await BemController.adicionarBem(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 500,
                data:[],
                error: true,
                errors: ["OCORREU UM ERRO INTERNO"],
                message: "Servidor encontrou um erro interno."
            })
        );
    });
    it('5-should return status 500 when bemService throws an error', async () => {
        const sendErrorMock = jest.fn();
        const res = { status: jest.fn(() => ({ json: sendErrorMock })) };

        const mockAuditar = {
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:"ruim",
            bens_ocioso:true,
            bens_imagem:null
        }

        const req = {body: mockAuditar};

        await BemController.auditarBem(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(sendErrorMock).toHaveBeenCalledWith(
            expect.objectContaining({
                code: 500,
                data:[],
                error: true,
                errors: ["OCORREU UM ERRO INTERNO"],
                message: "Servidor encontrou um erro interno."
            })
        );
    });
});
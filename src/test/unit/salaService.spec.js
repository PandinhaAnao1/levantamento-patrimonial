import {describe, expect, test} from '@jest/globals';
import { z } from 'zod';
import faker from 'faker-br';
import SalaService from '../../services/salaService.js';
import SalaRepository from '../../repositories/SalaRepository.js';


jest.mock('../../repositories/SalaRepository', () => ({
    filtrar: jest.fn(),
    filtrarPorId: jest.fn(),
    cadastrar: jest.fn(),
    atualizar: jest.fn(),
    createFilterSala: jest.fn(),
}));

describe('sala-listar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e listar todos as salas que pertence a um inventário.', async () => {

        const mockSala = [
            { id: 1, nome: 'Refeitorio 2' },
            { id: 1, nome: 'Laboratório 2' },
        ];

        const filter = {where: {inventario_id: 1}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.filtrar.mockResolvedValue(mockSala);

        const sala = await SalaService.listar({nome:"2",inventario_id: 1});

        expect(sala).toEqual(mockSala);
        expect(SalaRepository.filtrar).toHaveBeenCalledWith(filter);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado.', async () => {

        const filter = {where: {inventario_id: 1}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.filtrar.mockResolvedValue([]);

        await expect(SalaService.listar({inventario_id: 1})).rejects.toThrow("Salas não encontradas.");

        expect(SalaRepository.filtrar).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando o inventário_id não for informado.', async () => {

        const mockSala = [
            { id: 1, nome: 'Refeitorio 2' },
            { id: 1, nome: 'Laboratório 2' },
        ];

        const filter = {where: {inventario_id: 1}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter);
        SalaRepository.filtrar.mockResolvedValue(mockSala);

        await expect(SalaService.listar({})).rejects.toBeInstanceOf(z.ZodError);
    });
});

describe('sala-listar-por-id', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e buscar os dados de uma sala pelo id..', async () => {

        const mockSala = [
            { id: 1, nome: 'Refeitorio 2' },
        ];

        const filter = {where: {id:1}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.filtrarPorId.mockResolvedValue(mockSala);

        const sala = await SalaService.listarPorId({id:1});

        expect(sala).toEqual(mockSala);
        expect(SalaRepository.filtrarPorId).toHaveBeenCalledWith(filter);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado.', async () => {

        const filter = {where: {id: NaN}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.filtrarPorId.mockResolvedValue(null);

        await expect(SalaService.listarPorId({id: 10000})).rejects.toThrow("Sala não encontrada.");

        expect(SalaRepository.filtrarPorId).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando o id não for do tipo number.', async () => {

        const mockSala = [
            { id: 1, nome: 'Refeitorio 2' },
        ];

        const filter = {where: {id: NaN}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter);
        SalaRepository.filtrarPorId.mockResolvedValue(mockSala);

        await expect(SalaService.listarPorId({id:"string"})).rejects.toBeInstanceOf(z.ZodError);
    });
});

describe('sala-cadastrar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e cadastrar uma sala', async () => {

        const mockSala = { id: 1, nome: 'Refeitorio 2' }

        const filter = {where: {}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.cadastrar.mockResolvedValue(mockSala);

        const sala = await SalaService.cadastrar({nome: 'Refeitorio 2'});

        expect(sala).toEqual(mockSala);
        expect(SalaRepository.cadastrar).toHaveBeenCalledWith({
                                                                data: {nome: 'Refeitorio 2'},
                                                                select:filter.select
                                                            });
    });

    test('2-Deve retonar um erro quando o nome não for do tipo string.', async () => {

        const mockSala = [
            { id: 1, nome: 'Refeitorio 2' },
        ];

        const filter = {where: {}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter);
        SalaRepository.cadastrar.mockResolvedValue(mockSala);

        await expect(SalaService.cadastrar({nome: 3423424})).rejects.toBeInstanceOf(z.ZodError);
    });
});

describe('sala-atualizar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e atualizar uma sala', async () => {

        const mockSala = { id: 1, nome: 'Refeitorio 2' }

        const filter = {where: {id: 1}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.atualizar.mockResolvedValue(mockSala);

        const sala = await SalaService.atualizar(mockSala);

        expect(sala).toEqual(mockSala);
        expect(SalaRepository.atualizar).toHaveBeenCalledWith({
                                                                where: filter.where,
                                                                data:{
                                                                    nome: mockSala.nome
                                                                },
                                                                select: filter.select
                                                            });
    });

    test('2-Deve retornar um erro quando a sala não existir.', async () => {

        const filter = {where: {id: 10000}, select:{ nome:true, id:true}}

        const mockSala = { id: 1, nome: 'Refeitorio 2' }

        SalaRepository.createFilterSala.mockReturnValue(filter); 
        SalaRepository.filtrarPorId.mockResolvedValue(null);

        await expect(SalaService.atualizar(mockSala)).rejects.toThrow("Sala não encontrada.");
    });

    test('3-Deve retonar um erro quando o id não for do tipo number.', async () => {

        const mockSala = [
            { id: 1, nome: 'Refeitorio 2' },
        ];

        const filter = {where: {id: 1}, select:{ nome:true, id:true}}

        SalaRepository.createFilterSala.mockReturnValue(filter);
        SalaRepository.atualizar.mockResolvedValue(mockSala);

        await expect(SalaService.atualizar({ id: "string", nome: 'Refeitorio 2' })).rejects.toBeInstanceOf(z.ZodError);
    });
});
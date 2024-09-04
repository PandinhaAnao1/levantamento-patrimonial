import { describe, expect, test } from '@jest/globals';
import InventarioService from '../../services/InventarioService.js';
import InventarioRepository from '../../repositories/InventarioRepository.js'
import faker from 'faker-br';
import { ZodError } from 'zod';

jest.mock('../../repositories/InventarioRepository.js', () => ({
    listar: jest.fn(),
    contar: jest.fn(),
    listarPorId: jest.fn(),
    criar: jest.fn(),
    atualizar: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Teste dos services listar e contar!', () => {
    test('Deve testar o services de listar', async () => {
        const mockDeInventarios = [
            { nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus: 1 },
            { nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus: 2 },
        ];

        InventarioRepository.listar.mockResolvedValue(mockDeInventarios);

        const data = await InventarioService.listarInventarios({});

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(2);
        expect(data[0]).toEqual(mockDeInventarios[0]);
        expect(data[1]).toEqual(mockDeInventarios[1]);
    });

    test('Deve testar se vai dar erro ao listar inventarios vazios', async () => {

        InventarioRepository.listar.mockResolvedValue(null);
        try {
            const data = await InventarioService.listarInventarios({});
        } catch (error) {
            expect(InventarioRepository.listar).toHaveBeenCalled();
            expect(error).toBeInstanceOf(Object);
            expect(error).toBeInstanceOf(ZodError);
        }
    });
    test('Deve testar o services de contar itens!', async () => {

        InventarioRepository.contar.mockResolvedValue(2);

        const data = await InventarioService.contarInventarios({});

        expect(data).toEqual(2);
        expect(data).toBeDefined();
    });
    test('Deve testar o contar inventario vazio', async () => {

        InventarioRepository.contar.mockResolvedValue(null);
        try {
            const data = await InventarioService.contarInventarios({});
        } catch (error) {
            expect(InventarioRepository.contar).toHaveBeenCalled();
            expect(error).toBeInstanceOf(Object);
            expect(error).toBeInstanceOf(ZodError);
        }
    });
    test('Deve testar o services de listar por id', async () => {
        const mockDeInventarios = [
            { id: 1, nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus: 1 },
            { id: 2, nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus: 2 },
        ];

        InventarioRepository.listarPorId.mockResolvedValue(mockDeInventarios);

        const data = await InventarioService.listarInventarioPorId({ id: 1 });

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(2);
        expect(data[0]).toEqual(mockDeInventarios[0]);
        expect(data[1]).toEqual(mockDeInventarios[1]);
    });

    test('Deve testar o services de listar iventario com o id errado!', async () => {
        const mockDeInventarios = [
            { id: 1, nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus: 1 },
            { id: 2, nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus: 2 },
        ];

        InventarioRepository.listarPorId.mockResolvedValue(mockDeInventarios);
        try {
            const data = await InventarioService.listarInventarioPorId({ id: "A" });

        } catch (error) {

            expect(InventarioRepository.listarPorId).toHaveBeenCalledTimes(0);
            expect(error).toBeInstanceOf(Object);
            expect(error).toBeInstanceOf(ZodError);
        }
    });

    test('Deve testar o services de listar inventarios vazio!', async () => {

        InventarioRepository.listarPorId.mockResolvedValue(null);
        try {
            const data = await InventarioService.listarInventarioPorId({ id: 1 });

        } catch (error) {
            expect(InventarioRepository.listarPorId).toHaveBeenCalled();

            expect(error).toBeInstanceOf(Object);
            expect(error).toBeInstanceOf(ZodError)
        }

    });
});

describe("Deve testar o services de criar!", () => {
    test('Deve testar o cadastro de um inventario!', async () => {
        const mockDeInventarios =
        {
            nome: faker.commerce.productName(),
            data: faker.date.past().toString(),
            campus: 1
        };

        InventarioRepository.criar.mockResolvedValue({ ...mockDeInventarios, concluido: false });

        const data = await InventarioService.criarInventario(mockDeInventarios);

        expect(data).toBeInstanceOf(Object);
        expect(data).toEqual({ ...mockDeInventarios, concluido: false });
        expect(InventarioRepository.criar).toHaveBeenCalled();
    });
    test('Deve testar o cadastro de um inventario!', async () => {
        const mockDeInventarios =
        {
            nome: faker.commerce.productName(),
            data: faker.date.past().toString(),
            campus: 1
        };

        InventarioRepository.criar.mockResolvedValue({ ...mockDeInventarios, concluido: false });

        const data = await InventarioService.criarInventario(mockDeInventarios);

        expect(data).toBeInstanceOf(Object);
        expect(data).toEqual({ ...mockDeInventarios, concluido: false });
        expect(InventarioRepository.criar).toHaveBeenCalled();
    });
});
describe("Deve testar o services de atualizar um inventario!", () => {
    test('Deve testar a atualização de um inventario!', async () => {
        const mockDeInventarios =
        {
            id:'1',
            nome: faker.commerce.productName(),
            concluido: true,
        };

        InventarioRepository.atualizar.mockResolvedValue(mockDeInventarios);

        const data = await InventarioService.atualizarInvetario(mockDeInventarios);

        expect(data).toBeInstanceOf(Object);
        expect(data).toEqual(mockDeInventarios);
        expect(InventarioRepository.atualizar).toHaveBeenCalled();
    });
    test('Deve testar a atualização de um inventario errada!', async () => {
        const mockDeInventarios =
        {
            id:'a',
            nome: faker.commerce.productName(),
            concluido: true,
        };

        InventarioRepository.atualizar.mockResolvedValue(mockDeInventarios);

        const data = await InventarioService.atualizarInvetario(mockDeInventarios);

        expect(data).toBeInstanceOf(Object);
        expect(data).toEqual(mockDeInventarios);
        expect(InventarioRepository.atualizar).toHaveBeenCalled();
    });
   
});



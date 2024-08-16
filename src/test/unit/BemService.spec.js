import {describe, expect, test} from '@jest/globals';
import bemService from '../../services/bemService.js'
import bensRepository from '../../repositories/BemRepository.js';
import { z } from 'zod';

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

jest.mock('../../utils/mensages.js', () => ({
    sendResponse: jest.fn(),
    sendError: jest.fn()
}));

describe('bens-listar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e listar todos os bens', async () => {

        const mockBens = [
            { bens_id: 1, bens_sala_id: 1, bens_nome: 'Notebook', bens_estado: 'bom', bens_encontrado: true },
            { bens_id: 1, bens_sala_id: 2, bens_nome: 'Mesa Gamer', bens_estado: 'ruim', bens_encontrado: true },
        ];

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findAll.mockResolvedValue(mockBens);

        const bens = await bemService.listar({sala_id: 1});

        expect(bens).toEqual(mockBens);
        expect(bensRepository.findAll).toHaveBeenCalledWith(filter);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado', async () => {

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findAll.mockResolvedValue([]);

        await expect(bemService.listar({})).rejects.toThrow('Nem um registro encontrado');

        expect(bensRepository.findAll).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando sala_id estiver no formato ou tipo errado.', async () => {

        const mockBens = [
            { bens_id: 1, bens_sala_id: 1, bens_nome: 'Notebook', bens_estado: 'bom', bens_encontrado: true },
            { bens_id: 1, bens_sala_id: 2, bens_nome: 'Mesa Gamer', bens_estado: 'ruim', bens_encontrado: true },
        ];

        bensRepository.createFilter.mockReturnValue({});
        bensRepository.findAll.mockResolvedValue(mockBens);

        await expect(bemService.listar({sala_id:"n"})).rejects.toBeInstanceOf(z.ZodError);
    });
});

describe('bens-listar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e buscar um bem pelo id dele', async () => {

        const mockBens = [
            { bens_id: 1, bens_sala_id: 1, bens_nome: 'Notebook', bens_estado: 'bom', bens_encontrado: true }
        ];

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findById.mockResolvedValue(mockBens);

        const bens = await bemService.listarPorId({bens_id: 1});

        expect(bens).toEqual(mockBens);
        expect(bensRepository.findById).toHaveBeenCalledWith(filter);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado', async () => {

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findById.mockResolvedValue(null);

        await expect(bemService.listarPorId({bens_id: 1})).rejects.toThrow('Nem um registro encontrado');

        expect(bensRepository.findById).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando sala_id estiver no formato ou tipo errado.', async () => {

        const mockBens = [
            { bens_id: 1, bens_sala_id: 1, bens_nome: 'Notebook', bens_estado: 'bom', bens_encontrado: true },
            { bens_id: 1, bens_sala_id: 2, bens_nome: 'Mesa Gamer', bens_estado: 'ruim', bens_encontrado: true },
        ];

        bensRepository.createFilter.mockReturnValue({});
        bensRepository.findById.mockResolvedValue(mockBens);

        await expect(bemService.listarPorId({bens_id:"n"})).rejects.toBeInstanceOf(z.ZodError);
    });
});

describe('bens-create', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve criar um bem e retornar o bem criado', async () => {

        const mockBens = {
                sala_id:parseInt(1),
                bens_nome:"test unitario",
                bens_decricao:"teste feliz",
                bens_tombo: "23535TB",
                bens_responsavel: "lucas ferreira",
                bens_valor: parseInt(200)
            };

        bensRepository.salaExist.mockReturnValue({sala_nome: "teste unitario"});
        bensRepository.createBem.mockResolvedValue(mockBens);

        const bens = await bemService.create(mockBens);

        expect(bens).toEqual(mockBens);
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockBens.sala_id);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado', async () => {

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findById.mockResolvedValue(null);

        await expect(bemService.listarPorId({bens_id: 1})).rejects.toThrow('Nem um registro encontrado');

        expect(bensRepository.findById).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando sala_id estiver no formato ou tipo errado.', async () => {

        const mockBens = [
            { bens_id: 1, bens_sala_id: 1, bens_nome: 'Notebook', bens_estado: 'bom', bens_encontrado: true },
            { bens_id: 1, bens_sala_id: 2, bens_nome: 'Mesa Gamer', bens_estado: 'ruim', bens_encontrado: true },
        ];

        bensRepository.createFilter.mockReturnValue({});
        bensRepository.findById.mockResolvedValue(mockBens);

        await expect(bemService.listarPorId({bens_id:"n"})).rejects.toBeInstanceOf(z.ZodError);
    });
});

    // test('should return user by ID', async () => {
    //     // Arrange
    //     const mockUser = { id: 1, name: 'User 1' };
    //     userRepository.findById.mockResolvedValue(mockUser);

    //     // Act
    //     const user = await userService.listarPorID(1);

    //     // Assert
    //     expect(user).toEqual(mockUser);
    //     expect(userRepository.findById).toHaveBeenCalledWith(1);
    // });

    // test('should create a new user', async () => {
    //     // Arrange
    //     const mockUser = { id: 1, name: 'User 1' };
    //     userRepository.create.mockResolvedValue(mockUser);

    //     // Act
    //     const user = await userService.inserir(mockUser);

    //     // Assert
    //     expect(user).toEqual(mockUser);
    //     expect(userRepository.create).toHaveBeenCalledWith(mockUser);
    // });

    // test('should update a user', async () => {
    //     // Arrange
    //     const mockUser = { id: 1, name: 'Updated User', email: 'updated@test.com' };
    //     const mockExistingUser = { id: 1, name: 'User 1', email: 'test@test.com' };
    //     userRepository.findById.mockResolvedValue(mockExistingUser);
    //     userRepository.update.mockResolvedValue(mockUser);

    //     // Act
    //     const updatedUser = await userService.atualizar(1, mockUser);

    //     // Assert
    //     expect(updatedUser).toEqual(mockUser);
    //     expect(userRepository.findById).toHaveBeenCalledWith(1);
    //     expect(userRepository.update).toHaveBeenCalledWith(1, mockUser);
    // });

    // test('should throw error if email is already taken by another user during update', async () => {
    //     // Arrange
    //     const mockUser = { id: 1, name: 'Updated User', email: 'updated@test.com' };
    //     const mockExistingUser = { id: 1, name: 'User 1', email: 'test@test.com' };
    //     const mockOtherUserWithEmail = { id: 2, name: 'Other User', email: 'updated@test.com' };
    //     userRepository.findById.mockResolvedValue(mockExistingUser);
    //     userRepository.findByEmailExceptId.mockResolvedValue(mockOtherUserWithEmail);

    //     // Act & Assert
    //     await expect(userService.atualizar(1, mockUser)).rejects.toThrow('Email já cadastrado');
    //     expect(userRepository.findById).toHaveBeenCalledWith(1);
    //     expect(userRepository.findByEmailExceptId).toHaveBeenCalledWith('updated@test.com', 1);
    // });

    // test('should delete a user', async () => {
    //     // Arrange
    //     const mockUser = { id: 1, name: 'User 1' };
    //     userRepository.findById.mockResolvedValue(mockUser);
    //     userRepository.delete.mockResolvedValue(mockUser);

    //     // Act
    //     const deletedUser = await userService.excluir(1);

    //     // Assert
    //     expect(deletedUser).toEqual(mockUser);
    //     expect(userRepository.findById).toHaveBeenCalledWith(1);
    //     expect(userRepository.delete).toHaveBeenCalledWith(1);
    // });

    // test('should throw error if user to delete is not found', async () => {
    //     // Arrange
    //     userRepository.findById.mockResolvedValue(null);

    //     // Act & Assert
    //     await expect(userService.excluir(1)).rejects.toThrow('Usuário não encontrado');
    //     expect(userRepository.findById).toHaveBeenCalledWith(1);
    // });

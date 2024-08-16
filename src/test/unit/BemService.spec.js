import {describe, expect, test} from '@jest/globals';
import userService from '../../services/bemService.js'
import userRepository from '../../repositories/BemRepository.js';


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

describe('bens', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Deve chamar o banco e listar todos os bens', async () => {

        const mockBens = [
            { bens_id: 1, bens_sala_id: 1, bens_nome: 'Notebook', bens_estado: 'bom', bens_encontrado: true },
            { bens_id: 1, bens_sala_id: 2, bens_nome: 'Mesa Gamer', bens_estado: 'ruim', bens_encontrado: true },
        ];

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        userRepository.createFilter.mockReturnValue(filter); 
        userRepository.findAll.mockResolvedValue(mockBens);

        const users = await userService.listar({sala_id: 1});

        expect(users).toEqual(mockBens);
        expect(userRepository.findAll).toHaveBeenCalledWith(filter);
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
});

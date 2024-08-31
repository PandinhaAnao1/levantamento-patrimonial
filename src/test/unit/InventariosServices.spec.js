import {describe, expect, test} from '@jest/globals';
import InventarioService from '../../services/InventarioService.js';
import InventarioRepository from '../../repositories/InventarioRepository.js'
import faker from 'faker-br';

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

describe('Teste dos services listar',()=>{
    test('Deve testar o services de lstar',()=>{
        const mockDeInventarios = [
            {nome:faker.person.fullName(), data:faker.date ,concluido:faker.datatype.boolean(),campus:faker.company.buzzPhrase()}, 
            {nome:faker.person.fullName(), data:faker.date ,concluido:faker.datatype.boolean(),campus:faker.company.buzzPhrase()}, 
        ];

        InventarioRepository.listar.mockResolvedValue(mockDeInventarios);

        const data = InventarioService.listarInventarios();

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(2);
    });
});



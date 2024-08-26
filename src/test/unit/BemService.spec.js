import {describe, expect, test} from '@jest/globals';
import bemService from '../../services/bemService.js'
import bensRepository from '../../repositories/BemRepository.js';
import { z } from 'zod';
import faker from 'faker-br';

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
    createFilter: jest.fn(),
    createLevantamento: jest.fn()
}));

describe('bens-listar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e listar todos os bens.', async () => {

        const mockBens = [
            { id: 1, sala_id: 1, nome: 'Notebook', estado: 'bom' },
            { id: 1, sala_id: 2, nome: 'Mesa Gamer', estado: 'ruim' },
        ];

        const filter = {where: {sala_id:1}, select:{ nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findAll.mockResolvedValue(mockBens);

        const bens = await bemService.listar({sala_id: 1, inventario_id: 1});

        expect(bens).toEqual(mockBens);
        expect(bensRepository.findAll).toHaveBeenCalledWith(filter);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado.', async () => {

        const filter = {where: {sala_id:1}, select:{ nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findAll.mockResolvedValue([]);

        await expect(bemService.listar({inventario_id: 1})).rejects.toThrow('Nem um registro encontrado.');

        expect(bensRepository.findAll).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando sala_id estiver no formato ou tipo errado.', async () => {

        const mockBens = [
            { id: 1, sala_id: 1, nome: 'Notebook', estado: 'bom' },
            { id: 1, sala_id: 2, nome: 'Mesa Gamer', estado: 'ruim' },
        ];

        bensRepository.createFilter.mockReturnValue({});
        bensRepository.findAll.mockResolvedValue(mockBens);

        await expect(bemService.listar({sala_id:"n", inventario_id: 1})).rejects.toBeInstanceOf(z.ZodError);
    });
});

describe('bens-listar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e buscar um bem pelo id dele.', async () => {

        const mockBens = [
            { id: 1, sala_id: 1, nome: 'Notebook', estado: 'bom'}
        ];

        const filter = {where: {bem_id:1}, select:{ nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findById.mockResolvedValue(mockBens);

        const bens = await bemService.listarPorId({bem_id: 1});

        expect(bens).toEqual(mockBens);
        expect(bensRepository.findById).toHaveBeenCalledWith(filter);
    });

    test('2-Deve retornar um erro quando nem um registro for encontado.', async () => {

        const filter = {where: {id:1}, select:{ nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findById.mockResolvedValue(null);

        await expect(bemService.listarPorId({bem_id: 1})).rejects.toThrow('Nem um registro encontrado.');

        expect(bensRepository.findById).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando bem_id estiver no formato ou tipo errado.', async () => {

        const mockBens = [
            { id: 1, sala_id: 1, nome: 'Notebook', estado: 'bom'}
        ];

        bensRepository.createFilter.mockReturnValue({});
        bensRepository.findById.mockResolvedValue(mockBens);

        await expect(bemService.listarPorId({id:"n"})).rejects.toBeInstanceOf(z.ZodError);
    });
});


describe('bens-create', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve criar um bem e retornar o bem criado.', async () => {

        const mockBens = {
                bem_id:1,
                sala_id:1,
                inventario_id:1,
                nome:faker.commerce.productName(),
                descricao: faker.lorem.text(),
                tombo: "23535TB",
                responsavel: faker.name.findName(),
                valor: 200
            };

        bensRepository.salaExist.mockReturnValue({nome: "teste unitario"});
        bensRepository.inventarioExist.mockReturnValue({nome: "teste unitario"});
        bensRepository.createBem.mockResolvedValue(mockBens);

        const bens = await bemService.create(mockBens);

        expect(bens).toEqual(mockBens);
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockBens.sala_id);
    });

    test('2-Deve retornar um erro quando o sala_id não existir.', async () => {

        const mockBens = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            nome:faker.commerce.productName(),
            descricao: faker.lorem.text(),
            tombo: "23535TB",
            responsavel: faker.name.findName(),
            valor: 200
        };

        bensRepository.salaExist.mockReturnValue(null);
        bensRepository.createBem.mockResolvedValue(mockBens);

        await expect(bemService.create(mockBens)).rejects.toThrow("Sala ou inventário informado não existe.");
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockBens.sala_id);

    });

    test('3-Deve retonar um erro quando algum parâmetro não for do tipo correto.(nome, descrição)', async () => {

        const mockBens = {
                bem_id:1,
                sala_id:1,
                nome:null,
                descricao:true,
                tombo: "23535TB",
                responsavel: faker.name.findName(),
                valor: 200
            };

        bensRepository.salaExist.mockReturnValue({sala_nome: "teste unitario"});
        bensRepository.createBem.mockResolvedValue(mockBens);

        await expect(bemService.create(mockBens)).rejects.toBeInstanceOf(z.ZodError);

    });
});


describe('bens-adicionar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve criar um bem e auditar ele ao mesmo tempo, retornando o bem criado e o seu histórico guardado.', async () => {

        const mockParamentros = {
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            nome:faker.commerce.productName(),
            descricao:faker.lorem.text(),
            estado:"bom",
            ocioso:false,
            imagem:null,
            tombo: "TB9898",
            responsavel: null,
            valor: 200 
        }

        const mockBens = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            nome:faker.commerce.productName(),
            descricao:faker.lorem.text(),
            tombo: "TB9898",
            valor: 200 
        }

        const mockLevantamento = {
            id:1,
            usuario_id: mockParamentros.usuario_id,
            inventario_id: mockParamentros.inventario_id,
            sala_id: mockParamentros.sala_id,
            bem_id: mockBens.bem_id,
            estado:"bom",
            ocioso:false,
            imagem:null
        }

        bensRepository.userExist.mockReturnValue({usuario_id: 1});
        bensRepository.salaExist.mockReturnValue({sala_id: 1});
        bensRepository.inventarioExist.mockReturnValue({inventario_id: 1});

        bensRepository.createBem.mockResolvedValue(mockBens);
        bensRepository.createLevantamento.mockResolvedValue(mockLevantamento); 

        const bemAdicionaHistorio = await bemService.adicionarBem(mockParamentros);

        expect(bemAdicionaHistorio).toEqual({levantamento: mockLevantamento, bem: mockBens});
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockParamentros.sala_id);
        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.inventarioExist).toHaveBeenCalledWith(mockParamentros.inventario_id);

    });

    test('2-Deve retornar um erro quando o sala_id não existir.', async () => {

        const mockParamentros = {
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            nome:faker.commerce.productName(),
            descricao:faker.lorem.text(),
            estado:"bom",
            ocioso:false,
            imagem:null,
        }

        bensRepository.userExist.mockReturnValue({usuario_id: 1});
        bensRepository.salaExist.mockReturnValue(null);
        bensRepository.inventarioExist.mockReturnValue({inventario_id: 1});

        await expect(bemService.adicionarBem(mockParamentros)).rejects.toThrow("usuario, sala ou inventário não existem");
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockParamentros.sala_id);
        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.inventarioExist).toHaveBeenCalledWith(mockParamentros.inventario_id);
    });

    test('3-Deve retonar um erro quando algum parâmetro não for do tipo correto.(nome, descrição)', async () => {

        const mockParamentros = {
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            nome:false,
            descricao:true,
            estado:"bom",
            ocioso:false,
            imagem:null,
            tombo: "TB9898",
            responsavel: null,
            valor: 200 
        }

        await expect(bemService.adicionarBem(mockParamentros)).rejects.toBeInstanceOf(z.ZodError);

    });
});

describe('bens-auditar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve auditar bem e retornar o bem criado e o seu histórico guardado.', async () => {

        const mockParamentros = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            imagem:null,
            estado:"bom",
            ocioso:false,
        }

        const mockBens = {
            id:1,
            sala_id:1,
            inventario:1,
            nome:faker.commerce.productName(),
            descricao:faker.lorem.text(),
            tombo: "TB9898",
            responsavel: faker.name.findName(),
            valor: 200,
        }

        const mockLevantamento = {
            id:1,
            usuarios_id: mockParamentros.usuario_id,
            inventarios_id: mockParamentros.inventario_id,
            salas_id: mockParamentros.sala_id,
            bens_id: mockBens.bem_id,
            estado:"bom",
            ocioso:false,
            imagem:null,
            encontrado: true
        }

        const filter = {where: {bem_id:1}, select:{ nome:true}}

        
        bensRepository.userExist.mockReturnValue({usuario_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue({id: 1, inventario_id:1});
        
        bensRepository.createFilter.mockReturnValue(filter);
        bensRepository.findById.mockResolvedValue(mockBens);

        bensRepository.createLevantamento.mockResolvedValue(mockLevantamento); 

        const bemAdicionaHistorio = await bemService.auditarBem(mockParamentros);

        expect(bemAdicionaHistorio).toEqual({levantamento: mockLevantamento, bem: mockBens});

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bem_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bem_id);

    });

    test('2-Deve retornar um erro quando os parâmetros informados estiverem no formato errado.(estado, ocioso)', async () => {

        const mockParamentros = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            imagem:null,
            estado:false,
            ocioso:"bom",
        }

        await expect(bemService.auditarBem(mockParamentros)).rejects.toBeInstanceOf(z.ZodError);

    });

    test('3-Deve retonar um erro quando o bem_id não existir no banco.', async () => {

        const mockParamentros = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            imagem:null,
            estado:"bom",
            ocioso:false,
        }
        
        bensRepository.userExist.mockReturnValue({usuario_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue(null);

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("Bem inforamdo não existe.");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bem_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bem_id);
    });

    test('4-Deve retonar um erro quando o usuario_id não existir no banco.', async () => {

        const mockParamentros = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            imagem:null,
            estado:"bom",
            ocioso:false,
        }
        
        bensRepository.userExist.mockReturnValue(null);
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue({id: 1, inventario_id:1});

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("Usuario inforamdo não existe.");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bem_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bem_id);
    });

    test('5-Deve retonar um erro quando o inventario_id passado não for o mesmo do bem_id passado.', async () => {

        const mockParamentros = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            imagem:null,
            estado:"bom",
            ocioso:false,
        }
        
        bensRepository.userExist.mockReturnValue({usuario_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue({id: 1, inventario_id:1000});

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("O Bem não pertence ao inventário informado.");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bem_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bem_id);
    });

    test('6-Deve retonar um erro quando o bem já tiver sido auditado.', async () => {

        const mockParamentros = {
            bem_id:1,
            sala_id:1,
            inventario_id:1,
            usuario_id:1,
            imagem:null,
            estado:"bom",
            ocioso:false,
        }
        
        bensRepository.userExist.mockReturnValue({usuario_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue({id: 1});
        bensRepository.getIds.mockReturnValue({id: 1, inventario_id:1});

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("Bem já foi auditado.");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usuario_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bem_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bem_id);
    });
});
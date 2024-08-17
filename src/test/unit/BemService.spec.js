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
    createFilter: jest.fn()
}));

describe('bens-listar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1-Deve chamar o banco e listar todos os bens.', async () => {

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

    test('2-Deve retornar um erro quando nem um registro for encontado.', async () => {

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

    test('1-Deve chamar o banco e buscar um bem pelo id dele.', async () => {

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

    test('2-Deve retornar um erro quando nem um registro for encontado.', async () => {

        const filter = {where: {bens_id:1}, select:{ bens_nome:true}}

        bensRepository.createFilter.mockReturnValue(filter); 
        bensRepository.findById.mockResolvedValue(null);

        await expect(bemService.listarPorId({bens_id: 1})).rejects.toThrow('Nem um registro encontrado');

        expect(bensRepository.findById).toHaveBeenCalledWith(filter);
    });

    test('3-Deve retonar um erro quando bens_id estiver no formato ou tipo errado.', async () => {

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

    test('1-Deve criar um bem e retornar o bem criado.', async () => {

        const mockBens = {
                bens_id:1,
                sala_id:1,
                bens_nome:faker.commerce.productName(),
                bens_decricao: faker.lorem.text(),
                bens_tombo: "23535TB",
                bens_responsavel: faker.name.findName(),
                bens_valor: 200
            };

        bensRepository.salaExist.mockReturnValue({sala_nome: "teste unitario"});
        bensRepository.createBem.mockResolvedValue(mockBens);

        const bens = await bemService.create(mockBens);

        expect(bens).toEqual(mockBens);
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockBens.sala_id);
    });

    test('2-Deve retornar um erro quando o sala_id não existir.', async () => {

        const mockBens = {
            bens_id:1,
            sala_id:1,
            bens_nome:faker.commerce.productName(),
            bens_decricao: faker.lorem.text(),
            bens_tombo: "23535TB",
            bens_responsavel: faker.name.findName(),
            bens_valor: 200
        };

        bensRepository.salaExist.mockReturnValue(null);
        bensRepository.createBem.mockResolvedValue(mockBens);

        await expect(bemService.create(mockBens)).rejects.toThrow("O sala_id informado não existem");
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockBens.sala_id);

    });

    test('3-Deve retonar um erro quando algum parâmetro não for do tipo correto.(nome, descrição)', async () => {

        const mockBens = {
                bens_id:1,
                sala_id:1,
                bens_nome:null,
                bens_decricao:true,
                bens_tombo: "23535TB",
                bens_responsavel: faker.name.findName(),
                bens_valor: 200
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
            inve_id:1,
            usua_id:1,
            bens_nome:faker.commerce.productName(),
            bens_decricao:faker.lorem.text(),
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_tombo: "TB9898",
            bens_responsavel: null,
            bens_valor: 200 
        }

        const mockBens = {
            bens_id:1,
            bens_sala_id:1,
            bens_nome:faker.commerce.productName(),
            bens_decricao:faker.lorem.text(),
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_tombo: "TB9898",
            bens_responsavel: null,
            bens_valor: 200 
        }

        const mockhistorico = {
            hist_id:1,
            hist_usuarios_id: mockParamentros.usua_id,
            hist_inventarios_id: mockParamentros.inve_id,
            hist_salas_id: mockParamentros.sala_id,
            hist_bens_id: mockBens.bens_id
        }

        bensRepository.userExist.mockReturnValue({usua_id: 1});
        bensRepository.salaExist.mockReturnValue({sala_id: 1});
        bensRepository.inventarioExist.mockReturnValue({inve_id: 1});

        bensRepository.createBem.mockResolvedValue(mockBens);
        bensRepository.createHistorico.mockResolvedValue(mockhistorico); 

        const bemAdicionaHistorio = await bemService.adicionarBem(mockParamentros);

        expect(bemAdicionaHistorio).toEqual({historico: mockhistorico, bem: mockBens});
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockParamentros.sala_id);
        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.inventarioExist).toHaveBeenCalledWith(mockParamentros.inve_id);

    });

    test('2-Deve retornar um erro quando o sala_id não existir.', async () => {

        const mockParamentros = {
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_nome:faker.commerce.productName(),
            bens_decricao:faker.lorem.text(),
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_tombo: "TB9898",
            bens_responsavel: null,
            bens_valor: 200 
        }

        bensRepository.userExist.mockReturnValue({usua_id: 1});
        bensRepository.salaExist.mockReturnValue(null);
        bensRepository.inventarioExist.mockReturnValue({inve_id: 1});

        await expect(bemService.adicionarBem(mockParamentros)).rejects.toThrow("usuario, sala ou inventário não existem");
        expect(bensRepository.salaExist).toHaveBeenCalledWith(mockParamentros.sala_id);
        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.inventarioExist).toHaveBeenCalledWith(mockParamentros.inve_id);
    });

    test('3-Deve retonar um erro quando algum parâmetro não for do tipo correto.(nome, descrição)', async () => {

        const mockParamentros = {
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_nome:false,
            bens_decricao:true,
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_tombo: "TB9898",
            bens_responsavel: null,
            bens_valor: 200 
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
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
        }

        const mockInsert = {
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_encontrado: true
        }

        const mockBens = {
            bens_id:1,
            bens_sala_id:1,
            bens_nome:faker.commerce.productName(),
            bens_decricao:faker.lorem.text(),
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
            bens_tombo: "TB9898",
            bens_responsavel: faker.name.findName(),
            bens_valor: 200,
            bens_encontrado: true
        }

        const mockhistorico = {
            hist_id:1,
            hist_usuarios_id: mockParamentros.usua_id,
            hist_inventarios_id: mockParamentros.inve_id,
            hist_salas_id: mockParamentros.sala_id,
            hist_bens_id: mockBens.bens_id
        }

        const filter = {where: {bens_sala_id:1}, select:{ bens_nome:true}}

        
        bensRepository.userExist.mockReturnValue({usua_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue({bens_sala_id: 1, salas:{sala_inve_id: 1}});
        
        bensRepository.createFilter.mockReturnValue(filter);
        bensRepository.findById.mockResolvedValue(mockBens);

        bensRepository.createHistorico.mockResolvedValue(mockhistorico); 

        const bemAdicionaHistorio = await bemService.auditarBem(mockParamentros);

        expect(bemAdicionaHistorio).toEqual({historico: mockhistorico, bem: mockBens});

        expect(bensRepository.updataBem).toHaveBeenCalledWith({
            where: {bens_id: mockParamentros.bens_id},
            data: mockInsert,
        });

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bens_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bens_id);

    });

    test('2-Deve retornar um erro quando os parâmetros informados estiverem no formato errado.(estado, ocioso)', async () => {

        const mockParamentros = {
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:false,
            bens_ocioso:"bom",
            bens_imagem:null,
        }

        await expect(bemService.auditarBem(mockParamentros)).rejects.toBeInstanceOf(z.ZodError);

    });

    test('3-Deve retonar um erro quando o bens_id não existir no banco.', async () => {

        const mockParamentros = {
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
        }
        
        bensRepository.userExist.mockReturnValue({usua_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue(null);

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("bem inforamdo não existe");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bens_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bens_id);
    });

    test('4-Deve retonar um erro quando o usua_id não existir no banco.', async () => {

        const mockParamentros = {
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
        }
        
        bensRepository.userExist.mockReturnValue(null);
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue({bens_sala_id: 1, salas:{sala_inve_id: 1}});

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("Usuario não existe");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bens_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bens_id);
    });

    test('5-Deve retonar um erro quando o sala_id ou o inve_id passados não forem os mesmo do bens_id passado.', async () => {

        const mockParamentros = {
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
        }
        
        bensRepository.userExist.mockReturnValue({usua_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue(null);
        bensRepository.getIds.mockReturnValue({bens_sala_id: 100000, salas:{sala_inve_id: 100000}});

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("O Bem não pertence a sala ou inventário informado");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bens_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bens_id);
    });

    test('6-Deve retonar um erro quando o bem já tiver sido auditado.', async () => {

        const mockParamentros = {
            bens_id:1,
            sala_id:1,
            inve_id:1,
            usua_id:1,
            bens_estado:"bom",
            bens_ocioso:false,
            bens_imagem:null,
        }
        
        bensRepository.userExist.mockReturnValue({usua_id: 1});
        bensRepository.bemJaFoiAuditado.mockReturnValue({hist_id: 1});
        bensRepository.getIds.mockReturnValue({bens_sala_id: 1, salas:{sala_inve_id: 1}});

        await expect(bemService.auditarBem(mockParamentros)).rejects.toThrow("Bem já foi auditado.");

        expect(bensRepository.userExist).toHaveBeenCalledWith(mockParamentros.usua_id);
        expect(bensRepository.bemJaFoiAuditado).toHaveBeenCalledWith(mockParamentros.bens_id);
        expect(bensRepository.getIds).toHaveBeenCalledWith(mockParamentros.bens_id);
    });
});
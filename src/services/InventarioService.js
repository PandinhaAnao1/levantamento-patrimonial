import InvRepository from "../repositories/InventarioRepository.js";
import IvSchema from "../shemas/InventarioSchema.js";
import {z, ZodIssueCode}  from "zod";
import Stream from "stream";
import fastcsv from 'fast-csv';
import InventarioRepository from "../repositories/InventarioRepository.js";

import CSVFileValidator from 'csv-file-validator'


class InventarioService{
    
    static async importCSV(arquivo, inventario_id){
        if (arquivo.mimetype != 'text/csv') {
            throw new Error("arquivo do tipo errado.")
        }

        const csvStreamSala = new Stream.PassThrough();
        csvStreamSala.end(arquivo.buffer);

        const config = {
            headers: [
                {
                    name: 'bem_nome',
                    inputName: 'bem_nome',
                    required: true,
                    requiredError: function (headerName, rowNumber, columnNumber) {
                        throw new Error(`${headerName} is required in the ${rowNumber} row / ${columnNumber} column`)
                    }
                },
                {
                    name: 'bem_tombo',
                    inputName: 'bem_tombo',
                    required: true,
                    requiredError: function (headerName, rowNumber, columnNumber) {
                        throw new Error(`${headerName} is required in the ${rowNumber} row / ${columnNumber} column`)
                    }
                },
                {
                    name: 'bem_descricao',
                    inputName: 'bem_descricao',
                    required: true,
                    requiredError: function (headerName, rowNumber, columnNumber) {
                        throw new Error(`${headerName} is required in the ${rowNumber} row / ${columnNumber} column`)
                    }
                },
                {
                    name: 'bem_responsavel',
                    inputName: 'bem_responsavel',
                    required: true,
                    requiredError: function (headerName, rowNumber, columnNumber) {
                        throw new Error(`${headerName} is required in the ${rowNumber} row / ${columnNumber} column`)
                    }
                },
                {
                    name: 'bem_valor',
                    inputName: 'bem_valor',
                    required: true,
                    requiredError: function (headerName, rowNumber, columnNumber) {
                        throw new Error(`${headerName} is required in the ${rowNumber} row / ${columnNumber} column`)
                    }
                },
                {
                    name: 'sala_nome',
                    inputName: 'sala_nome',
                    required: true,
                    requiredError: function (headerName, rowNumber, columnNumber) {
                        throw new Error(`${headerName} is required in the ${rowNumber} row / ${columnNumber} column`)
                    }
                },
            ]
        }

        CSVFileValidator(csvStreamSala, config)
            .then(csvData => {
                csvData.data // Array of objects from file
                console.log(csvData.inValidData) // Array of error messages
            })
            .catch(err => {return err})

        const nomeSalasCSV = new Set();

        fastcsv.parseStream(csvStreamSala, { headers: true, delimiter: ';', columns: true})
        .on('data', (row) => {
            nomeSalasCSV.add(row['sala_nome']);
        })

        const salas = await InventarioRepository.listarSalas()
        const nomeSalasBanco = []

        let idSalas = filterOgj(salas)
        
        function filterOgj(obj){
            return obj.reduce((obj, item) => {
                obj[item.nome] = item.id;
                nomeSalasBanco.push(item.nome)
                return obj;
              }, {});
        }

        const salasNaoCadastradas = [...nomeSalasCSV].filter(item => !nomeSalasBanco.includes(item));

        if(salasNaoCadastradas.length > 0){
            for (const salaNome of salasNaoCadastradas) {
                await InventarioRepository.createSala({data:{
                    nome:salaNome
                }})
            }
            idSalas = filterOgj(await InventarioRepository.listarSalas())
        }

        let insertBens = []
        let listaInsertBens = []

        const csvStreamBens = new Stream.PassThrough();
        csvStreamBens.end(arquivo.buffer);


        fastcsv.parseStream(csvStreamBens, { headers: true, delimiter: ';', columns: true})
        .on('data', async (row) => {
            
            if(insertBens.length >= 1000){

                listaInsertBens.push(insertBens)
                insertBens = []
            }

            const tupula = {
                nome: row['bem_nome'],
                tombo: row['bem_tombo'],
                descricao: row['bem_descricao'],
                responsavel: row['bem_responsavel'], 
                valor: row['bem_valor'],
                inventario_id: parseInt(inventario_id),
                sala_id: parseInt(idSalas[row['sala_nome']]),
                auditado: false
            };
            insertBens.push(tupula)
        })
        .on('end', async () => {
            if(insertBens.length > 0){

                listaInsertBens.push(insertBens)
                insertBens = []

                for (const bens of listaInsertBens) {
                    await InventarioRepository.insertBens({data:bens})
                }
                listaInsertBens = []
                console.log("finalizou")
            }
        }) 
    }

    
    static async contarInventarios(filtros){

        const {nome, data, concluido, campus, pagina} = IvSchema.listarSchema.parse(filtros);

        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { nome: {contains: nome} }),
                ...(data && { data: data }),
                ...(concluido && { concluido: concluido }),
                ...(campus && { campus_id: campus }),
                
            }
        };

        const totalInventarios = await InvRepository.contar(filtro);

        if(!totalInventarios){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi contar inventários com esse parâmetros!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 404, // Adicionando um detalhe personalizado
                  },
            }]);
        }

        return totalInventarios;
        

    }
    static async listarInventarios(filtros){
        
        const {nome, data, concluido, campus, pagina} = IvSchema.listarSchema.parse(filtros);

        let filtro = {
            ...(pagina && { take: 10 ,skip: pagina * 10}),
            where: {
                ...(nome && { nome: {contains: nome} }),
                ...(data && { data: data }),
                ...(concluido && { concluido: concluido }),
                ...(campus && { campus_id: campus }),
                
            }
        };
        
        const iventario = await InvRepository.listar(filtro);
    
        if(!iventario) {
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi possível encontrar inventários com esse parâmetros",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 404, // Adicionando um detalhe personalizado
                  },
            }]);
        }

        return iventario;
        
    }

    static async listarInventarioPorId(parametros){
        //Futuramente vou trocar essa logica vou colocar o esquema de validação e transformação 
        //do zod

        let regex = /^[0-9]+$/;
        
        let idString = parametros.id;
        if(!regex.test(idString)){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"O id do inventario deve ser um numero!",
                code: z.ZodIssueCode.custom,
                params: {
                    status: 404, // Adicionando um detalhe personalizado
                  },

            }]);
        }
        const {id} = IvSchema.listarPorIdSchema.parse({'id':parseInt(idString)});

        let filtro = {
            where:{
                id: id
            }
        }
        const inventario = await InvRepository.listarPorId(filtro);

        if(!inventario) {
            throw new z.ZodError([{
                path: ["inventario"],
                message:"Não foi possivel encontrar um inventario com esse id",
                code: z.ZodIssueCode.custom,
                params:{
                    status: 404
                }
            }]);
        };

        return inventario;
    }


    static async criarInventario(inventario){

        
        const {nome,data,campus} = IvSchema.criar.parse(inventario);
        //Vou ter que espeara alguem criar a rota de listar campus por id para
        //concluir essa funcao pois vou precisar o listar campus por id
        let body = {
            data:{
                nome:nome,
                data:data,
                concluido:false,
                campus_id: campus
            }
        };


        const novoInventario = InvRepository.criar(body);


        return novoInventario;

    }


    static async atualizarInvetario(atualizacoes){

        let regex = /^[0-9]+$/;

        //Colar verificação se o inventario foi atualizado

        
        const  { id,  ... resto} = atualizacoes;
        //Corrigir o .id usar algma forma melhor
        if(!regex.test(id.id)){
            throw new z.ZodError([{
                path: ["inventario"],
                message:"O id do inventario deve ser um numero!",
                code: z.ZodIssueCode.custom,
                params:{
                    status: 404
                }
            }]);
        }
        let numero  = {id:parseInt(id.id)};

        const {nome, status} = IvSchema.atualizarSchema.parse(resto);

        // if(!status && status != null && status != undefined){
        //     throw new z.ZodError([{
        //         path: ["inventario"],
        //         message:"O inventario pode ser apenas atualizado para concluido!",
        //         code: z.ZodIssueCode.custom,
        //         params:{
        //             status: 404
        //         }
        //     }]);
        // }

        let inventarioAtulizado = {
            where: {
                id: numero.id,
            },
            data: {
                ...(nome && { nome: nome}),
                ...(status && { concluido: true}),                
            },
        }

        const inventario = InvRepository.atualizar(inventarioAtulizado);

        return inventario;

    }
}

export default InventarioService;

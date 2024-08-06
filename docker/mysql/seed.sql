
-- Inserindo dados na tabela Usuario
INSERT INTO db_Levantamento_Patrimonial.Usuario (usua_email, usua_funcao, usua_nome, usua_senha, usua_status)
VALUES 
    ('usuario1@example.com', 'auditor', 'João Silva', 'senha123',  1),
    ('usuario2@example.com', 'auditor', 'Maria Santos', 'senha456',  1),
    ('usuario3@example.com', 'funcionario cpalm', 'Carlos Oliveira', 'senha789',  1 ),
    ('usuario1@email.com', 'funcionário cpalm', 'João Silva', 'senha1', 1),
	('usuario2@email.com', 'funcionário cpalm', 'Maria Santos', 'senha2', 1),
	('usuario3@email.com', 'auditor', 'Pedro Oliveira', 'senha3', 1),
	('usuario4@email.com', 'funcionário cpalm', 'Ana Costa', 'senha4', 1),
	('usuario5@email.com', 'funcionário cpalm', 'Lucas Pereira', 'senha5', 1),
	('usuario6@email.com', 'auditor', 'Camila Martins', 'senha6', 1),
	('usuario7@email.com', 'funcionário cpalm', 'Mateus Almeida', 'senha7', 0),
	('usuario8@email.com', 'funcionário cpalm', 'Julia Ferreira', 'senha8', 1),
	('usuario9@email.com', 'auditor', 'Felipe Lima', 'senha9', 0),
	('usuario10@email.com', 'funcionário cpalm', 'Isabela Gomes', 'senha10', 1),
	('usuario11@email.com', 'funcionário cpalm', 'Rafael Sousa', 'senha11', 1),
	('usuario12@email.com', 'auditor', 'Carolina Oliveira', 'senha12', 1),
	('usuario13@email.com', 'funcionário cpalm', 'Gustavo Martins', 'senha13', 1),
	('usuario14@email.com', 'funcionário cpalm', 'Aline Ferreira', 'senha14', 1),
	('usuario15@email.com', 'auditor', 'Gabriel Lima', 'senha15', 1),
	('usuario16@email.com', 'funcionário cpalm', 'Larissa Gomes', 'senha16', 1),
	('usuario17@email.com', 'funcionário cpalm', 'Vanessa Silva', 'senha17', 0),
	('usuario18@email.com', 'auditor', 'Rodrigo Oliveira', 'senha18', 1),
	('usuario19@email.com', 'funcionário cpalm', 'Fernanda Almeida', 'senha19', 1),
	('usuario20@email.com', 'funcionário cpalm', 'Luciana Santos', 'senha20', 1);

-- Inserindo dados na tabela inventarios
INSERT INTO db_Levantamento_Patrimonial.inventarios (inve_nome, inve_data, inve_concluido, inve_campus)
VALUES 
    ('Inventário de Computadores', '2024-02-15', 0, 'Campus Vilhena'),
    ('Inventário de Mobiliário', '2024-02-20', 0, 'Campus Colorado');

-- Inserindo dados na tabela auditor_inventario
INSERT INTO db_Levantamento_Patrimonial.auditor_inventario (au_in_inve_id, au_in_usua_id)
VALUES 
    (1, 1),
    (1, 2),
    (2, 3),
	(1, 4),
	(1, 5),
	(2, 6),
	(2, 7),
	(1, 8),
	(2, 9),
	(1, 10),
	(2, 11),
	(1, 12),
	(2, 13),
	(1, 14),
	(2, 15),
	(1, 16),
	(2, 17),
	(1, 18),
	(2, 19),
	(1, 20),
	(2, 21),
	(1, 22),
	(2, 23);

-- Inserindo dados na tabela sala
INSERT INTO db_Levantamento_Patrimonial.sala (sala_nome)
VALUES 
    ('Laboratorio de infomartica do piso 3 sala 5'),
    ('Cantina de alimentação piso 1'),
    ('laboratorio de quimica do piso 2 sala 12'),
	('Sala de pesquisa a vançada em IA'),
    ('Sala de Reunião de grupos de Fabrica');
    

insert into db_Levantamento_Patrimonial.sala_invent (sa_in_sala_id, sa_in_inve_id)
values
	(1, 2),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 1);

-- Inserindo dados na tabela itens
INSERT INTO db_Levantamento_Patrimonial.itens (iten_nome, iten_tombo, iten_responsavel, iten_decricao, iten_sala_id, iten_valor)
VALUES 
    ('Notebook Lenovo', 'TOMBO007', 'Ana Silva', 'Notebook leve e portátil, processador Intel i5', 1, 1249.99),
    ('Cadeira de Jantar', 'TOMBO008', 'José Oliveira', 'Cadeira de jantar estofada, conjunto com 6 unidades', 2, 1750.00),
    ('Projetor Epson', 'TOMBO009', 'Mariana Santos', 'Projetor de alta resolução, ideal para apresentações', 3, 2200.00),
    ('Impressora HP', 'TOMBO010', 'Ricardo Lima', 'Impressora multifuncional, imprime, copia e digitaliza', 1, 1500.00),
    ('Cama de Solteiro', 'TOMBO011', 'Ana Oliveira', 'Cama de solteiro com estrutura de madeira e colchão ortopédico', 2, 800.00),
    ('Mesa de Centro', 'TOMBO012', 'José Santos', 'Mesa de centro para sala de estar, estilo moderno', 3, 1600.00),
    ('Forno Micro-ondas', 'TOMBO013', 'Mariana Lima', 'Forno micro-ondas com capacidade de 30 litros', 1, 1300.00),
    ('Sofá de Couro', 'TOMBO014', 'Ricardo Oliveira', 'Sofá de couro reclinável, 3 lugares', 2, 2400.00),
    ('Mesa de Escritório', 'TOMBO015', 'Ana Santos', 'Mesa de escritório com tampo de vidro e gavetas', 3, 1800.00),
    ('Ventilador de Teto', 'TOMBO016', 'José Lima', 'Ventilador de teto com 3 pás e controle remoto', 1, 950.00),
    ('Tapete Decorativo', 'TOMBO017', 'Mariana Oliveira', 'Tapete decorativo para sala de estar, 2m x 3m', 2, 700.00),
    ('Mesa de Jantar', 'TOMBO018', 'Ricardo Santos', 'Mesa de jantar de madeira maciça, 8 lugares', 3, 2100.00),
    ('Aparelho de Som', 'TOMBO019', 'Ana Lima', 'Aparelho de som com CD, rádio e entrada USB', 1, 1050.00),
    ('Poltrona de Leitura', 'TOMBO020', 'José Oliveira', 'Poltrona confortável para leitura, com apoio para os pés', 2, 1350.00),
    ('Mesa Lateral', 'TOMBO021', 'Mariana Silva', 'Mesa lateral para sala de estar, com prateleira', 3, 1250.00),
    ('Mesa de Reunião', 'TOMBO022', 'Ana Silva', 'Mesa de reunião retangular, 10 lugares', 4, 1950.00),
    ('Cadeira de Escritório', 'TOMBO023', 'José Oliveira', 'Cadeira de escritório ergonômica, com suporte lombar', 5, 1700.00),
    ('Geladeira Electrolux', 'TOMBO024', 'Mariana Lima', 'Geladeira Frost Free, 450 litros', 3, 2650.00),
    ('Televisor Samsung 55"', 'TOMBO025', 'Ricardo Santos', 'Televisor Smart TV 4K, com tecnologia HDR', 4, 2900.00),
    ('Mesa de Centro', 'TOMBO026', 'Ana Oliveira', 'Mesa de centro de madeira, estilo rústico', 5, 1500.00),
    ('Cama de Casal', 'TOMBO027', 'José Silva', 'Cama de casal com estrutura de metal e colchão ortopédico', 2, 1850.00),
    ('Fogão Consul', 'TOMBO028', 'Mariana Santos', 'Fogão 5 bocas, com acendimento automático', 4, 1750.00),
    ('Sofá de Canto', 'TOMBO029', 'Ricardo Oliveira', 'Sofá de canto em L, com chaise retrátil', 5, 2250.00),
    ('Máquina de Lavar Brastemp', 'TOMBO030', 'Ana Lima', 'Máquina de lavar 12kg, com ciclo rápido', 5, 2300.00),
    ('Mesa de Jantar', 'TOMBO031', 'José Oliveira', 'Mesa de jantar redonda, 6 lugares', 4, 2000.00),
    ('Cadeira de Balanço', 'TOMBO032', 'Mariana Silva', 'Cadeira de balanço de madeira, confortável e resistente', 5, 1450.00),
    ('Ar Condicionado LG 12000 BTUs', 'TOMBO033', 'Ricardo Santos', 'Ar condicionado split, com controle remoto', 3, 3150.00),
    ('Mesa de Escritório', 'TOMBO034', 'Ana Oliveira', 'Mesa de escritório com tampo de vidro temperado', 4,2500.00),
    ('Cadeira Giratória', 'TOMBO035', 'José Silva', 'Cadeira giratória com rodinhas, estofada', 5, 1100.00),
    ('Liquidificador Philips Walita', 'TOMBO036', 'Mariana Santos', 'Liquidificador com potência de 800W, 10 velocidades', 1, 850.00),
    ('Mesa de Cabeceira', 'TOMBO037', 'Ricardo Oliveira', 'Mesa de cabeceira com gaveta e prateleira', 4, 950.00),
    ('Armário de Cozinha', 'TOMBO038', 'Ana Lima', 'Armário de cozinha compacto, com portas e prateleiras', 5, 2800.00),
    ('Ferro de Passar', 'TOMBO039', 'José Oliveira', 'Ferro de passar a vapor, 2000W', 2, 700.00),
    ('Cadeira de Praia', 'TOMBO040', 'Mariana Silva', 'Cadeira de praia dobrável, com encosto reclinável', 4, 1200.00),
    ('Ventilador de Mesa', 'TOMBO041', 'Ana Silva', 'Ventilador de mesa, 3 velocidades', 1, 500.00),
    ('Armário de Escritório', 'TOMBO042', 'José Oliveira', 'Armário de escritório com portas de correr', 2, 2200.00),
    ('Poltrona Decorativa', 'TOMBO043', 'Mariana Lima', 'Poltrona decorativa com estampa floral', 3, 1900.00),
    ('Mesa de Centro', 'TOMBO044', 'Ricardo Santos', 'Mesa de centro de madeira maciça, com tampo de vidro', 4, 1700.00),
    ('Forno Elétrico', 'TOMBO045', 'Ana Oliveira', 'Forno elétrico com capacidade de 30 litros', 5, 1550.00),
    ('Aspirador de Pó', 'TOMBO046', 'José Silva', 'Aspirador de pó vertical, sem fio', 1, 1450.00),
    ('Mesa de Escritório', 'TOMBO047', 'Mariana Santos', 'Mesa de escritório com gavetas e prateleiras', 2, 2000.00),
    ('Tapete Felpudo', 'TOMBO048', 'Ricardo Oliveira', 'Tapete felpudo para sala de estar, 2m x 2m', 3, 800.00),
    ('Micro-ondas Electrolux', 'TOMBO049', 'Ana Lima', 'Forno micro-ondas com grill, 20 litros', 4, 1100.00),
    ('Sofá de 2 Lugares', 'TOMBO050', 'José Oliveira', 'Sofá de 2 lugares, retrátil e reclinável', 5, 2250.00),
    ('Cadeira Giratória', 'TOMBO051', 'Mariana Silva', 'Cadeira giratória com ajuste de altura', 1, 1350.00),
    ('Aparador de Madeira', 'TOMBO052', 'Ricardo Santos', 'Aparador de madeira com duas gavetas', 2, 1450.00),
    ('Mesa de Jantar', 'TOMBO053', 'Ana Oliveira', 'Mesa de jantar oval, 4 lugares', 3, 1800.00),
    ('Liquidificador Oster', 'TOMBO054', 'José Silva', 'Liquidificador com jarra de vidro, 12 velocidades', 4, 950.00),
    ('Cama Box', 'TOMBO055', 'Mariana Santos', 'Cama box de casal com colchão de molas', 5, 2100.00),
    ('Mesa de Cabeceira', 'TOMBO056', 'Ricardo Oliveira', 'Mesa de cabeceira com gaveta e nicho', 1, 850.00),
    ('Mesa de Estudo', 'TOMBO057', 'Ana Lima', 'Mesa de estudo compacta, com prateleiras', 2, 1600.00),
    ('Cadeira de Praia', 'TOMBO058', 'José Oliveira', 'Cadeira de praia dobrável, com apoio para os braços', 3, 1200.00),
    ('Ferro de Passar a Vapor', 'TOMBO059', 'Mariana Silva', 'Ferro de passar a vapor com base de cerâmica', 4, 700.00),
    ('Mesa de Apoio', 'TOMBO060', 'Ricardo Santos', 'Mesa de apoio redonda, com base de metal', 5, 800.00);


    
INSERT INTO db_Levantamento_Patrimonial.historico (hist_au_in_id, hist_encontrado, hist_estado_item, hist_imagem, hist_item_ocioso, hist_iten_id, hist_sala_id)
VALUES 
	(1, 1, 'em bom estado', 'https://exemplo.com/imagem1.jpg', 0, 1, 1),
	(2, 1, 'em bom estado', NULL, 0, 2, 2),
	(3, 1, 'danificado', 'https://exemplo.com/imagem3.jpg', 0, 3, 3),
	(4, 1, 'em bom estado', NULL, 0, 4, 1),
	(5, 1, 'em bom estado', 'https://exemplo.com/imagem5.jpg', 0, 5, 2),
	(6, 0, ' ', NULL, 0, 6, 3),
	(7, 1, 'em bom estado', 'https://exemplo.com/imagem7.jpg', 1, 7, 3),
	(8, 1, 'danificado', NULL, 0, 8, 2),
	(9, 1, 'em bom estado', 'https://exemplo.com/imagem9.jpg', 0, 9, 3),
	(10, 1, 'em bom estado', NULL, 0, 10, 1),
	(11, 0, '', null, 0, 11, 2),
	(12, 1, 'danificado', NULL, 0, 12, 3),
	(13, 1, 'em bom estado', 'https://exemplo.com/imagem13.jpg', 1, 13, 4),
	(14, 1, 'inservivel', NULL, 0, 14, 5),
	(15, 1, 'em bom estado', 'https://exemplo.com/imagem15.jpg', 0, 15, 4),
	(16, 1, 'em bom estado', NULL, 0, 16, 1),
	(17, 1, 'danificado', 'https://exemplo.com/imagem17.jpg', 1, 17, 2),
	(18, 0, ' ', NULL, 0, 18, 3),
	(19, 1, 'em bom estado', 'https://exemplo.com/imagem19.jpg', 0, 19, 4),
	(20, 1, 'inservivel', NULL, 0, 20, 5),
	(21, 1, 'em bom estado', 'https://exemplo.com/imagem21.jpg', 0, 21, 1),
	(22, 1, 'em bom estado', NULL, 0, 22, 2),
	(23, 1, 'danificado', 'https://exemplo.com/imagem23.jpg', 0, 23, 2),
	(1, 1, 'em bom estado', NULL, 0, 24, 1),
	(2, 1, 'em bom estado', 'https://exemplo.com/imagem2.jpg', 0, 25, 2),
	(3, 1, 'danificado', NULL, 0, 26, 3),
	(4, 1, 'em bom estado', 'https://exemplo.com/imagem4.jpg', 0, 27, 1),
	(5, 1, 'em bom estado', NULL, 0, 28, 2),
	(6, 1, 'inservivel', 'https://exemplo.com/imagem6.jpg', 0, 29, 3),
	(7, 1, 'em bom estado', NULL, 0, 30, 1),
	(8, 1, 'danificado', 'https://exemplo.com/imagem8.jpg', 0, 31, 2),
	(9, 0, ' ', NULL, 0, 32, 3),
	(10, 1, 'em bom estado', 'https://exemplo.com/imagem10.jpg', 0, 33, 4),
	(11, 1, 'em bom estado', NULL, 0, 34, 5),
	(12, 1, 'danificado', 'https://exemplo.com/imagem12.jpg', 0, 35, 4),
	(13, 1, 'em bom estado', NULL, 0, 36, 1),
	(14, 1, 'inservivel', 'https://exemplo.com/imagem14.jpg', 0, 37, 2),
	(15, 1, 'em bom estado', NULL, 0, 38, 3),
	(16, 1, 'em bom estado', 'https://exemplo.com/imagem16.jpg', 0, 39, 4),
	(17, 1, 'danificado', NULL, 0, 40, 5),
	(18, 1, 'em bom estado', 'https://exemplo.com/imagem18.jpg', 0, 41, 1),
	(19, 1, 'em bom estado', NULL, 0, 42, 2),
	(20, 1, 'inservivel', 'https://exemplo.com/imagem20.jpg', 0, 43, 3),
	(21, 1, 'em bom estado', NULL, 0, 44, 1),
	(22, 1, 'danificado', 'https://exemplo.com/imagem22.jpg', 0, 45, 2),
	(23, 1, 'em bom estado', NULL, 0, 46, 3),
	(1, 1, 'em bom estado', 'https://exemplo.com/imagem1.jpg', 0, 47, 4),
	(2, 1, 'em bom estado', NULL, 0, 48, 5),
	(3, 1, 'danificado', 'https://exemplo.com/imagem3.jpg', 0, 49, 3),
	(4, 1, 'em bom estado', NULL, 0, 50, 1),
	(5, 1, 'em bom estado', 'https://exemplo.com/imagem5.jpg', 0, 51, 2),
	(6, 1, 'inservivel', NULL, 0, 52, 3),
	(7, 1, 'em bom estado', 'https://exemplo.com/imagem7.jpg', 1, 53, 1);

INSERT INTO db_Levantamento_Patrimonial.item_adicionado (item_add_au_in_id, item_add_descricao, item_add_estado, item_add_imagem, item_add_nome, item_add_sala_id, item_add_ocioso)
VALUES 
    (1, 'Bem conservado, sem sinais de desgaste.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado1.jpg', 'Monitor LG', 1, 0),
    (2, 'Apresenta alguns arranhões na parte inferior.', 'danificado', 'https://exemplo.com/imagem_item_adicionado2.jpg', 'Cadeira Giratória', 2, 1),
    (3, 'Novo na embalagem original.', 'em bom estado', NULL, 'Teclado Sem Fio', 3, 0),
    (4, 'Possui pequeno amassado na lateral direita.', 'danificado', 'https://exemplo.com/imagem_item_adicionado4.jpg', 'Cadeira de Escritório', 4, 0),
    (5, 'Funcionando perfeitamente.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado5.jpg', 'Caixa de Som Bluetooth', 5, 0),
    (6, 'Danificado na parte traseira, mas funcional.', 'danificado', NULL, 'Ventilador de Mesa', 1, 0),
    (7, 'Pouco utilizado, em ótimo estado.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado7.jpg', 'Mesa de Canto', 2, 1),
    (8, 'Faltando peças e não funciona.', 'inservivel', 'https://exemplo.com/imagem_item_adicionado8.jpg', 'Fritadeira Elétrica', 3, 0),
    (9, 'Leves riscos na tela, mas funcionando bem.', 'em bom estado', NULL, 'Televisor Sony', 4, 0),
    (10, 'Possui defeito no botão de liga/desliga.', 'danificado', 'https://exemplo.com/imagem_item_adicionado10.jpg', 'Impressora Epson', 5, 0),
    (11, 'Em perfeito estado, como novo.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado11.jpg', 'Liquidificador Oster', 1, 0),
    (12, 'Rachadura no canto inferior esquerdo.', 'danificado', NULL, 'Mesa de Jantar', 2, 0),
    (13, 'Ainda na caixa, nunca utilizado.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado13.jpg', 'Micro-ondas Panasonic', 3, 0),
    (14, 'Botão de volume quebrado, mas funciona.', 'danificado', 'https://exemplo.com/imagem_item_adicionado14.jpg', 'Fone de Ouvido Bluetooth', 4, 1),
    (15, 'Com algumas manchas na parte superior.', 'em bom estado', NULL, 'Cadeira de Praia', 5, 0),
    (16, 'Sem nenhum sinal de desgaste.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado16.jpg', 'Aspirador de Pó', 1, 0),
    (17, 'Pequeno risco na tela, mas em bom funcionamento.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado17.jpg', 'Notebook Dell', 2, 0),
    (18, 'Falta a tampa traseira, mas funciona.', 'danificado', NULL, 'Roteador Wi-Fi', 3, 0),
    (19, 'Amassado no canto inferior esquerdo.', 'danificado', 'https://exemplo.com/imagem_item_adicionado19.jpg', 'Cama Box', 4, 0),
    (20, 'Levemente riscado, mas em bom estado de funcionamento.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado20.jpg', 'Ferro de Passar a Vapor', 5, 0),
    (21, 'Apresenta sinais de uso, mas funciona bem.', 'em bom estado', NULL, 'Telefone Sem Fio', 1, 0),
    (22, 'Com defeito na tela, não liga.', 'inservivel', 'https://exemplo.com/imagem_item_adicionado22.jpg', 'Tablet Samsung', 2, 0),
    (23, 'Bem conservado, poucos sinais de uso.', 'em bom estado', 'https://exemplo.com/imagem_item_adicionado23.jpg', 'Cadeira Estofada', 3, 0);
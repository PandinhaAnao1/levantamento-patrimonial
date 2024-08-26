-- Inserindo dados na tabela `usuario`
INSERT INTO db_Levantamento_Patrimonial.usuario (email, funcao, nome, senha, status)
VALUES 
    ('usuario1@example.com', 'auditor', 'João Silva', 'senha123', 1),
    ('usuario2@example.com', 'auditor', 'Maria Santos', 'senha456', 1),
    ('usuario3@example.com', 'funcionario cpalm', 'Carlos Oliveira', 'senha789', 1);

-- Inserindo dados na tabela `campus`
INSERT INTO db_Levantamento_Patrimonial.campus (nome)
VALUES 
    ('Campus Vilhena'),
    ('Campus Colorado');

-- Inserindo dados na tabela `inventario`
INSERT INTO db_Levantamento_Patrimonial.inventario (nome, data, concluido, campus_id)
VALUES 
    ('Inventário de Computadores', '2024-02-15', 0, (SELECT id FROM db_Levantamento_Patrimonial.campus WHERE nome = 'Campus Vilhena')),
    ('Inventário de Mobiliário', '2024-02-20', 0, (SELECT id FROM db_Levantamento_Patrimonial.campus WHERE nome = 'Campus Colorado'));

-- Inserindo dados na tabela `sala`
INSERT INTO db_Levantamento_Patrimonial.sala (nome)
VALUES 
    ('Laboratório de informática do piso 3 sala 5'),
    ('Cantina de alimentação piso 1'),
    ('Laboratório de química do piso 2 sala 12'),
    ('Sala de pesquisa avançada em IA'),
    ('Sala de Reunião de grupos de Fábrica');

-- Inserindo dados na tabela `bem`
INSERT INTO db_Levantamento_Patrimonial.bem (
    sala_id, 
    inventario_id, 
    nome, 
    tombo, 
    responsavel, 
    descricao, 
    valor
) VALUES 
    (1, 1, 'Notebook Lenovo', 'TOMBO007', 'Ana Silva', 'Notebook leve e portátil, processador Intel i5', 1249.99),
    (2, 1, 'Cadeira de Jantar', 'TOMBO008', 'José Oliveira', 'Cadeira de jantar estofada, conjunto com 6 unidades', 1750.00),
    (3, 1, 'Projetor Epson', 'TOMBO009', 'Mariana Santos', 'Projetor de alta resolução, ideal para apresentações', 2200.00),
    (1, 1, 'Impressora HP', 'TOMBO010', 'Ricardo Lima', 'Impressora multifuncional, imprime, copia e digitaliza', 1500.00),
    (2, 1, 'Cama de Solteiro', 'TOMBO011', 'Ana Oliveira', 'Cama de solteiro com estrutura de madeira e colchão ortopédico', 800.00),
    (3, 1, 'Mesa de Centro', 'TOMBO012', 'José Santos', 'Mesa de centro para sala de estar, estilo moderno', 1600.00),
    (1, 2, 'Forno Micro-ondas', 'TOMBO013', 'Mariana Lima', 'Forno micro-ondas com capacidade de 30 litros', 1300.00),
    (2, 2, 'Sofá de Couro', 'TOMBO014', 'Ricardo Oliveira', 'Sofá de couro reclinável, 3 lugares', 2400.00),
    (3, 2, 'Mesa de Escritório', 'TOMBO015', 'Ana Santos', 'Mesa de escritório com tampo de vidro e gavetas', 1800.00),
    (1, 2, 'Ventilador de Teto', 'TOMBO016', 'José Lima', 'Ventilador de teto com 3 pás e controle remoto', 950.00),
    (2, 2, 'Tapete Decorativo', 'TOMBO017', 'Mariana Oliveira', 'Tapete decorativo para sala de estar, 2m x 3m', 700.00),
    (3, 2, 'Mesa de Jantar', 'TOMBO018', 'Ricardo Santos', 'Mesa de jantar de madeira maciça, 8 lugares', 2100.00),
    (1, 2, 'Aparelho de Som', 'TOMBO019', 'Ana Lima', 'Aparelho de som com CD, rádio e entrada USB', 1050.00),
    (2, 2, 'Poltrona de Leitura', 'TOMBO020', 'José Oliveira', 'Poltrona confortável para leitura, com apoio para os pés', 1350.00),
    (3, 2, 'Mesa Lateral', 'TOMBO021', 'Mariana Silva', 'Mesa lateral para sala de estar, com prateleira', 1250.00);

-- Inserindo dados na tabela `levantamento`
INSERT INTO db_Levantamento_Patrimonial.levantamento (
    inventario_id, 
    bem_id, 
    sala_id, 
    usuario_id, 
    imagem, 
    encontrado, 
    ocioso, 
    estado, 
    data
) VALUES 
    (1, 1, 1, 1, 'https://exemplo.com/imagem1.jpg', 1, 0, 'em bom estado', NOW()),
    (1, 2, 2, 2, NULL, 1, 0, 'em bom estado', NOW()),
    (2, 3, 3, 3, 'https://exemplo.com/imagem3.jpg', 1, 0, 'danificado', NOW()),
    (1, 4, 1, 1, NULL, 1, 0, 'em bom estado', NOW()),
    (1, 5, 2, 2, NULL, 1, 0, 'em bom estado', NOW()),
    (2, 6, 3, 3, NULL, 1, 0, 'danificado', NOW()),
    (2, 7, 3, 1, NULL, 1, 0, 'em bom estado', NOW()),
    (1, 8, 2, 2, NULL, 0, 0, '', NOW()),
    (2, 9, 3, 3, NULL, 1, 0, 'danificado', NOW()),
    (1, 10, 1, 1, 'https://exemplo.com/imagem13.jpg', 1, 1, 'em bom estado', NOW()),
    (1, 11, 2, 2, NULL, 1, 0, 'inservível', NOW()),
    (2, 12, 3, 3, 'https://exemplo.com/imagem15.jpg', 1, 0, 'em bom estado', NOW());

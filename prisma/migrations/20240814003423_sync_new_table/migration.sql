-- CreateTable
CREATE TABLE `bens` (
    `bens_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bens_sala_id` INTEGER NOT NULL,
    `bens_nome` VARCHAR(200) NOT NULL,
    `bens_tombo` VARCHAR(15) NULL,
    `bens_responsavel` VARCHAR(80) NULL,
    `bens_decricao` MEDIUMTEXT NOT NULL,
    `bens_estado` VARCHAR(30) NULL,
    `bens_ocioso` BOOLEAN NULL,
    `bens_imagem` VARCHAR(200) NULL,
    `bens_encontrado` BOOLEAN NULL,
    `bens_valor` DECIMAL(10, 2) NULL,

    UNIQUE INDEX `bens_id_UNIQUE`(`bens_id`),
    INDEX `fk_itens_sala1_idx`(`bens_sala_id`),
    PRIMARY KEY (`bens_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historico` (
    `hist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hist_bens_id` INTEGER NOT NULL,
    `hist_inventarios_id` INTEGER NOT NULL,
    `hist_usuarios_id` INTEGER NOT NULL,
    `hist_salas_id` INTEGER NOT NULL,

    UNIQUE INDEX `hist_id_UNIQUE`(`hist_id`),
    INDEX `fk_historico_Usuario1_idx`(`hist_usuarios_id`),
    INDEX `fk_historico_inventarios1_idx`(`hist_inventarios_id`),
    INDEX `fk_historico_itens1_idx`(`hist_bens_id`),
    INDEX `fk_historico_sala1_idx`(`hist_salas_id`),
    PRIMARY KEY (`hist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventarios` (
    `inve_id` INTEGER NOT NULL AUTO_INCREMENT,
    `inve_nome` VARCHAR(80) NOT NULL,
    `inve_data` DATE NOT NULL,
    `inve_concluido` BOOLEAN NOT NULL,
    `inve_campus` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`inve_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salas` (
    `sala_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sala_inve_id` INTEGER NOT NULL,
    `sala_nome` VARCHAR(120) NOT NULL,

    UNIQUE INDEX `Sala_id_UNIQUE`(`sala_id`),
    INDEX `fk_sala_inventarios1_idx`(`sala_inve_id`),
    PRIMARY KEY (`sala_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `usua_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usua_nome` VARCHAR(80) NOT NULL,
    `usua_email` VARCHAR(80) NOT NULL,
    `usua_senha` VARCHAR(30) NOT NULL,
    `usua_funcao` VARCHAR(20) NOT NULL,
    `usua_status` BOOLEAN NOT NULL,

    UNIQUE INDEX `audi_id_UNIQUE`(`usua_id`),
    UNIQUE INDEX `audi_email_UNIQUE`(`usua_email`),
    PRIMARY KEY (`usua_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bens` ADD CONSTRAINT `fk_itens_sala1` FOREIGN KEY (`bens_sala_id`) REFERENCES `salas`(`sala_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico` ADD CONSTRAINT `fk_historico_Usuario1` FOREIGN KEY (`hist_usuarios_id`) REFERENCES `usuarios`(`usua_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico` ADD CONSTRAINT `fk_historico_inventarios1` FOREIGN KEY (`hist_inventarios_id`) REFERENCES `inventarios`(`inve_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico` ADD CONSTRAINT `fk_historico_itens1` FOREIGN KEY (`hist_bens_id`) REFERENCES `bens`(`bens_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historico` ADD CONSTRAINT `fk_historico_sala1` FOREIGN KEY (`hist_salas_id`) REFERENCES `salas`(`sala_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salas` ADD CONSTRAINT `fk_sala_inventarios1` FOREIGN KEY (`sala_inve_id`) REFERENCES `inventarios`(`inve_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

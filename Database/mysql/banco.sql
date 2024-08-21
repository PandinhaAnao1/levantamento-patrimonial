SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_Levantamento_Patrimonial
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_Levantamento_Patrimonial
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_Levantamento_Patrimonial` DEFAULT CHARACTER SET utf8mb4 ;
USE `db_Levantamento_Patrimonial` ;

-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  `funcao` VARCHAR(20) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `audi_id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `audi_email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`campus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`campus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NULL,
  `telefone` VARCHAR(13) NULL,
  `cidade` VARCHAR(60) NULL,
  `bairro` VARCHAR(60) NULL,
  `rua` VARCHAR(60) NULL,
  `numoro_residencia` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`inventario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `data` DATE NOT NULL,
  `concluido` TINYINT(1) NOT NULL,
  `campus_id` INT NOT NULL,
  PRIMARY KEY (`id`, `campus_id`),
  UNIQUE INDEX `unique_id` (`id`),
  INDEX `fk_inventarios_campus1_idx` (`campus_id` ASC),
  CONSTRAINT `fk_inventarios_campus1`
    FOREIGN KEY (`campus_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`campus` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`sala` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Sala_id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`bem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`bem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sala_id` INT NOT NULL,
  `inventario_id` INT NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `tombo` VARCHAR(15) NULL DEFAULT NULL,
  `responsavel` VARCHAR(80) NULL DEFAULT NULL,
  `decricao` MEDIUMTEXT NOT NULL,
  `valor` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `sala_id`, `inventario_id`),
  UNIQUE INDEX `bens_id_UNIQUE` (`id` ASC) ,
  INDEX `fk_bens_inventarios1_idx` (`inventario_id` ASC) ,
  INDEX `fk_bens_salas1_idx` (`sala_id` ASC) ,
  CONSTRAINT `fk_bens_inventarios1`
    FOREIGN KEY (`inventario_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`inventario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bens_salas1`
    FOREIGN KEY (`sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`sala` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`levantamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`levantamento` (
  `levantamento_id` INT NOT NULL AUTO_INCREMENT,
  `inventario_id` INT NOT NULL,
  `bem_id` INT NOT NULL,
  `sala_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `imagem` VARCHAR(200) NULL,
  `encontrado` TINYINT(1) NOT NULL,
  `ocioso` TINYINT(1) NOT NULL,
  `estado` VARCHAR(30) NOT NULL,
  `data` DATETIME NOT NULL,
  PRIMARY KEY (`levantamento_id`, `inventario_id`, `bem_id`, `sala_id`, `usuario_id`),
  UNIQUE INDEX `hist_id_UNIQUE` (`levantamento_id` ASC) ,
  INDEX `fk_levantamento_usuarios1_idx` (`usuario_id` ASC) ,
  INDEX `fk_levantamento_salas1_idx` (`sala_id` ASC) ,
  INDEX `fk_levantamento_bens1_idx` (`bem_id` ASC) ,
  INDEX `fk_levantamento_inventarios1_idx` (`inventario_id` ASC) ,
  CONSTRAINT `fk_levantamento_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_levantamento_salas1`
    FOREIGN KEY (`sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`sala` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_levantamento_bens1`
    FOREIGN KEY (`bem_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`bem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_levantamento_inventarios1`
    FOREIGN KEY (`inventario_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`inventario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
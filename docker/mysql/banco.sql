-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_Levantamento_Patrimonial
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_Levantamento_Patrimonial
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_Levantamento_Patrimonial` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_Levantamento_Patrimonial` ;

-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`Usuario` (
  `usua_id` INT NOT NULL AUTO_INCREMENT,
  `usua_email` VARCHAR(80) NOT NULL,
  `usua_senha` VARCHAR(40) NOT NULL,
  `usua_funcao` VARCHAR(30) NOT NULL,
  `usua_status` TINYINT NOT NULL,
  `usua_nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`usua_id`),
  UNIQUE INDEX `audi_id_UNIQUE` (`usua_id` ASC),
  UNIQUE INDEX `audi_email_UNIQUE` (`usua_email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`inventarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`inventarios` (
  `inve_id` INT NOT NULL AUTO_INCREMENT,
  `inve_nome` VARCHAR(80) NOT NULL,
  `inve_data` DATE NOT NULL,
  `inve_concluido` TINYINT NOT NULL,
  `inve_campus` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`inve_id`),
  UNIQUE INDEX `inve_id_UNIQUE` (`inve_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`auditor_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`auditor_inventario` (
  `au_in_id` INT NOT NULL AUTO_INCREMENT,
  `au_in_inve_id` INT NOT NULL,
  `au_in_usua_id` INT NOT NULL,
  PRIMARY KEY (`au_in_id`),
  INDEX `fk_audi_id_ivent` (`au_in_usua_id` ASC),
  INDEX `fk_audi_iventa_inventarios` (`au_in_inve_id` ASC),
  CONSTRAINT `fk_audi_id_ivent`
    FOREIGN KEY (`au_in_usua_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`Usuario` (`usua_id`),
  CONSTRAINT `fk_audi_iventa_inventarios`
    FOREIGN KEY (`au_in_inve_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`inventarios` (`inve_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`sala` (
  `sala_id` INT NOT NULL AUTO_INCREMENT,
  `sala_nome` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`Sala_id`),
  UNIQUE INDEX `Sala_id_UNIQUE` (`Sala_id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`itens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`itens` (
  `iten_nome` VARCHAR(200) NOT NULL,
  `iten_id` INT NOT NULL AUTO_INCREMENT,
  `iten_tombo` VARCHAR(15) NOT NULL,
  `iten_responsavel` VARCHAR(80) NOT NULL,
  `iten_decricao` MEDIUMTEXT NULL DEFAULT NULL,
  `iten_sala_id` INT NOT NULL,
  `iten_valor` decimal(10,2),
  PRIMARY KEY (`iten_id`),
  INDEX `fk_itens_sala_id` (`iten_sala_id` ASC),
  CONSTRAINT `fk_itens_sala_id`
    FOREIGN KEY (`iten_sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`sala` (`Sala_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`historico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`historico` (
  `hist_id` INT NOT NULL AUTO_INCREMENT,
  `hist_iten_id` INT NOT NULL,
  `hist_au_in_id` INT NOT NULL,
  `hist_estado_item` VARCHAR(60) NOT NULL,
  `hist_item_ocioso` TINYINT NOT NULL,
  `hist_imagem` VARCHAR(200) NULL DEFAULT NULL,
  `hist_encontrado` TINYINT NOT NULL,
  `hist_sala_id` INT NOT NULL,
  PRIMARY KEY (`hist_id`),
  INDEX `fk_historico_audi_ivent_id` (`hist_au_in_id` ASC),
  INDEX `fk_historico_item_id` (`hist_iten_id` ASC),
  INDEX `fk_historico_sala_id` (`hist_sala_id` ASC),
  UNIQUE INDEX `hist_id_UNIQUE` (`hist_id` ASC),
  CONSTRAINT `fk_historico_audi_ivent_id`
    FOREIGN KEY (`hist_au_in_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`auditor_inventario` (`au_in_id`),
  CONSTRAINT `fk_historico_item_id`
    FOREIGN KEY (`hist_iten_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`itens` (`iten_id`),
  CONSTRAINT `fk_historico_sala_id`
    FOREIGN KEY (`hist_sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`sala` (`Sala_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`item_adicionado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`item_adicionado` (
  `item_add_id` INT NOT NULL AUTO_INCREMENT,
  `item_add_nome` VARCHAR(200) NOT NULL,
  `item_add_estado` VARCHAR(60) NOT NULL,
  `item_add_descricao` MEDIUMTEXT NULL DEFAULT NULL,
  `item_add_au_in_id` INT NOT NULL,
  `item_add_sala_id` INT NOT NULL,
  `item_add_imagem` VARCHAR(200) NULL DEFAULT NULL,
  `item_add_ocioso` TINYINT NOT NULL,
  PRIMARY KEY (`item_add_id`),
  INDEX `fk_item_adicionado_audi_iventa` (`item_add_au_in_id` ASC),
  INDEX `fk_item_adicionado_sala` (`item_add_sala_id` ASC),
  UNIQUE INDEX `item_add_id_UNIQUE` (`item_add_id` ASC),
  CONSTRAINT `fk_item_adicionado_audi_iventa`
    FOREIGN KEY (`item_add_au_in_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`auditor_inventario` (`au_in_id`),
  CONSTRAINT `fk_item_adicionado_sala`
    FOREIGN KEY (`item_add_sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`sala` (`Sala_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`sala_invent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`sala_invent` (
  `sa_in_id` INT NOT NULL AUTO_INCREMENT,
  `sa_in_sala_id` INT NOT NULL,
  `sa_in_inve_id` INT NOT NULL,
  PRIMARY KEY (`sa_in_id`),
  INDEX `fk_campus_sala` (`sa_in_sala_id` ASC),
  INDEX `fk_inventarios_campus_id` (`sa_in_inve_id` ASC),
  UNIQUE INDEX `sala_ivent_id_UNIQUE` (`sa_in_id` ASC),
  CONSTRAINT `fk_campus_sala`
    FOREIGN KEY (`sa_in_sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`sala` (`Sala_id`),
  CONSTRAINT `fk_inventarios_campus_id`
    FOREIGN KEY (`sa_in_inve_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`inventarios` (`inve_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

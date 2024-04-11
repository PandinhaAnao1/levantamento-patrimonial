-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema levantamento_patrimonial
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema levantamento_patrimonial
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `levantamento_patrimonial` DEFAULT CHARACTER SET utf8mb4 ;
USE `levantamento_patrimonial` ;

-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`Usuario` (
  `usua_id` INT(11) NOT NULL AUTO_INCREMENT,
  `usua_email` VARCHAR(80) NOT NULL,
  `usua_senha` VARCHAR(40) NOT NULL,
  `usua_funcao` VARCHAR(30) NOT NULL,
  `usua_status` TINYINT(4) NOT NULL,
  `usua_nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`usua_id`),
  UNIQUE INDEX `audi_id_UNIQUE` (`usua_id` ASC) VISIBLE,
  UNIQUE INDEX `audi_email_UNIQUE` (`usua_email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`inventarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`inventarios` (
  `inve_id` INT(11) NOT NULL AUTO_INCREMENT,
  `inve_nome` VARCHAR(80) NOT NULL,
  `inve_data` DATE NOT NULL,
  `inve_concluido` TINYINT(4) NOT NULL,
  `inve_campus` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`inve_id`),
  UNIQUE INDEX `inve_id_UNIQUE` (`inve_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`auditor_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`auditor_inventario` (
  `au_in_id` INT(11) NOT NULL AUTO_INCREMENT,
  `au_in_inve_id` INT(11) NOT NULL,
  `au_in_usua_id` INT(11) NOT NULL,
  PRIMARY KEY (`au_in_id`),
  INDEX `fk_audi_id_ivent` (`au_in_usua_id` ASC) VISIBLE,
  INDEX `fk_audi_iventa_inventarios` (`au_in_inve_id` ASC) VISIBLE,
  CONSTRAINT `fk_audi_id_ivent`
    FOREIGN KEY (`au_in_usua_id`)
    REFERENCES `levantamento_patrimonial`.`Usuario` (`usua_id`),
  CONSTRAINT `fk_audi_iventa_inventarios`
    FOREIGN KEY (`au_in_inve_id`)
    REFERENCES `levantamento_patrimonial`.`inventarios` (`inve_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`sala` (
  `Sala_id` INT(11) NOT NULL AUTO_INCREMENT,
  `Sala_Nome` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`Sala_id`),
  UNIQUE INDEX `Sala_id_UNIQUE` (`Sala_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`itens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`itens` (
  `iten_nome` VARCHAR(200) NOT NULL,
  `iten_id` INT(11) NOT NULL AUTO_INCREMENT,
  `iten_tombo` VARCHAR(15) NOT NULL,
  `iten_responsavel` VARCHAR(80) NOT NULL,
  `iten_decrição` MEDIUMTEXT NULL DEFAULT NULL,
  `iten_sala_id` INT(11) NOT NULL,
  PRIMARY KEY (`iten_id`),
  INDEX `fk_itens_sala_id` (`iten_sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_itens_sala_id`
    FOREIGN KEY (`iten_sala_id`)
    REFERENCES `levantamento_patrimonial`.`sala` (`Sala_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 55
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`historico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`historico` (
  `hist_id` INT(11) NOT NULL AUTO_INCREMENT,
  `hist_iten_id` INT(11) NOT NULL,
  `hist_au_in_id` INT(11) NOT NULL,
  `hist_estado_item` VARCHAR(60) NOT NULL,
  `hist_item_ocioso` TINYINT(4) NOT NULL,
  `hist_imagem` VARCHAR(200) NULL DEFAULT NULL,
  `hist_encontrado` TINYINT(4) NOT NULL,
  `hist_sala_id` INT(11) NOT NULL,
  PRIMARY KEY (`hist_id`),
  UNIQUE INDEX `hist_id_UNIQUE` (`hist_id` ASC) VISIBLE,
  INDEX `fk_historico_audi_ivent_id` (`hist_au_in_id` ASC) VISIBLE,
  INDEX `fk_historico_item_id` (`hist_iten_id` ASC) VISIBLE,
  INDEX `fk_historico_sala_id` (`hist_sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_historico_audi_ivent_id`
    FOREIGN KEY (`hist_au_in_id`)
    REFERENCES `levantamento_patrimonial`.`auditor_inventario` (`au_in_id`),
  CONSTRAINT `fk_historico_item_id`
    FOREIGN KEY (`hist_iten_id`)
    REFERENCES `levantamento_patrimonial`.`itens` (`iten_id`),
  CONSTRAINT `fk_historico_sala_id`
    FOREIGN KEY (`hist_sala_id`)
    REFERENCES `levantamento_patrimonial`.`sala` (`Sala_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`item_adicionado_sem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`item_adicionado_sem` (
  `item_add_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_add_nome` VARCHAR(200) NOT NULL,
  `item_add_estado` VARCHAR(60) NOT NULL,
  `item_add_descricao` MEDIUMTEXT NULL DEFAULT NULL,
  `item_add_au_in_id` INT(11) NOT NULL,
  `item_add_sala_id` INT(11) NOT NULL,
  `item_add_imagem` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`item_add_id`),
  UNIQUE INDEX `item_add_id_UNIQUE` (`item_add_id` ASC) VISIBLE,
  INDEX `fk_item_adicionado_audi_iventa` (`item_add_au_in_id` ASC) VISIBLE,
  INDEX `fk_item_adicionado_sala` (`item_add_sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_adicionado_audi_iventa`
    FOREIGN KEY (`item_add_au_in_id`)
    REFERENCES `levantamento_patrimonial`.`auditor_inventario` (`au_in_id`),
  CONSTRAINT `fk_item_adicionado_sala`
    FOREIGN KEY (`item_add_sala_id`)
    REFERENCES `levantamento_patrimonial`.`sala` (`Sala_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `levantamento_patrimonial`.`sala_invent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `levantamento_patrimonial`.`sala_inventario` (
  `sa_in_id` INT(11) NOT NULL AUTO_INCREMENT,
  `sa_in_sala_id` INT(11) NOT NULL,
  `sa_in_inve_id` INT(11) NOT NULL,
  PRIMARY KEY (`sa_in_id`),
  UNIQUE INDEX `sala_ivent_id_UNIQUE` (`sa_in_id` ASC) VISIBLE,
  INDEX `fk_campus_sala` (`sa_in_sala_id` ASC) VISIBLE,
  INDEX `fk_inventarios_campus_id` (`sa_in_inve_id` ASC) VISIBLE,
  CONSTRAINT `fk_campus_sala`
    FOREIGN KEY (`sa_in_sala_id`)
    REFERENCES `levantamento_patrimonial`.`sala` (`Sala_id`),
  CONSTRAINT `fk_inventarios_campus_id`
    FOREIGN KEY (`sa_in_inve_id`)
    REFERENCES `levantamento_patrimonial`.`inventarios` (`inve_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
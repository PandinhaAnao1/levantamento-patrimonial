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
-- Table `db_Levantamento_Patrimonial`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`usuarios` (
  `usua_id` INT NOT NULL AUTO_INCREMENT,
  `usua_email` VARCHAR(80) NOT NULL,
  `usua_senha` VARCHAR(40) NOT NULL,
  `usua_funcao` VARCHAR(30) NOT NULL,
  `usua_status` TINYINT NOT NULL,
  `usua_nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`usua_id`),
  UNIQUE INDEX `audi_id_UNIQUE` (`usua_id` ASC) VISIBLE,
  UNIQUE INDEX `audi_email_UNIQUE` (`usua_email` ASC) VISIBLE)
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
  UNIQUE INDEX `inve_id_UNIQUE` (`inve_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`salas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`salas` (
  `sala_id` INT NOT NULL AUTO_INCREMENT,
  `sala_nome` VARCHAR(150) NOT NULL,
  `sala_inve_id` INT NOT NULL,
  PRIMARY KEY (`sala_id`, `sala_inve_id`),
  UNIQUE INDEX `Sala_id_UNIQUE` (`sala_id` ASC) VISIBLE,
  INDEX `fk_sala_inventarios1_idx` (`sala_inve_id` ASC) VISIBLE,
  CONSTRAINT `fk_sala_inventarios1`
    FOREIGN KEY (`sala_inve_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`inventarios` (`inve_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`bens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`bens` (
  `bens_id` INT NOT NULL AUTO_INCREMENT,
  `bens_sala_id` INT NOT NULL,
  `bens_nome` VARCHAR(200) NOT NULL,
  `bens_tombo` VARCHAR(15) NOT NULL,
  `bens_responsavel` VARCHAR(80) NOT NULL,
  `bens_decricao` MEDIUMTEXT NULL DEFAULT NULL,
  `bens_valor` DECIMAL(10,2) NULL,
  PRIMARY KEY (`bens_id`, `bens_sala_id`),
  INDEX `fk_itens_sala1_idx` (`bens_sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_itens_sala1`
    FOREIGN KEY (`bens_sala_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`salas` (`sala_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_Levantamento_Patrimonial`.`historico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_Levantamento_Patrimonial`.`historico` (
  `hist_id` INT NOT NULL AUTO_INCREMENT,
  `hist_bens_id` INT NOT NULL,
  `hist_inventarios_id` INT NOT NULL,
  `hist_usuarios_id` INT NOT NULL,
  `hist_salas_id` INT NOT NULL,
  `hist_estado_bem` VARCHAR(60) NOT NULL,
  `hist_item_ocioso` TINYINT NOT NULL,
  `hist_imagem` VARCHAR(200) NULL,
  `hist_encontrado` TINYINT(4) NOT NULL,
  PRIMARY KEY (`hist_id`, `hist_bens_id`, `hist_inventarios_id`, `hist_usuarios_id`, `hist_salas_id`),
  UNIQUE INDEX `hist_id_UNIQUE` (`hist_id` ASC) VISIBLE,
  INDEX `fk_historico_itens1_idx` (`hist_bens_id` ASC) VISIBLE,
  INDEX `fk_historico_inventarios1_idx` (`hist_inventarios_id` ASC) VISIBLE,
  INDEX `fk_historico_Usuario1_idx` (`hist_usuarios_id` ASC) VISIBLE,
  INDEX `fk_historico_sala1_idx` (`hist_salas_id` ASC) VISIBLE,
  CONSTRAINT `fk_historico_itens1`
    FOREIGN KEY (`hist_bens_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`bens` (`bens_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_inventarios1`
    FOREIGN KEY (`hist_inventarios_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`inventarios` (`inve_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_Usuario1`
    FOREIGN KEY (`hist_usuarios_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`usuarios` (`usua_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_sala1`
    FOREIGN KEY (`hist_salas_id`)
    REFERENCES `db_Levantamento_Patrimonial`.`salas` (`sala_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `ade_fitness` DEFAULT CHARACTER SET utf8 ;
USE `ade_fitness` ;

CREATE TABLE IF NOT EXISTS `ade_fitness`.`usuario` (
  `id_usuario` INT ZEROFILL NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `perfil` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ade_fitness`.`telefone` (
  `id_telefone` INT NOT NULL AUTO_INCREMENT,
  `telefone` BIGINT(10) NULL,
  `celular` BIGINT(11) NULL,
  PRIMARY KEY (`id_telefone`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ade_fitness`.`endereco` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `cep` BIGINT(8) NULL,
  `logradouro` VARCHAR(50) NOT NULL,
  `bairro` VARCHAR(50) NOT NULL,
  `estado` VARCHAR(50) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `complemento` VARCHAR(500) NULL,
  PRIMARY KEY (`id_endereco`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ade_fitness`.`aluno` (
  `id_aluno` INT NOT NULL AUTO_INCREMENT,
  `id_telefone` INT NOT NULL,
  `id_endereco` INT NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `data_nascimento` VARCHAR(45) NULL,
  `sexo` VARCHAR(45) NULL,
  `responsavel` VARCHAR(45) NULL,
  `faixa_etaria` VARCHAR(45) NULL,
  `etnia` VARCHAR(45) NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id_aluno`, `id_telefone`, `id_endereco`),
  INDEX `fk_aluno_telefone_idx` (`id_telefone` ASC) VISIBLE,
  INDEX `fk_aluno_endereco1_idx` (`id_endereco` ASC) VISIBLE,
  CONSTRAINT `fk_aluno_telefone`
    FOREIGN KEY (`id_telefone`)
    REFERENCES `ade_fitness`.`telefone` (`id_telefone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluno_endereco1`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `ade_fitness`.`endereco` (`id_endereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ade_fitness`.`avaliacao_simples` (
  `id_usuario` INT ZEROFILL NOT NULL,
  `id_aluno` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_aluno`),
  INDEX `fk_usuario_has_aluno_aluno1_idx` (`id_aluno` ASC) VISIBLE,
  INDEX `fk_usuario_has_aluno_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_aluno_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ade_fitness`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_aluno_aluno1`
    FOREIGN KEY (`id_aluno`)
    REFERENCES `ade_fitness`.`aluno` (`id_aluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO usuario (nome,email,senha,perfil) VALUES ('admin','admin@gmail.com','11111','ADMINISTRADOR');
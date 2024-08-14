/*
  Warnings:

  - You are about to drop the `bens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bens` DROP FOREIGN KEY `fk_itens_sala1`;

-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `fk_historico_Usuario1`;

-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `fk_historico_inventarios1`;

-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `fk_historico_itens1`;

-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `fk_historico_sala1`;

-- DropForeignKey
ALTER TABLE `salas` DROP FOREIGN KEY `fk_sala_inventarios1`;

-- DropTable
DROP TABLE `bens`;

-- DropTable
DROP TABLE `historico`;

-- DropTable
DROP TABLE `inventarios`;

-- DropTable
DROP TABLE `salas`;

-- DropTable
DROP TABLE `usuarios`;

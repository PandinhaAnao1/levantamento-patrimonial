import { prisma } from "../src/configs//prismaClient.js"
import faker from 'faker-br';

async function clearDatabase() {
  try {
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
    await prisma.$executeRaw`TRUNCATE TABLE usuario;`;
    await prisma.$executeRaw`TRUNCATE TABLE campus;`;
    await prisma.$executeRaw`TRUNCATE TABLE inventario;`;
    await prisma.$executeRaw`TRUNCATE TABLE sala;`;
    await prisma.$executeRaw`TRUNCATE TABLE bem;`;
    await prisma.$executeRaw`TRUNCATE TABLE levantamento;`;
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  }
}

async function seedDatabase() {
  try {
    // Inserindo dados na tabela `usuario`
    const usuarios = await prisma.usuario.createMany({
      data: [
        { email: faker.internet.email(), funcao: 'auditor', nome: faker.name.findName(), senha: faker.internet.password(), status: 1 },
        { email: faker.internet.email(), funcao: 'auditor', nome: faker.name.findName(), senha: faker.internet.password(), status: 1 },
        { email: faker.internet.email(), funcao: 'funcionario cpalm', nome: faker.name.findName(), senha: faker.internet.password(), status: 1 },
      ],
    });

    // Inserindo dados na tabela `campus`
    const campuses = await prisma.campus.createMany({
      data: [
        { nome: faker.address.streetName(), telefone: faker.phone.phoneNumber(), cidade: faker.address.city(), bairro: faker.address.neighborhood(), rua: faker.address.streetAddress(), numoro_residencia: faker.datatype.number() },
        { nome: faker.address.streetName(), telefone: faker.phone.phoneNumber(), cidade: faker.address.city(), bairro: faker.address.neighborhood(), rua: faker.address.streetAddress(), numoro_residencia: faker.datatype.number() },
      ],
    });

    // Inserindo dados na tabela `inventario`
    const inventarios = await prisma.inventario.createMany({
      data: [
        { nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.datatype.boolean() ? 1 : 0, campus_id: 1 },
        { nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.datatype.boolean() ? 1 : 0, campus_id: 2 },
      ],
    });

    // Inserindo dados na tabela `sala`
    const salas = await prisma.sala.createMany({
      data: [
        { nome: faker.address.streetAddress() },
        { nome: faker.address.streetAddress() },
        { nome: faker.address.streetAddress() },
        { nome: faker.address.streetAddress() },
        { nome: faker.address.streetAddress() },
      ],
    });

    // Inserindo dados na tabela `bem`
    const bens = await prisma.bem.createMany({
      data: Array.from({ length: 12 }, (_, index) => ({
        sala_id: (index % 5) + 1,
        inventario_id: (index % 2) + 1,
        nome: faker.commerce.productName(),
        tombo: faker.datatype.uuid().substring(0, 15),
        responsavel: faker.name.findName(),
        decricao: faker.lorem.paragraph(),
        valor: faker.commerce.price(100, 3000, 2),
      })),
    });

    // Inserindo dados na tabela `levantamento`
    await prisma.levantamento.createMany({
      data: Array.from({ length: 12 }, (_, index) => ({
        inventario_id: (index % 2) + 1,
        bem_id: (index % 12) + 1,
        sala_id: (index % 5) + 1,
        usuario_id: (index % 3) + 1,
        imagem: faker.image.imageUrl(),
        encontrado: faker.datatype.boolean() ? 1 : 0,
        ocioso: faker.datatype.boolean() ? 1 : 0,
        estado: faker.lorem.word(),
        data: new Date(),
      })),
    });

    console.log('Banco de dados preenchido com sucesso.');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await clearDatabase();
  await seedDatabase();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

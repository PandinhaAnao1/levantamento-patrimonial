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
        { email: faker.internet.email(), funcao: 'auditor', nome: faker.name.findName(), senha: "senhatest", status: true },
        { email: faker.internet.email(), funcao: 'auditor', nome: faker.name.findName(), senha: "senhatest", status: true },
        { email: faker.internet.email(), funcao: 'funcionario cpalm', nome: faker.name.findName(), senha: "senhatest", status: false },
      ],
    });

    // Inserindo dados na tabela `campus`
    const campuses = await prisma.campus.createMany({
      data: [
        { nome: faker.address.streetName(), telefone: faker.phone.phoneNumber(), cidade: faker.address.city(), bairro: faker.address.streetAddress(), rua: faker.address.streetName(), numoro_residencia: 7741 },
        { nome: faker.address.streetName(), telefone: faker.phone.phoneNumber(), cidade: faker.address.city(), bairro: faker.address.streetAddress(), rua: faker.address.streetName(), numoro_residencia: 5534 },
      ],
    });

    // Inserindo dados na tabela `inventario`
    const inventarios = await prisma.inventario.createMany({
      data: [
        { nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus_id: 1 },
        { nome: faker.commerce.productName(), data: faker.date.past(), concluido: faker.random.boolean(), campus_id: 2 },
      ],
    });

    // Inserindo dados na tabela `sala`
    const salas = await prisma.sala.createMany({
      data: [
        { nome: 'Laboratório de informática do piso 3 sala 5' },
        { nome: 'Cantina de alimentação piso 1' },
        { nome: 'Laboratório de química do piso 2 sala 12' },
        { nome: 'Sala de pesquisa avançada em IA' },
        { nome: 'Sala de Reunião de grupos de Fábrica' },
      ],
    });

    // Inserindo dados na tabela `bem`
    const bens = await prisma.bem.createMany({
      data: Array.from({ length: 12 }, (_, index) => ({
        sala_id: (index % 5) + 1,
        inventario_id: (index % 2) + 1,
        nome: faker.commerce.productName(),
        tombo: String(faker.random.number()),
        responsavel: faker.name.findName(),
        descricao: faker.lorem.paragraph(),
        auditado: faker.random.boolean(),
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
        ocioso: faker.random.boolean(),
        estado: faker.random.boolean() ? "em bom estado":  "danificado",
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

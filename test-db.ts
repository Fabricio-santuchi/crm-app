import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function criarClienteTeste(companyId: string) {
  const cliente = await prisma.client.create({
    data: {
      name: "Cliente Teste",
      companyId: companyId,
    },
  });
  console.log("Cliente criado com id:", cliente.id);
  return cliente.id;
}

async function buscarClientePorId(id: string) {
  const cliente = await prisma.client.findUnique({
    where: { id },
  });
  console.log("Cliente:", cliente?.id ? cliente.name : "não encontrado");
}

async function main() {
  const novoClienteId = await criarClienteTeste("cmu2yq2lt0000hw0z5y5xssq0");
  await buscarClientePorId(novoClienteId);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

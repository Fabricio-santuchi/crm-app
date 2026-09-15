import "dotenv/config";
import { PrismaClient } from "./app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Criar uma empresa
  const company = await prisma.company.create({
    data: { name: "Empresa Teste" },
  });
  console.log("Empresa criada:", company);

  // 2. Criar um usuário vinculado a essa empresa
  const user = await prisma.user.create({
    data: {
      name: "Fabrício",
      email: "fabricio@teste.com",
      password: "senha-fake-por-enquanto",
      companyId: company.id,
    },
  });
  console.log("Usuário criado:", user);

  // 3. Buscar a empresa já trazendo os usuários dela junto (usa o @relation!)
  const companyWithUsers = await prisma.company.findMany({
    include: { users: true },
  });
  console.log(
    "Empresa com usuários:",
    JSON.stringify(companyWithUsers, null, 2),
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

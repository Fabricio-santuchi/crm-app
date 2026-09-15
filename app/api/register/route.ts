import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  const { name, email, password, companyName } = await request.json();

  if (!name || !email || !password || !companyName) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios" },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "E-mail já cadastrado" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const company = await prisma.company.create({
    data: { name: companyName },
  });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      companyId: company.id,
    },
  });

  return NextResponse.json({
    message: "Usuário criado com sucesso",
    userId: user.id,
  });
}

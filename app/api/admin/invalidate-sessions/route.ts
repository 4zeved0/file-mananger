import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST() {
  // Atualiza todos os usuários incrementando o campo tokenVersion
  await prisma.user.updateMany({
    data: {
      tokenVersion: {
        increment: 1, // Incrementa o tokenVersion
      },
    },
  });

  return new Response("Sessões invalidadas", { status: 200 });
}

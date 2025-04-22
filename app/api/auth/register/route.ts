// app/api/auth/register/route.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, username, fullname, role } = await req.json();

  // Verifique se todos os campos necessários foram fornecidos
  if (!email || !password || !username || !fullname) {
    return new Response(
      JSON.stringify({ error: "Todos os campos são obrigatórios." }),
      { status: 400 }
    );
  }

  // Verifica se o e-mail já está registrado
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(
      JSON.stringify({ error: "Email já registrado" }),
      { status: 400 }
    );
  }

  // Criptografa a senha
  const hashedPassword = await hash(password, 10);

  // Define o valor do role (com 'user' como padrão caso não seja informado)
  const userRole = role && (role === "admin" || role === "user") ? role : "user";

  // Cria um novo usuário no banco de dados
  const user = await prisma.user.create({
    data: {
      email,
      username,
      fullname,
      password: hashedPassword,
      role: userRole,  // Adiciona o campo 'role'
    },
  });

  return new Response(JSON.stringify({ success: true, user }), { status: 201 });
}

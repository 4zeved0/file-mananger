import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      username: string;
      fullname: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    username: string;
    fullname: string;
    tokenVersion?: number; // 👈 Adiciona tokenVersion aqui
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    username: string;
    fullname: string;
    tokenVersion?: number; // 👈 Adiciona tokenVersion aqui também
  }
}

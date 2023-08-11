import { User as UserModel } from "@prisma/client";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      email: string;
      image: string;
      name: string;
    };
  }
  interface User extends UserModel {}
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: boolean;
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, name } = body;

  const existedUser = await prisma.user.findFirst({
    where: { email: email },
  });
  if (existedUser) {
    return NextResponse.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      isAdmin: (email === "nhuyedangnguyen@gmail.com" && true) || false,
      name,
      password: hashedPassword,
      email,
    },
  });
  return NextResponse.json(user);
}

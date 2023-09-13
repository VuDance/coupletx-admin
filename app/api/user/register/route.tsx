import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { sendEmail } from "@/app/common/function/nodemailer";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, name } = body;

  const existedUser = await prisma.user.findFirst({
    where: { email: email },
  });
  if (existedUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
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
  const data = {
    email,
    userId: user.id,
    type: "VERIFY",
  };
  await sendEmail(data);
  return NextResponse.json(user);
}

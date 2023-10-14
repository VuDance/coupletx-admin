import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { signIn } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const res: any = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.status === 401) {
      return NextResponse.json(
        {
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "Đăng nhập thành công",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

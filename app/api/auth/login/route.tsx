import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { sendEmail } from "@/app/common/function/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email hoặc password không hợp lệ",
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      
    });

    if (!user || !user?.password) {
      return NextResponse.json(
        {
          message: "Sai Email hoặc password",
        },
        { status: 401 }
      );
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          message: "Sai Email hoặc password",
        },
        { status: 401 }
      );
    }
    if (user.active === false) {
      sendEmail({ email: user.email, userId: user.id, type: "VERIFY" });
      return NextResponse.json(
        {
          message: "Vui lòng xác thực email",
        },
        { status: 401 }
      );
    }

    
    return NextResponse.json(
      {
        message: "Đăng nhập thành công",
        data:{name:user.name, id:user.id},
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const userVerify = await prisma.user.findFirst({
    where: {
      verify_token: token,
      verify_token_expired: {
        gt: new Date(),
      },
    },
  });
  if (!userVerify) {
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      { status: 400 }
    );
  }
  await prisma.user.update({
    where: {
      id: userVerify.id,
    },
    data: {
      active: true,
    },
  });

  return NextResponse.json({
    message: "Verified email",
  });
}

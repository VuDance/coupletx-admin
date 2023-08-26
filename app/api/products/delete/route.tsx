import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    const token = request.headers.get("authorization");
    const decodedToken: any = await jwt.verify(
      token || "",
      process.env.JWT_KEY!
    );
    if (decodedToken.role === false) {
      return NextResponse.json(
        { errorType: "Authorization", error: "UnAuthorization" },
        { status: 401 }
      );
    }
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      message: "Deleted product",
      success: true,
    });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({
        errorType: "TokenExpired",
        error: "Token has expired",
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

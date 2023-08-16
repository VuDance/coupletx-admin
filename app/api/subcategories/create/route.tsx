import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const { category_id, image, name, slug } = body;

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
    await prisma.subCategory.create({
      data: {
        name,
        image,
        slug,
        category_id: parseInt(category_id),
      },
    });
    return NextResponse.json({
      message: "Created sub category",
      success: true,
    });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        {
          errorType: "TokenExpired",
          error: "Token has expired",
        },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

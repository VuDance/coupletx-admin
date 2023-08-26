import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const { image, name, gender, slug } = body;

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
    const exitedCategory = await prisma.category.findMany({
      where: {
        OR: [{ name }, { slug }],
      },
    });
    if (exitedCategory.length > 0) {
      return NextResponse.json(
        {
          message:
            "Đã có danh mục với tên và giới tính vừa nhập. Vui lòng nhập với 1 dữ liệu khác",
        },
        { status: 409 }
      );
    }
    await prisma.category.create({
      data: {
        name,
        image,
        gender,
        slug,
      },
    });
    return NextResponse.json({
      message: "Created category",
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

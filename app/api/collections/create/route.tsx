import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const { description, image, name, status, categories } = body;

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

    const collection = await prisma.collections.create({
      data: {
        name,
        description: description,
        image,
        status,
      },
    });
    if (collection) {
      await prisma.category.updateMany({
        where: {
          name: {
            in: categories,
          },
        },
        data: {
          collection_id: collection.id,
        },
      });
    }

    return NextResponse.json({
      message: "Created collection",
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

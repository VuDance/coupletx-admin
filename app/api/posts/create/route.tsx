import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const token = request.headers.get("authorization");
    const { title, body, image, author, blog_id } = data;

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

    await prisma.posts.create({
      data: {
        title,
        image,
        body,
        blog_id,
        author,
      },
    });

    return NextResponse.json({
      message: "Created post",
      success: true,
    });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        {
          errorType: "TokenExpired",
          error: "Token has expired",
        },
        {
          status: 401,
        }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

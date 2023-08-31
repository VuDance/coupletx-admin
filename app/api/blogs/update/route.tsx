import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const { title, slug, image, id, author } = body;

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

    const exitedBlog = await prisma.blogs.findMany({
      where: {
        slug,
      },
    });
    if (exitedBlog.length > 0) {
      return NextResponse.json(
        { errorType: "Exited", error: "Blog đã tồn tại" },
        { status: 409 }
      );
    }
    await prisma.blogs.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        author,
        image,
        slug,
      },
    });

    return NextResponse.json({
      message: "Updated blog",
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

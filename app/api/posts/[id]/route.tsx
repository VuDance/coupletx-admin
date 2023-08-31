import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!post) {
      return NextResponse.json({ post: null });
    }

    return NextResponse.json({ post: post });
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

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("filter");
    if (query !== null) {
      const blogs = await prisma.blogs.findMany({
        include: {
          posts: true,
        },
        where: {
          title: {
            contains: query,
          },
        },
      });
      return NextResponse.json({
        blogs: blogs,
      });
    } else {
      const blogs = await prisma.blogs.findMany({
        include: {
          posts: true,
        },
      });
      return NextResponse.json({
        blogs: blogs,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

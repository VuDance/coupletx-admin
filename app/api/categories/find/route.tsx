import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("filter");
    if (query !== null) {
      const categories = await prisma.category.findMany({
        include: {
          subcategories: true,
        },
        where: {
          name: {
            contains: query,
          },
        },
      });
      return NextResponse.json({
        categories: categories,
      });
    } else {
      const categories = await prisma.category.findMany({
        include: {
          subcategories: true,
        },
      });
      return NextResponse.json({
        categories: categories,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

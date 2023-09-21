import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("filter");
    if (query !== null) {
      const collections = await prisma.collections.findMany({
        include: {
          categories: {
            include: {
              subcategories: true,
            },
          },
        },
        where: {
          name: {
            contains: query,
          },
        },
      });
      return NextResponse.json({
        collections: collections,
      });
    } else {
      const collections = await prisma.collections.findMany({
        include: {
          categories: {
            include: {
              subcategories: true,
            },
          },
        },
      });
      return NextResponse.json({
        collections: collections,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

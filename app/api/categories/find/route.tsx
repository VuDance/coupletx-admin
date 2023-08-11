import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
      },
    });
    return NextResponse.json({
      categories: categories,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

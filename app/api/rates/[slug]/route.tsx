import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Rate } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const orderByDate: any = request.nextUrl.searchParams.get("orderByDate");
  const orderByStar: any = request.nextUrl.searchParams.get("orderByStar");

  try {
    const product = await prisma.product.findFirst({
      where: { slug: params.slug },
    });
    if (product) {
      const rate: any = await prisma.rate.findMany({
        where: {
          product_id: product.id,
        },
        include: {
          images: true,
        },
        orderBy: {
          created_at: orderByDate || undefined,
        },
      });
      if (orderByStar === "asc") {
        rate.sort((a: Rate, b: Rate) => a.star - b.star);
      }
      if (orderByStar === "desc") {
        rate.sort((a: Rate, b: Rate) => b.star - a.star);
      }
      return NextResponse.json({
        data: rate,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("filter");
    if (query !== null) {
      const products = await prisma.product.findMany({
        include: {
          productVariants: {
            include: {
              images: true,
            },
          },
          sub_category: true,
        },
        where: {
          product_name: {
            contains: query,
          },
        },
      });
      return NextResponse.json({
        products: products,
      });
    } else {
      const products = await prisma.product.findMany({
        include: {
          productVariants: {
            include: {
              images: true,
            },
          },
          sub_category: true,
        },
      });
      return NextResponse.json({
        products: products,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const products = await prisma.product.findFirst({
      where: {
        id: parseInt(params.productId),
      },
      include: {
        sub_category: {
          include: {
            subcategory: true,
          },
        },
        productVariants: {
          include: {
            images: true,
            size: {
              include: {
                technical_specification: true,
              },
            },
          },
        },
      },
    });
    if (!products) {
      return NextResponse.json({ products: null });
    }

    return NextResponse.json({ products: products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

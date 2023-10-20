import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const id: any = request.nextUrl.searchParams.get("id");

    const collections = await prisma.cart.findFirst({
      where: {
        user_id: id,
      },
      include: {
        cart_item: {
          include: {
            product_variant: true,
          },
        },
      },
    });
    return NextResponse.json({
      collections: collections,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

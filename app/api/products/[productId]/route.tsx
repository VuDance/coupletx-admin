import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const token = request.headers.get("authorization");

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
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({
        errorType: "TokenExpired",
        error: "Token has expired",
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

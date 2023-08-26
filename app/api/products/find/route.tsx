import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
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
    const query = request.nextUrl.searchParams.get("filter");
    if (query !== null) {
      const products = await prisma.product.findMany({
        include: {
          productVariants: {
            include: {
              images: true,
            },
          },
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
        },
      });
      return NextResponse.json({
        products: products,
      });
    }
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

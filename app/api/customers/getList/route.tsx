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
      const customers = await prisma.user.findMany({
        where: {
          name: {
            contains: query,
          },
        },
      });
      return NextResponse.json({
        customers: customers,
      });
    } else {
      const data = await prisma.user.findMany({});
      return NextResponse.json({
        customers: data,
      });
    }
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        {
          errorType: "TokenExpired",
          error: "Token has expired",
        },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

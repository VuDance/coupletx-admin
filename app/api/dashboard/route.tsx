import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    // const { year } = body

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
    const res = await prisma.overallStat.findFirst({
      where: {
        year: 2023,
      },
    });
    const res2 = await prisma.saleByMonth.findMany({
      where: {
        year: 2023,
      },
    });
    const blogs = await prisma.blogs.findMany({
      take: 10,
      include: {
        posts: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({
      message: "Get success",
      overallStat: { ...res, dataByMonth: res2, blogs },
    });
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

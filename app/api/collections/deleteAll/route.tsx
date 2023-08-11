import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;

    await prisma.collections.deleteMany({
      where: {
        id: {
          in: data,
        },
      },
    });
    return NextResponse.json({
      message: "Deleted collection",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

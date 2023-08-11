import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.collections.delete({
      where: {
        id: id,
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

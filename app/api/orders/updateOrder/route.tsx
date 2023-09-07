import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(request: NextRequest) {
  try {
    const orders = await prisma.order.deleteMany({});
    return NextResponse.json({
      ok: "ok",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

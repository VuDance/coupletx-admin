import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, image, name, status, collectionId } = body;

    await prisma.collections.update({
      where: {
        id: parseInt(collectionId),
      },
      data: {
        name,
        description: description,
        image,
        status,
      },
    });
    return NextResponse.json({
      message: "Updated collection",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

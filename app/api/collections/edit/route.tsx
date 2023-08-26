import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, image, name, status, collectionId, categories } = body;

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

    await prisma.category.updateMany({
      where: {
        collection_id: parseInt(collectionId),
      },
      data: {
        collection_id: null,
      },
    });
    await prisma.category.updateMany({
      where: {
        name: {
          in: categories,
        },
      },
      data: {
        collection_id: parseInt(collectionId),
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

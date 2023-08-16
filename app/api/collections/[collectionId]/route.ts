import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    const collection = await prisma.collections.findFirst({
      where: {
        id: parseInt(params.collectionId),
      },
      include: {
        product: true,
        categories: true,
      },
    });
    if (!collection) {
      return NextResponse.json({ collection: null });
    }

    return NextResponse.json({ collection: collection });
  } catch (error) {
    console.log(error);
  }
}

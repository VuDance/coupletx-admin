import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, description, product_id, star, username, images } = data;

    const rate = await prisma.rate.create({
      data: {
        title,
        product_id,
        star,
        description,
        username,
      },
    });
    if (images.length > 0) {
      for (var i = 0; i < images.length; i++) {
        await prisma.rateImage.create({
          data: {
            imageUrl: images[i],
            rate_id: rate.id,
          },
        });
      }
    }

    return NextResponse.json({
      message: "Đánh giá thành công",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

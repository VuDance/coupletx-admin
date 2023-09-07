import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      data,
      payment_method,
      full_name,
      phone_number,
      address,
      total_price,
    } = body;

    const order = await prisma.order.create({
      data: {
        user_id,
        payment_method,
        phone_number,
        address,
        full_name,
        total_price,
        status: "waiting",
      },
    });
    for (var i = 0; i < data.length; i++) {
      await prisma.orderItem.create({
        data: {
          order_id: order.id,
          product_variant_id: data[i].product_variant_id,
          total_price: data[i].total_price,
          quantity: data[i].quantity,
          size: data[i].size,
          color: data[i].color,
        },
      });
    }
    await prisma.cart.delete({
      where: {
        user_id,
      },
    });

    return NextResponse.json({
      message: "Đặt hàng thành công",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

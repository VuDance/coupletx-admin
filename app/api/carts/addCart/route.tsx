import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, product_variant_id, total_price, quantity, size, color } =
      body;

    const existCart = await prisma.cart.findFirst({
      where: {
        user_id,
      },
      include: {
        cart_item: {
          include: {
            product_variant: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
    if (!existCart) {
      const cart = await prisma.cart.create({
        data: {
          user_id,
        },
      });
      await prisma.cartItem.create({
        data: {
          product_variant_id,
          total_price,
          quantity,
          size,
          color,
          cart_id: cart.id,
        },
      });
    } else {
      for (var i = 0; i < existCart.cart_item.length; i++) {
        if (product_variant_id === existCart.cart_item[i].product_variant_id) {
          await prisma.cartItem.update({
            where: {
              id: existCart.cart_item[i].id,
            },
            data: {
              quantity,
            },
          });
        }
      }
    }

    return NextResponse.json({
      message: "Thêm giỏ hàng thành công",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

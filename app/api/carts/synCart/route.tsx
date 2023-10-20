import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, data } = body;

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
      for (let i = 0; i < data.length; i++) {
        await prisma.cartItem.create({
          data: {
            product_variant_id: data[i].product_variant_id,
            total_price: data[i].total_price,
            quantity: data[i].quantity,
            size: data[i].size,
            color: data[i].color,
            cart_id: cart.id,
          },
        });
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        for (var j = 0; j < existCart.cart_item.length; j++) {
          if (
            data[i].product_variant_id ===
            existCart.cart_item[j].product_variant_id
          ) {
            await prisma.cartItem.update({
              where: {
                id: existCart.cart_item[j].id,
              },
              data: {
                quantity: existCart.cart_item[j].quantity + data[i].quantity,
              },
            });
          } else {
            await prisma.cartItem.create({
              data: {
                product_variant_id: data[i].product_variant_id,
                total_price: data[i].total_price,
                quantity: data[i].quantity,
                size: data[i].size,
                color: data[i].color,
                cart_id: existCart.id,
              },
            });
          }
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

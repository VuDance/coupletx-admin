import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const name: any = request.nextUrl.searchParams.get("name");
    const color = request.nextUrl.searchParams.getAll("color");
    const size = request.nextUrl.searchParams.getAll("size");
    const price = request.nextUrl.searchParams.getAll("price");

    const priceNumbers = price.map((p) => parseFloat(p));

    const listSub = await prisma.subCategory.findMany({
      include: {
        products: {
          include: {
            product: {
              include: {
                productVariants: {
                  include: {
                    images: true,
                    size: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        AND: [
          { slug: name },
          {
            products: {
              some: {
                product: {
                  productVariants: {
                    some: {
                      color: { in: color },
                    },
                  },
                },
              },
            },
          },
          {
            products: {
              some: {
                product: {
                  productVariants: {
                    some: {
                      price: { gt: Math.min(...priceNumbers) },
                    },
                  },
                },
              },
            },
          },
          {
            products: {
              some: {
                product: {
                  productVariants: {
                    some: {
                      size: {
                        some: {
                          name_size: { in: size },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({ data: listSub[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

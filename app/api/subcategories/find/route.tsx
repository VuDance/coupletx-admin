import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const name: any = request.nextUrl.searchParams.get("name");
    const color = request.nextUrl.searchParams.getAll("color");
    const size = request.nextUrl.searchParams.getAll("size");
    const price = request.nextUrl.searchParams.getAll("price");
    const orderBy = request.nextUrl.searchParams.get("orderBy");

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
          { slug: { contains: name } },
          {
            products: {
              some: {
                product: {
                  productVariants: {
                    some: {
                      color: color.length > 0 ? { in: color } : undefined,
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
                  minPrice: (() => {
                    if (priceNumbers.length > 0) {
                      if (priceNumbers.includes(1)) {
                        return { lt: 300000 };
                      } else if (priceNumbers.includes(2)) {
                        return { gte: 300000, lte: 500000 };
                      } else if (priceNumbers.includes(3)) {
                        return { gt: 500000 };
                      }
                    } else {
                      return {};
                    }
                  })(),
                  // productVariants: {
                  //   some: {
                  //     price: (() => {
                  //       if (priceNumbers.length > 0) {
                  //         if (priceNumbers.includes(1)) {
                  //           return { lt: 300000 };
                  //         } else if (priceNumbers.includes(2)) {
                  //           return { gte: 300000, lte: 500000 };
                  //         } else if (priceNumbers.includes(3)) {
                  //           return { gt: 500000 };
                  //         }
                  //       } else {
                  //         return {};
                  //       }
                  //     })(),

                  //     // OR: [
                  //     //   {
                  //     //     price:
                  //     //       priceNumbers.length > 0 ? priceNumbers.includes(1)
                  //     //         ? { lt: 300000 } ? priceNumbers.includes(2)
                  //     //         : {},
                  //     //   },
                  //     //   {
                  //     //     price:
                  //     //       priceNumbers.length > 0 && priceNumbers.includes(2)
                  //     //         ? {
                  //     //             gte: 300000,
                  //     //             lte: 500000,
                  //     //           }
                  //     //         : {},
                  //     //   },
                  //     //   {
                  //     //     price:
                  //     //       priceNumbers.length > 0 && priceNumbers.includes(3)
                  //     //         ? {
                  //     //             gt: 500000,
                  //     //           }
                  //     //         : {},
                  //     //   },
                  //     // ],
                  //   },
                  // },
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
                          name_size: size.length > 0 ? { in: size } : undefined,
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
    if (priceNumbers.length > 0) {
      let filteredProducts = [];

      for (let i = 0; i < listSub[0].products.length; i++) {
        let products: any = listSub[0].products[i];
        let minPrice = products.product.minPrice;

        if (priceNumbers.includes(1) && minPrice < 300000) {
          filteredProducts.push(products);
        } else if (
          priceNumbers.includes(2) &&
          minPrice >= 300000 &&
          minPrice <= 500000
        ) {
          filteredProducts.push(products);
        } else if (priceNumbers.includes(3) && minPrice > 500000) {
          filteredProducts.push(products);
        }
      }
      listSub[0].products = filteredProducts;
    }
    if (orderBy === "asc") {
      listSub[0].products.sort(
        (a, b) => a.product.minPrice - b.product.minPrice
      );
    }
    if (orderBy === "desc") {
      listSub[0].products.sort(
        (a, b) => b.product.minPrice - a.product.minPrice
      );
    }

    return NextResponse.json({ data: listSub[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

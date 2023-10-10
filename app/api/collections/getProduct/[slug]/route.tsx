import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const color = request.nextUrl.searchParams.getAll("color");
  const size = request.nextUrl.searchParams.getAll("size");
  const price = request.nextUrl.searchParams.getAll("price");
  const orderBy = request.nextUrl.searchParams.get("orderBy");

  //   console.log(params);
  const priceNumbers = price.map((p) => parseFloat(p));
  try {
    const data: any = await prisma.collections.findFirst({
      where: {
        id: parseInt(params.slug),
      },
      include: {
        categories: {
          include: {
            subcategories: {
              include: {
                products: {
                  include: {
                    subcategory: {
                      include: {
                        products: {
                          include: {
                            product: {
                              include: {
                                productVariants: {
                                  include: {
                                    images: true,
                                    size: {
                                      include: {
                                        technical_specification: true,
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!data) {
      return NextResponse.json({ products: null });
    }

    let products = data.categories;

    let productsArray: any = [];

    products.forEach((product: any) => {
      product.subcategories.forEach((item: any) => {
        item.products.forEach((product: any) => {
          if (product.subcategory && product.subcategory.products) {
            productsArray.push(...product.subcategory.products);
          }
        });
      });
    });
    const uniqueProductArray: any = [];

    // format sao cho mỗi sản phẩm là duy nhất
    const seenProductNames = new Set();

    productsArray.forEach((item: any) => {
      const productName = item.product.product_name;

      // Kiểm tra xem giá trị đã xuất hiện chưa
      if (!seenProductNames.has(productName)) {
        uniqueProductArray.push(item);
        seenProductNames.add(productName);
      }
    });
    productsArray = uniqueProductArray;

    const completeData = { products: productsArray };
    if (color.length > 0) {
      const filteredProducts = [];

      for (let i = 0; i < completeData.products.length; i++) {
        let ok = 0;
        for (
          let j = 0;
          j < completeData.products[i].product.productVariants.length;
          j++
        ) {
          if (
            color.includes(
              completeData.products[i].product.productVariants[j].color
            )
          ) {
            ok = 1;
            break;
          }
        }
        if (ok != 0) {
          filteredProducts.push(completeData.products[i]);
        }
      }
      completeData.products = filteredProducts;
    }
    if (size.length > 0) {
      const filteredProducts = [];

      for (let i = 0; i < completeData.products.length; i++) {
        let ok = 0;
        for (
          let j = 0;
          j < completeData.products[i].product.productVariants.length;
          j++
        ) {
          for (
            let k = 0;
            k < completeData.products[i].product.productVariants[j].size.length;
            k++
          ) {
            if (
              size.includes(
                completeData.products[i].product.productVariants[j].size[k]
                  .name_size
              )
            ) {
              ok = 1;
              break;
            }
          }
        }
        if (ok != 0) {
          filteredProducts.push(completeData.products[i]);
        }
      }
      completeData.products = filteredProducts;
    }
    if (price.length > 0) {
      let filteredProducts = [];

      for (let i = 0; i < completeData.products.length; i++) {
        if (priceNumbers.includes(1)) {
          if (completeData.products[i].product.minPrice < 300000) {
            filteredProducts.push(completeData.products[i]);
          }
        } else if (priceNumbers.includes(2)) {
          if (
            completeData.products[i].product.minPrice > 300000 &&
            completeData.products[i].product.minPrice < 500000
          ) {
            filteredProducts.push(completeData.products[i]);
          }
        } else if (priceNumbers.includes(3)) {
          if (completeData.products[i].product.minPrice > 500000) {
            filteredProducts.push(completeData.products[i]);
            break;
          }
        }
      }
      completeData.products = filteredProducts;
    }
    if (orderBy === "asc") {
      completeData.products.sort(
        (a: any, b: any) => a.product.minPrice - b.product.minPrice
      );
    }
    if (orderBy === "desc") {
      completeData.products.sort(
        (a: any, b: any) => b.product.minPrice - a.product.minPrice
      );
    }

    return NextResponse.json({ data: completeData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

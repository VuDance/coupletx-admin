import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const color = request.nextUrl.searchParams.getAll("color");
  const size = request.nextUrl.searchParams.getAll("size");
  const price = request.nextUrl.searchParams.getAll("price");
  const orderBy = request.nextUrl.searchParams.get("orderBy");

  const priceNumbers = price.map((p) => parseFloat(p));
  try {
    const products: any = await prisma.category.findFirst({
      where: {
        slug: { contains: params.name },
      },
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
    });
    if (!products) {
      return NextResponse.json({ products: null });
    }

    let productsArray: any = [];

    products.subcategories.forEach((item: any) => {
      item.products.forEach((product: any) => {
        if (product.subcategory && product.subcategory.products) {
          productsArray.push(...product.subcategory.products);
        }
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

    //xóa và thêm field để đồng bộ với các api khác
    delete products.subcategories;
    products.products = productsArray;

    if (color.length > 0) {
      const filteredProducts = [];

      for (let i = 0; i < products.products.length; i++) {
        let ok = 0;
        for (
          let j = 0;
          j < products.products[i].product.productVariants.length;
          j++
        ) {
          if (
            color.includes(
              products.products[i].product.productVariants[j].color
            )
          ) {
            ok = 1;
            break;
          }
        }
        if (ok != 0) {
          filteredProducts.push(products.products[i]);
        }
      }
      products.products = filteredProducts;
    }
    if (size.length > 0) {
      const filteredProducts = [];

      for (let i = 0; i < products.products.length; i++) {
        let ok = 0;
        for (
          let j = 0;
          j < products.products[i].product.productVariants.length;
          j++
        ) {
          for (
            let k = 0;
            k < products.products[i].product.productVariants[j].size.length;
            k++
          ) {
            if (
              size.includes(
                products.products[i].product.productVariants[j].size[k]
                  .name_size
              )
            ) {
              ok = 1;
              break;
            }
          }
        }
        if (ok != 0) {
          filteredProducts.push(products.products[i]);
        }
      }
      products.products = filteredProducts;
    }
    if (price.length > 0) {
      let filteredProducts = [];

      for (let i = 0; i < products.products.length; i++) {
        if (priceNumbers.includes(1)) {
          if (products.products[i].product.minPrice < 300000) {
            filteredProducts.push(products.products[i]);
          }
        } else if (priceNumbers.includes(2)) {
          if (
            products.products[i].product.minPrice > 300000 &&
            products.products[i].product.minPrice < 500000
          ) {
            filteredProducts.push(products.products[i]);
          }
        } else if (priceNumbers.includes(3)) {
          if (products.products[i].product.minPrice > 500000) {
            filteredProducts.push(products.products[i]);
            break;
          }
        }
      }
      products.products = filteredProducts;
    }
    if (orderBy === "asc") {
      products.products.sort(
        (a: any, b: any) => a.product.minPrice - b.product.minPrice
      );
    }
    if (orderBy === "desc") {
      products.products.sort(
        (a: any, b: any) => b.product.minPrice - a.product.minPrice
      );
    }

    return NextResponse.json({ data: products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
